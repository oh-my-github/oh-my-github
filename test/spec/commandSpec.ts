/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../typings/node/node.d.ts" />

import {
  CommandFactory, ParsedOption, ParsedCommand,
  ProfileOptions, OptionSetting, CommandSetting
} from "../../src/command";

let pretty = require("prettyjson");

describe("command.ts", () => {
  describe("CommandFactory.create", () => {
    it("should return ParsedCommand instance including all commands in CommandSettings", () => {

      /** since we run `gulp test-console`, we need to extract command.commands */
      let commands = CommandFactory.create(process.argv).commands;

      expect(commands.length).toEqual(CommandSetting.ALL_COMMAND_SETTINGS.length);

      let profileCommands = commands.filter(c => c.name === CommandSetting.COMMAND_NAME_PROFILE);

      expect(profileCommands.length).toEqual(1);
      expect(profileCommands[0].options.length).toEqual(ProfileOptions.ALL_PROFILE_OPTIONS.length);
    });
  });
});
