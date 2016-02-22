/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
/// <reference path="../../typings/fs-extra/fs-extra.d.ts" />

import * as fse from "fs-extra";

let path = require("path");
let projectDir = require('app-root-path').path;

/** since globally installed version runs on `oh-my-github/bin` we should remove `/bin` */
if (projectDir.endsWith("/bin")) projectDir = projectDir.substring(0, projectDir.length - 4);

export const PROJECT_DIR = projectDir;
export const CONFIG = require(path.join(PROJECT_DIR, "config.js"));

export const GENERATOR_VERSION = require(path.join(PROJECT_DIR, CONFIG.FILE.PACKAGE_JSON)).version;
export const FILE_PATH_PROFILE_TEMPLATE_JSON = path.join(PROJECT_DIR, CONFIG.FILE.PROFILE_TEMPLATE_JSON);
export const FILE_NAME_PROFILE_JSON = CONFIG.FILE.PROFILE_JSON;

export const BS_OPTION = { server: {
  baseDir: [ `${PROJECT_DIR}/${CONFIG.DIR.DIST_VIEWER}` ],
  routes: { "/oh-my-github": process.cwd() }
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


