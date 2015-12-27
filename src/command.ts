/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/commander/commander.d.ts" />
/// <reference path="../typings/circular-json/circular-json.d.ts" />

"use strict";

import {deserialize, deserializeAs, Deserializable} from "./serialize";
import * as CircularJSON from "circular-json";

export class Option {
  @deserializeAs("flags") public flags: string;
  @deserializeAs("required") public required: number;
  @deserializeAs("optional") public optional: number;
  @deserializeAs("bool") public bool: boolean;
  @deserializeAs("short") public short: string;
  @deserializeAs("long") public long: string;
  @deserializeAs("description") public description: string;
}

export class Command extends Deserializable {
  @deserializeAs(Command, "commands") public commands: Array<Command>;
  @deserializeAs(Option) public options: Array<Option>;
  @deserializeAs("_name") public name: string;
  @deserializeAs("_description") public description: string;
}

export class CommandFactory {
  public static create(argv: string[]): Command {
    let parser = require("commander");

    parser
      .version("0.0.1")
      .option("-C, --chdir <path>", "change the working directory")
      .option("-c, --config <path>", "set config path. defaults to ./deploy.conf")
      .option("-T, --no-tests", "ignore test hook");

    parser
      .command("setup [env]")
      .description("run setup commands for all envs")
      .option("-s, --setup_mode [mode]", "Which setup mode to use")
      .action(function(env, options){
        let mode = options.setup_mode || "normal";
        env = env || "all";
        console.log("setup for %s env(s) with %s mode", env, mode);
      });

    parser
      .command("exec <cmd>")
      .alias("ex")
      .description("execute the given remote cmd")
      .option("-e, --exec_mode <mode>", "Which exec mode to use")
      .action(function(cmd, options){
        console.log(`exec ${cmd} using ${options.exec_mode} mode"`);
      }).on("--help", function() {
        console.log("  Examples:");
        console.log();
        console.log("    $ deploy exec sequential");
        console.log("    $ deploy exec async");
        console.log();
      });

    /** use circular-json to avoid cyclic references */
    let serialized = CircularJSON.stringify(parser.parse(argv));
    let unserialized = CircularJSON.parse(serialized);

    return Command.deserialize<Command>(Command, unserialized);
  }
}
