/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/commander/commander.d.ts" />

"use strict";

import {CommandFactory} from "./command";

let command = CommandFactory.create(process.argv);
