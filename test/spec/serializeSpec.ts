/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
/// <reference path="../../typings/jasmine/jasmine.d.ts" />

import {deserialize, Deserializable} from "../../src/serialize";
import {ParsedOption, ParsedCommand} from "../../src/command";
import {SampleResources} from "./sampleResource"

class Car extends Deserializable {
  @deserialize public engine: string;
  @deserialize public wheels: number;
}

describe("serialize", () => {
  describe("deserialize", () => {
    it("should parse Car", () => {
      let json = {engine: "M5", wheels: 4};
      let c1 = Car.deserialize(Car, json);

      expect(c1.engine).toEqual(json.engine);
      expect(c1.wheels).toEqual(json.wheels);
    });

    it("should parse Command", () => {
      const raw = SampleResources.command1;
      let c1: ParsedCommand = ParsedCommand.deserialize(ParsedCommand, raw);
      expect(c1.commands.length).toEqual(2);
      expect(c1.commands[0].name).toEqual(raw.commands[0]._name);
      expect(c1.commands[1].name).toEqual(raw.commands[1]._name);
      expect(c1.commands[0].description).toEqual(raw.commands[0]._description);
      expect(c1.commands[1].description).toEqual(raw.commands[1]._description);

      expect(c1.options.length).toEqual(4);
    });
  });
});