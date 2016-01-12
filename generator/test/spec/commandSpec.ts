/// <reference path="../../../typings/node/node.d.ts" />
/// <reference path="../../../typings/jasmine/jasmine.d.ts" />

import {
  CommandFactory, ParsedOption, ParsedCommand,
  GenerateOptions, OptionSetting, CommandSetting
} from "../../src/command";

describe("command.ts", () => {
  describe("CommandFactory.create", () => {
    it("should return ParsedCommand instance including all commands in CommandSettings", () => {
      /** since we run `gulp test-console`, we need to extract command.commands */
      //let commands = CommandFactory.create(process.argv).commands;
      //
      //expect(commands.length).toEqual(CommandSetting.ALL_COMMAND_SETTINGS.length);
      //
      ///** command validation: profile */
      //let profileCommands = commands.filter(c => c.name === CommandSetting.COMMAND_NAME_GENERATE);
      //expect(profileCommands.length).toEqual(1);
      //expect(profileCommands[0].options.length).toEqual(GenerateOptions.ALL_PROFILE_OPTIONS.length);
      //
      ///** command validation: init */
      //let initCommands = commands.filter(c => c.name === CommandSetting.COMMAND_NAME_INIT);
      //expect(initCommands.length).toEqual(1);
    });
  });
});
