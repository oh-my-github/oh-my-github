/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../typings/node/node.d.ts" />

import {CommandFactory} from "../../src/command";

describe("command.ts", () => {
  describe("CommandFactory.create", () => {
    it("should return Command instance including 2 commands", () => {
      let command = CommandFactory.create(process.argv);
      let commandNames = new Set(command.commands.map(cmd => cmd.name));

      expect(commandNames.size).toEqual(2);
      expect(Array.from(commandNames)).toEqual(["profile", "exec"]);
    });
  });
});
