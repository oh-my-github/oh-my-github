/// <reference path="../typings/node/node.d.ts" />

'use strict';

let dashdash = require('dashdash');
let pretty = require('prettyjson');

class CommandOption {
  constructor(public names: string[],
              public type: string,
              public help: string) {}
}


class Command {
  constructor(public help: boolean) {}

  run() {
    if (this.help) {
      console.log('help');
    }
  }
}

let helpOption = new CommandOption (['help', 'h'], 'bool', 'Print this help and exit');

let options: CommandOption[] = [
  helpOption
];


let command: Command = new Command(dashdash.parse({options: options}));
command.run();

