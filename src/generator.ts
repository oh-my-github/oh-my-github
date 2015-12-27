/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/commander/commander.d.ts" />

'use strict';

let pretty = require('prettyjson');
let CircularJSON = require('circular-json');

import {Command} from "./command";

class CommandFactory {
  public static install(): Command {
    let parser = require("commander");

    parser
      .version('0.0.1')
      .option('-C, --chdir <path>', 'change the working directory')
      .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
      .option('-T, --no-tests', 'ignore test hook');

    parser
      .command('setup [env]')
      .description('run setup commands for all envs')
      .option("-s, --setup_mode [mode]", "Which setup mode to use")
      .action(function(env, options){
        var mode = options.setup_mode || "normal";
        env = env || 'all';
        console.log('setup for %s env(s) with %s mode', env, mode);
      });

    parser
      .command('exec <cmd>')
      .alias('ex')
      .description('execute the given remote cmd')
      .option("-e, --exec_mode <mode>", "Which exec mode to use")
      .action(function(cmd, options){
        console.log('exec "%s" using %s mode', cmd, options.exec_mode);
      }).on('--help', function() {
        console.log('  Examples:');
        console.log();
        console.log('    $ deploy exec sequential');
        console.log('    $ deploy exec async');
        console.log();
      });

    parser
      .command('*')
      .action(function(env){
        console.log('deploying "%s"', env);
      });

    let parsed = parser.parse(process.argv);
    let serialized = CircularJSON.stringify(parsed);
    let unserialized = CircularJSON.parse(serialized);

    return Command.deserialize<Command>(Command, parsed);
  }
}

let command = CommandFactory.install();
console.log(command);

