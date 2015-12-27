/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/commander/commander.d.ts" />

'use strict';

import {deserialize, deserializeAs, Deserializable} from "./serialize"

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

