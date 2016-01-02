/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/chalk/chalk.d.ts" />
/// <reference path="../typings/fs-extra/fs-extra.d.ts" />
/// <reference path="../typings/commander/commander.d.ts" />
/// <reference path="../typings/circular-json/circular-json.d.ts" />

"use strict";

import {deserialize, deserializeAs, Deserializable} from "./serialize";
import * as CircularJSON from "circular-json";
import {GithubUtil} from "./github_util";
import * as fse from "fs-extra";
import {red as chalkRed, bold as chalkBold} from "chalk";

let path = require("path");
let pretty = require("prettyjson");

/** generator.js exists in build/src */
const PROJECT_DIR = path.join(path.dirname(__dirname), "../");
const ENV_JSON = require(path.join(PROJECT_DIR, "env.json"));

const GENERATOR_VERSION = require(path.join(PROJECT_DIR, ENV_JSON.FILE.PACKAGE_JSON)).version;

const PROFILE_TEMPLATE_JSON = require(path.join(PROJECT_DIR, ENV_JSON.FILE.PROFILE_TEMPLATE_JSON));
const FILE_NAME_PROFILE_JSON = ENV_JSON.FILE.PROFILE_JSON;

export class OptionSetting {
  constructor(public specifiers: string, public description: string) {}
}

export class ProfileOptions {
  public static PROFILE_OPTION_SPECIFIER_LANGUAGE   = "-l, --language";
  public static PROFILE_OPTION_SPECIFIER_REPOSITORY = "-r, --repository";
  public static PROFILE_OPTION_SPECIFIER_ACTIVITY   = "-a, --activity";

  public static PROFILE_OPTION_LANGUAGE   =
    new OptionSetting(ProfileOptions.PROFILE_OPTION_SPECIFIER_LANGUAGE, "show language summary");
  public static PROFILE_OPTION_REPOSITORY =
    new OptionSetting(ProfileOptions.PROFILE_OPTION_SPECIFIER_REPOSITORY, "show repository summary");
  public static PROFILE_OPTION_ACTIVITY   =
    new OptionSetting(ProfileOptions.PROFILE_OPTION_SPECIFIER_ACTIVITY, "show activity summary");

  public static ALL_PROFILE_OPTIONS = [
    ProfileOptions.PROFILE_OPTION_LANGUAGE,
    ProfileOptions.PROFILE_OPTION_REPOSITORY,
    ProfileOptions.PROFILE_OPTION_ACTIVITY
  ];

  language: boolean;
  repository: boolean;
  activity: boolean;
}

export class CommandSetting {
  constructor(public specifiers: string,
              public description: string,
              public action: (...args: any[]) => void,
              public alias?: string) {}

  public static COMMAND_NAME_PROFILE = "profile";
  public static COMMAND_PROFILE = new CommandSetting(
    `${CommandSetting.COMMAND_NAME_PROFILE} <token> <user>`,
    "Create Github profile using the provided token for the user",
    function(token: string, user: string, options: ProfileOptions) {
      createProfile(token, user, options)
        .then(result => {
          console.log(pretty.render(result));
        })
        .catch(err => {
          console.log(err);
        });
    }
  );

  public static COMMAND_NAME_INIT = "init";
  public static COMMAND_INIT = new CommandSetting(
    `${CommandSetting.COMMAND_NAME_INIT} <repo>`,
    "Initialize `oh-my-github.json` database file",
    function(repo: string) {
      let confPath = path.join(process.cwd(), FILE_NAME_PROFILE_JSON);
      let template = JSON.parse(JSON.stringify(PROFILE_TEMPLATE_JSON));
      template._$meta.repository = repo;

      createFileIfNotExist(confPath, template);
    }
  );

  public static ALL_COMMAND_SETTINGS = [
    CommandSetting.COMMAND_PROFILE,
    CommandSetting.COMMAND_INIT
  ];
}

async function createProfile(token: string,
                             user: string,
                             options: ProfileOptions): Promise<any> {
  let profile = await GithubUtil.getGithubUser(token, user);
  console.log("\n[USER PROFILE]");
  console.log(pretty.render(profile));

  if (options.repository) {
    console.log("\n[REPOSITORY]");
    let repoSummary = await GithubUtil.getRepositorySummary(token, user);
    console.log(pretty.render(repoSummary));
  }

  if (options.language) {
    console.log("\n[LANGUAGE]");
    let langSummary = await GithubUtil.getLanguageSummary(token, user);
    console.log(`language count: ${langSummary.getLangaugeCount()}`);
    console.log(pretty.render(langSummary.getLanguageObject()));
  }

  if (options.activity) {
    console.log("\n[ACTIVITY]");
    let activitySummary = await GithubUtil.getUserActivities(token, user);
    console.log(pretty.render(activitySummary));
    console.log(`activity count: ${activitySummary.length}`);
  }
}

/**
 * create and write content iff the file does not exist
 */
function createFileIfNotExist(path: string, json: Object): void {
  try {
    fse.writeJsonSync(path, json, {flag: "wx"});
  } catch (err) {
    console.log(`${chalkRed("Cannot create file: ")} ${chalkBold(path)}`);
    console.error(`\n${err.stack}`);
  }
}

function readFileIfExist(path: string): any {

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

    parser
      .version(GENERATOR_VERSION);

    parser
      .command(CommandSetting.COMMAND_PROFILE.specifiers)
      .description(CommandSetting.COMMAND_PROFILE.description)
      .option(ProfileOptions.PROFILE_OPTION_LANGUAGE.specifiers, ProfileOptions.PROFILE_OPTION_LANGUAGE.description)
      .option(ProfileOptions.PROFILE_OPTION_REPOSITORY.specifiers, ProfileOptions.PROFILE_OPTION_REPOSITORY.description)
      .option(ProfileOptions.PROFILE_OPTION_ACTIVITY.specifiers, ProfileOptions.PROFILE_OPTION_ACTIVITY.description)
      .action(CommandSetting.COMMAND_PROFILE.action);

    parser
      .command(CommandSetting.COMMAND_INIT.specifiers)
      .description(CommandSetting.COMMAND_INIT.description)
      .action(CommandSetting.COMMAND_INIT.action);

    /** use circular-json to avoid cyclic references */
    let serialized = CircularJSON.stringify(parser.parse(argv));
    let circularDeserialized = CircularJSON.parse(serialized);
    let deserialized = ParsedCommand.deserialize(ParsedCommand, circularDeserialized);
    return deserialized;
  }
}
