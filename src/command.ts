/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/commander/commander.d.ts" />
/// <reference path="../typings/circular-json/circular-json.d.ts" />

"use strict";

import {deserialize, deserializeAs, Deserializable} from "./serialize";
import * as CircularJSON from "circular-json";
import {GithubUtil} from "./github_util";
let pretty = require("prettyjson");

const GENERATOR_VERSION = "0.0.1";

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

  language: boolean;
  repository: boolean;
  activity: boolean;
}

export class CommandSetting {
  constructor(public specifiers: string,
              public description: string,
              public action: (token, user, options) => void,
              public alias?: string) {}

  public static PROFILE_COMMAND = new CommandSetting(
    "profile <token> <user>",
    "get github profile using the provided token",
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
}

async function createProfile(token: string,
                             user: string,
                             options: ProfileOptions): Promise<any> {
  let profile = await GithubUtil.getUserProfile(token, user);
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

export class Option {
  @deserialize public flags: string;
  @deserialize public required: number;
  @deserialize public optional: number;
  @deserialize public bool: boolean;
  @deserialize public short: string;
  @deserialize public long: string;
  @deserialize public description: string;
}

export class Command extends Deserializable {
  @deserializeAs("_name") public name: string;
  @deserializeAs("_description") public description: string;
  @deserializeAs(Command) public commands: Array<Command>;
  @deserializeAs(Option) public options: Array<Option>;
}

export class CommandFactory {
  public static create(argv: string[]): Command {
    let parser = require("commander");

    parser
      .version(GENERATOR_VERSION);

    parser
      .command(CommandSetting.PROFILE_COMMAND.specifiers)
      .description(CommandSetting.PROFILE_COMMAND.description)
      .option(ProfileOptions.PROFILE_OPTION_LANGUAGE.specifiers, ProfileOptions.PROFILE_OPTION_LANGUAGE.description)
      .option(ProfileOptions.PROFILE_OPTION_REPOSITORY.specifiers, ProfileOptions.PROFILE_OPTION_REPOSITORY.description)
      .option(ProfileOptions.PROFILE_OPTION_ACTIVITY.specifiers, ProfileOptions.PROFILE_OPTION_ACTIVITY.description)
      .action(CommandSetting.PROFILE_COMMAND.action);

    /** use circular-json to avoid cyclic references */
    let serialized = CircularJSON.stringify(parser.parse(argv));
    let circularDeserialized = CircularJSON.parse(serialized);
    let deserialized = Command.deserialize(Command, circularDeserialized);
    return deserialized;
  }
}
