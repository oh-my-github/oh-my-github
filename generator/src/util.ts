/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/chalk/chalk.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />

import {
  red as chalkRed, blue as chalkBlue, green as chalkGreen,
  yellow as chalkYellow, magenta as chalkMagenta, bold as chalkBold
} from "chalk";

let unionBy = require('lodash.unionby');

export class Util {
  static copyObject<T>(object: T): T {
    return JSON.parse(JSON.stringify(object));
  }

  static unionBy<T>(ts1: Array<T>, ts2: Array<T>, filter: (T) => any): Array<T> {
    return unionBy(ts1, ts2, filter);
  }

  static reportErrorAndExit(error: Error) {
    Log.red(`  [${error.name}] `, error.message);
    process.exit(-1);
  }

  static reportMessageAndExit(message: string) {
    Log.red(`  [ERROR] `, message);
    process.exit(-1);
  }

  static exitProcess() {
    process.exit(1);
  }
}

export class Log {
  static blue(tag: any, message: any) {
    console.log(`${chalkBlue(tag)}${message}`)
  }

  static red(tag: any, message: any) {
    console.log(`${chalkRed(tag)}${message}`)
  }

  static green(tag: any, message: any) {
    console.log(`${chalkGreen(tag)}${message}`)
  }

  static yellow(tag: any, message: any) {
    console.log(`${chalkYellow(tag)}${message}`)
  }

  static magenta(tag: any, message: any) {
    console.log(`${chalkMagenta(tag)}${message}`)
  }

  static blueReverse(tag: any, message: any) {
    console.log(`${tag}${chalkBlue(message)}`)
  }

  static redReverse(tag: any, message: any) {
    console.log(`${tag}${chalkRed(message)}`)
  }

  static greenReverse(tag: any, message: any) {
    console.log(`${tag}${chalkGreen(message)}`)
  }

  static yellowReverse(tag: any, message: any) {
    console.log(`${tag}${chalkYellow(message)}`)
  }

  static magentaReverse(tag: any, message: any) {
    console.log(`${tag}${chalkMagenta(message)}`)
  }
}
