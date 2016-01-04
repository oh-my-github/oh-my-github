'use strict';

import env   from "./env.json";

import ts    from "gulp-typescript";
import gulp  from "gulp";
import path  from "path";
import babel from "gulp-babel";
import watch from "gulp-watch";
import clean from "gulp-clean";
import merge from "merge2";


import tslint         from "gulp-tslint";
import jasmine        from "gulp-jasmine";
import jsonlint       from "gulp-jsonlint";
import reporters      from "jasmine-reporters";
import sourcemaps     from "gulp-sourcemaps";
import runSequence    from "run-sequence";
import jasmineBrowser from "gulp-jasmine-browser";

/** constants for TASK name */
const TASK_NAME_TEST    = "test";
const TASK_NAME_COMPILE = "compile";
const TASK_NAME_TSLINT  = "tslint";
const TASK_NAME_JSLINT  = "jslint";
const TASK_NAME_DIST    = "dist";
const TASK_NAME_CLEAN   = "clean";
const TASK_NAME_BUILD   = "build";

/** constants for FILEs */
const WATCH_TARGET = [
  env.FILE.GENERATOR.SOURCE_TS,
  env.FILE.GENERATOR.TEST_TS,
  env.FILE.VIEWER.SOURCE_TS,
  env.FILE.VIEWER.TEST_TS,
  env.FILE.IGNORED_ALL_D_TS
];
const CLEAN_TARGET = [ /** clean `*.js`, `*.js.map`, `*.d.ts` */
  env.DIR.BUILD,
  `${env.FILE.GENERATOR.SRC_D_TS}`, `${env.FILE.GENERATOR.SRC_JS}`, `${env.FILE.GENERATOR.SRC_JS_MAP}`,
  `${env.FILE.GENERATOR.TEST_D_TS}`, `${env.FILE.GENERATOR.TEST_JS}`, `${env.FILE.GENERATOR.TEST_JS_MAP}`,
  `${env.FILE.VIEWER.SRC_D_TS}`, `${env.FILE.VIEWER.SRC_JS}`, `${env.FILE.VIEWER.SRC_JS_MAP}`,
  `${env.FILE.VIEWER.TEST_D_TS}`, `${env.FILE.VIEWER.TEST_JS}`, `${env.FILE.VIEWER.TEST_JS_MAP}`
];

gulp.task(TASK_NAME_BUILD, () => {
  runSequence(
    TASK_NAME_TSLINT,
    TASK_NAME_JSLINT,
    TASK_NAME_CLEAN,
    TASK_NAME_COMPILE,
    TASK_NAME_TEST);
});

gulp.task(TASK_NAME_CLEAN, () => {
  return gulp.src(CLEAN_TARGET, {read: false})
    .pipe(clean());
});

gulp.task(TASK_NAME_TSLINT, () => {
  return gulp.src(WATCH_TARGET.concat(["!generator/test/spec/sampleResponse.ts", "!generator/test/spec/sampleProfile.ts"]))
    .pipe(tslint())
    .pipe(tslint.report("full"));
});

gulp.task(TASK_NAME_JSLINT, () => {
  return gulp.src([env.FILE.DATABASE_TEMPLATE_JSON])
    .pipe(jsonlint())
    .pipe(jsonlint.reporter());
});

gulp.task(TASK_NAME_TEST, () => {

  /** pre-task: assert env vars */
  env.ASSERTED_ENV.forEach(envVar => {
    assertEnv(envVar);
  });

  const jasmineConfig = {
    //"spec_dir": env.DIR.BUILD_TEST,
    //"spec_files": [
    //  "**/*.js"
    //],
    "helpers": [
    ],
    "stopSpecOnExpectationFailure": false,
    "random": false
  };

  return gulp.src([env.FILE.VIEWER.BUILD_TEST_JS, env.FILE.GENERATOR.BUILD_TEST_JS])
    .pipe(jasmine({
      config: jasmineConfig,
      includeStackTrace: true,
      verbose: false
    }));
});

gulp.task("test-browser", () => {
  return gulp.src([env.FILE.VIEWER.BUILD_TEST_JS, env.FILE.GENERATOR.BUILD_TEST_JS])
    .pipe(watch(WATCH_TARGET))
    .pipe(jasmineBrowser.specRunner())
    .pipe(jasmineBrowser.server({port: 8888}));
});

gulp.task(TASK_NAME_COMPILE, () => {
  const tsProject = ts.createProject("tsconfig.json", {
    declaration: true
  });

  const tsResult =
    tsProject
      .src(WATCH_TARGET, { base: "." })
      .pipe(ts(tsProject));

  return merge([
    tsResult /** create `d.ts` */
      .dts
      .pipe(gulp.dest("./", {overwrite: true})),
    tsResult /** create `js`, `js.map` */
      .js /** ES6 */
      .pipe(sourcemaps.init())
      .pipe(babel()) /** ES5 */
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest(env.DIR.BUILD))
  ]);
});

function assertEnv(envVar) {
  const envValue = process.env[envVar];
  const EMPTY_STRING = "";

  if (typeof envValue === "undefined" || EMPTY_STRING === envValue)
    throw new Error(`Invalid ENV Variable: ${envVar}`)
}


