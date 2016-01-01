/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
/// <reference path="../../typings/jasmine/jasmine.d.ts" />

import {deserialize, Deserializable} from "../../src/serialize";
import {Option, Command} from "../../src/command";

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

      let raw = { commands:
        [ { commands: new Array<Command>(),
          options: new Array<Option>(),
          _execs: {},
          _allowUnknownOption: false,
          _args: new Array<string>(),
          _name: 'profile',
          _noHelp: false,
          parent: new Array<any>(),
          _description: 'get github profile using the provided token',
          _events: {},
          _eventsCount: 2 },
          { commands: new Array<Command>(),
            options: new Array<Option>(),
            _execs: {},
            _allowUnknownOption: false,
            _args: new Array<string>(),
            _name: 'exec',
            _noHelp: false,
            parent: new Array<any>(),
            _alias: 'ex',
            _description: 'execute the given remote cmd',
            _events: {},
            _eventsCount: 2 } ],
        options:
          [ { flags: '-V, --version',
            required: 0,
            optional: 0,
            bool: true,
            short: '-V',
            long: '--version',
            description: 'output the version number' },
            { flags: '-C, --chdir <path>',
              required: -13,
              optional: 0,
              bool: true,
              short: '-C',
              long: '--chdir',
              description: 'change the working directory' },
            { flags: '-c, --config <path>',
              required: -14,
              optional: 0,
              bool: true,
              short: '-c',
              long: '--config',
              description: 'set config path. defaults to ./deploy.conf' },
            { flags: '-T, --no-tests',
              required: 0,
              optional: 0,
              bool: false,
              short: '-T',
              long: '--no-tests',
              description: 'ignore test hook' } ],
        _execs: {},
        _allowUnknownOption: false,
        _args: new Array<string>(),
        _name: 'gulp',
        _version: '0.0.1',
        _events: { version: new Array<string>() },
        _eventsCount: 7,
        tests: true,
        rawArgs:
          [ '/Users/1ambda/.nvm/versions/node/v5.2.0/bin/node',
            '/Users/1ambda/.nvm/versions/node/v5.2.0/bin/gulp',
            'con-test' ],
        args: [ 'con-test' ]
      };

      let c1: Command = Command.deserialize(Command, raw);
      expect(c1.commands.length).toEqual(2);
      expect(c1.commands[0].name).toEqual(raw.commands[0]._name);
      expect(c1.commands[1].name).toEqual(raw.commands[1]._name);
      expect(c1.commands[0].description).toEqual(raw.commands[0]._description);
      expect(c1.commands[1].description).toEqual(raw.commands[1]._description);

      expect(c1.options.length).toEqual(4);
    });
  });
});