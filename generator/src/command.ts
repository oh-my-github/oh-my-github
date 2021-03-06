/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
/// <reference path="../../typings/fs-extra/fs-extra.d.ts" />
/// <reference path="../../typings/commander/commander.d.ts" />
/// <reference path="../../typings/circular-json/circular-json.d.ts" />

"use strict";

import * as _ from "lodash";
import * as CircularJSON from "circular-json";
import * as fse from "fs-extra";

let path        = require("path");
let browserSync = require("browser-sync");
const bs = browserSync.create();

import {BS_OPTION} from "./file_util";
import {publish} from "./nodegit_util";
import {FileUtil, GENERATOR_VERSION, FILE_PATH_PROFILE_TEMPLATE_JSON} from "./file_util";
import {
  GithubUser, GithubEvent,
  LanguageInformation, LanguageSummary,
  Repository, RepositorySummary
} from "./github_model";
import {GithubUtil} from "./github_util";
import {deserialize, deserializeAs, Deserializable} from "./serialize";
import {Profile, createProfile} from "./profile";
import {Util, Log} from "./util";

export class OptionSetting {
  constructor(public specifiers: string, public description: string) {}
}

export class GenerateOptions {
  public static GENERATE_OPTION_SPECIFIER_IGNORE_REPOS = "-i, --ignore [repository]";
  public static GENERATE_OPTION_IGNORE_REPOS = new OptionSetting(
    GenerateOptions.GENERATE_OPTION_SPECIFIER_IGNORE_REPOS, "ignore specified repositories");

  ignore: Array<string>;
}

export class CommandSetting {
  constructor(public specifiers: string,
              public description: string,
              public action: (...args: any[]) => void,
              public alias?: string) {}

  public static COMMAND_INIT = new CommandSetting(
    `init <user> <repo>`,
    "initialize `oh-my-github.json`",
    function(user: string, repo: string) {
      try {

        console.log("\n");
        Log.info("Initializing `oh-my-github.json`")
        console.log("\n");

        let profPath = FileUtil.getProfilePath();
        let prof = Profile.deserialize(Profile, FileUtil.readFileIfExist(FILE_PATH_PROFILE_TEMPLATE_JSON));

        prof._$meta.github_repository = repo;
        prof._$meta.github_user = user;

        FileUtil.writeFileIfNotExist(profPath, prof);
        Util.exitProcess();
      } catch (error) { Util.reportErrorAndExit(error); }
    }
  );

  public static COMMAND_GENERATE = new CommandSetting(
    `generate <token>`,
    "fill `oh-my-github.json` using github API",
    function(token: string, options: GenerateOptions) {

      console.log("\n");
      Log.info("Collecting Github Info...")

      let profPath = null;
      let prevProf: Profile = null;

      try {
        profPath = FileUtil.getProfilePath();
        prevProf = FileUtil.readFileIfExist(profPath);
      } catch (error) { Util.reportErrorAndExit(error); }

      createProfile(token, prevProf, options.ignore)
        .then(currentProf => {
          FileUtil.overwriteFile(profPath, currentProf);

          console.log("\n");
          Log.info("`oh-my-github.json` was created");
          console.log("\n");

          Util.exitProcess();
        })
        .catch(error => { Util.reportErrorAndExit(error); }); }
  );

  public static COMMAND_PREVIEW = new CommandSetting(
    `preview`,
    "preview your github profile",
    () => {
      /** assert if a profile json exists */
      try {
        FileUtil.readFileIfExist(FileUtil.getProfilePath());
        bs.init(BS_OPTION);
      } catch (error) { Util.reportErrorAndExit(error); }
    }
  );

  public static COMMAND_PUBLISH = new CommandSetting(
    `publish`,
    "publish gh-pages using the generated profile",
    () => {
      try {
        let profPath = FileUtil.getProfilePath();
        let profile: Profile = FileUtil.readFileIfExist(profPath);

        let user = profile._$meta.github_user;
        let repo = profile._$meta.github_repository;

        if (!user || user === "") Util.reportMessageAndExit(`invalid user name \`${user}\``);
        if (!repo || repo === "") Util.reportMessageAndExit(`invalid repo name \`${repo}\``);

        publish(user, repo)
          .then(() => Util.exitProcess())
          .catch(error => console.log(error));

      } catch (error) { Util.reportErrorAndExit(error); }
    }
  );
}

export class ParsedOption {
  @deserialize public flags: string;
  @deserialize public required: number;
  @deserialize public optional: number;
  @deserialize public bool: boolean;
  @deserialize public short: string;
  @deserialize public long: string;
  @deserialize public description: string;
}

export class ParsedCommand extends Deserializable {
  @deserializeAs("_name") public name: string;
  @deserializeAs("_description") public description: string;
  @deserializeAs(ParsedCommand) public commands: Array<ParsedCommand>;
  @deserializeAs(ParsedOption) public options: Array<ParsedOption>;
}

export class CommandFactory {
  public static create(argv: string[]): ParsedCommand {
    let parser = require("commander");

    const PROGRAM_NAME = "omg";

    process.title = PROGRAM_NAME;
    parser._name = PROGRAM_NAME;
    parser.version(GENERATOR_VERSION);

    parser
      .command(CommandSetting.COMMAND_INIT.specifiers)
      .description(CommandSetting.COMMAND_INIT.description)
      .action(CommandSetting.COMMAND_INIT.action);

    parser
      .command(CommandSetting.COMMAND_GENERATE.specifiers)
      .description(CommandSetting.COMMAND_GENERATE.description)
      .option(
        GenerateOptions.GENERATE_OPTION_IGNORE_REPOS.specifiers,
        GenerateOptions.GENERATE_OPTION_IGNORE_REPOS.description,
        (val, memo) => { memo.push(val); return memo; }, []
      )
      .action(CommandSetting.COMMAND_GENERATE.action);

    parser
      .command(CommandSetting.COMMAND_PREVIEW.specifiers)
      .description(CommandSetting.COMMAND_PREVIEW.description)
      .action(CommandSetting.COMMAND_PREVIEW.action);

    parser
      .command(CommandSetting.COMMAND_PUBLISH.specifiers)
      .description(CommandSetting.COMMAND_PUBLISH.description)
      .action(CommandSetting.COMMAND_PUBLISH.action);

    parser
      .on("--help", () => {
        console.log("  Examples:");
        console.log("");
        console.log("    $ omg init 1ambda oh-my-github");
        console.log("    $ omg generate 1b94910adb394014939fal1bfd193bfd762c4191");
        console.log("    $ omg preview");
        console.log("    $ omg publish");
        console.log("");
      });

    parser
      .command("*")
      .action((command) => {
        console.log("");
        Util.reportMessageAndExit(`unknown command: ${command}\n`);
      });

    /** use circular-json to avoid cyclic references */
    let serialized = CircularJSON.stringify(parser.parse(argv));
    let circularDeserialized = CircularJSON.parse(serialized);
    let deserialized = ParsedCommand.deserialize(ParsedCommand, circularDeserialized);
    return deserialized;
  }
}


