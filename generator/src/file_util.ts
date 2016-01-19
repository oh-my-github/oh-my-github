/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/chalk/chalk.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
/// <reference path="../../typings/fs-extra/fs-extra.d.ts" />

import * as fse from "fs-extra";

let path = require("path");

/** file_util.js exists in build/src */
export const PROJECT_DIR = require('app-root-path').path;
export const ENV_JSON = require(path.join(PROJECT_DIR, "env.json"));

export const GENERATOR_VERSION = require(path.join(PROJECT_DIR, ENV_JSON.FILE.PACKAGE_JSON)).version;
export const FILE_PATH_PROFILE_TEMPLATE_JSON = path.join(PROJECT_DIR, ENV_JSON.FILE.PROFILE_TEMPLATE_JSON);
export const FILE_NAME_PROFILE_JSON = ENV_JSON.FILE.PROFILE_JSON;

export const BS_OPTION = { server: {
  baseDir: [ `${PROJECT_DIR}${ENV_JSON.DIR.BUILD_VIEWER}` ],
  routes: {
    "/bower_components": `${PROJECT_DIR}${ENV_JSON.DIR.BOWER_COMPONENTS}/`,
    "/resource": process.cwd()
  }
}};

export class FileUtil {

  /**
   * write file iff the file does not exist otherwise throw an error
   */
  public static writeFileIfNotExist(path: string, json: Object): void {
    fse.writeJsonSync(path, json, {flag: "wx"});
  }

  /**
   * overwrite file
   */
  public static overwriteFile(path: string, json: Object): void {
    fse.writeJsonSync(path, json, {flag: "w+"});
  }

  /**
   * read file iff the file exists otherwise throw an error
   */
  public static readFileIfExist(path: string): any {
    return fse.readJsonSync(path, {flag: "r"});
  }

  public static getProfilePath(): string {
    return FileUtil.combinePathWithCwd(FILE_NAME_PROFILE_JSON);
  }

  public static combinePathWithCwd(filePath: string) {
    return path.join(process.cwd(), filePath);
  }
}


