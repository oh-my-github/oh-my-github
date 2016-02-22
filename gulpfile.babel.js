'use strict';

import env   from "./config.js";

import ts    from "gulp-typescript";
import ncp   from "ncp";
import gulp  from "gulp";
import path  from "path";
import babel from "gulp-babel";
import watch from "gulp-watch";
import clean from "gulp-clean";
import merge from "merge2";

import source         from "vinyl-source-stream";
import tslint         from "gulp-tslint";
import rename         from "gulp-rename";
import notify         from "gulp-notify";
import buffer         from "vinyl-buffer";
import jasmine        from "gulp-jasmine";
import jsonlint       from "gulp-jsonlint";
import babelify       from "babelify";
import streamify      from "gulp-streamify";
import sourcemaps     from "gulp-sourcemaps";
import runSequence    from "run-sequence";

/** constants for TASK name */
const TASK_NAME_TEST         = "test";
const TASK_NAME_TSLINT       = "tslint";
const TASK_NAME_JSLINT       = "jslint";
const TASK_NAME_DIST         = "dist";
const TASK_NAME_BUILD        = "build";
const TASK_NAME_RELEASE      = "release";

const TASK_NAME_COMPILE_TS            = "compile-ts";  /** noEmitError: false */
const TASK_NAME_COMPILE_TS_NO_EMIT_ERROR = "compile-ts-no-emit-error";
const TASK_NAME_CLEAN_GENERATOR       = "clean-generator";
const TASK_NAME_CONT_GENERATOR_BUILD  = "cont-generator-build";

/** constants for FILEs */

const GENERATOR_WATCH_TARGET = [
  env.FILE.GENERATOR.SRC_TS,
  env.FILE.GENERATOR.TEST_TS,
  env.FILE.IGNORED_ALL_D_TS
];
const CLEAN_TARGET_GENERATOR = [ /** clean `*.js`, `*.js.map`, `*.d.ts` */
  env.DIR.BUILD_GENERATOR,
  `${env.FILE.GENERATOR.SRC_D_TS}`, `${env.FILE.GENERATOR.SRC_JS}`, `${env.FILE.GENERATOR.SRC_JS_MAP}`,
  `${env.FILE.GENERATOR.TEST_D_TS}`, `${env.FILE.GENERATOR.TEST_JS}`, `${env.FILE.GENERATOR.TEST_JS_MAP}`
];

const CLEAN_TARGET_VIEWER = [
  env.DIR.BUILD_VIEWER
];


/** tasks */

gulp.task(TASK_NAME_BUILD, callback => {
  runSequence(
    TASK_NAME_TSLINT,
    TASK_NAME_JSLINT,
    TASK_NAME_CLEAN_GENERATOR,
    TASK_NAME_COMPILE_TS,
    TASK_NAME_TEST,
    callback);
});

gulp.task(TASK_NAME_CLEAN_GENERATOR, () => {
  return gulp.src(CLEAN_TARGET_GENERATOR, {read: false})
    .pipe(clean());
});

gulp.task(TASK_NAME_TSLINT, () => {
  return gulp.src(GENERATOR_WATCH_TARGET.concat(["!generator/test/resource/sampleResponse.ts", "!generator/test/resource/sampleProfile.ts"]))
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
    "helpers": [
    ],
    "stopSpecOnExpectationFailure": false,
    "random": false
  };

  return gulp.src([env.FILE.GENERATOR.BUILD_TEST_JS])
    .pipe(jasmine({
      config: jasmineConfig,
      includeStackTrace: true,
      verbose: false
    }));
});

gulp.task(TASK_NAME_COMPILE_TS, () => {
  return compileTypescript(false);
});

gulp.task(TASK_NAME_COMPILE_TS_NO_EMIT_ERROR, () => {
  return compileTypescript(true);
});

gulp.task(TASK_NAME_CONT_GENERATOR_BUILD, () => {
  gulp.watch(GENERATOR_WATCH_TARGET).on("change", () => {
    runSequence(TASK_NAME_CLEAN_GENERATOR, TASK_NAME_COMPILE_TS_NO_EMIT_ERROR);
  });
});


function assertEnv(envVar) {
  const envValue = process.env[envVar];

  if ("undefined" === typeof envValue || "" === envValue)
    throw new Error(`Invalid ENV Variable: ${envVar}`)
}

function compileTypescript(noEmitError) {
  const tsProject = ts.createProject("tsconfig.json", {
    declaration: true,
    noEmitOnError: noEmitError
  });

  const tsResult =
    tsProject
      .src(GENERATOR_WATCH_TARGET, { base: "." })
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
}

gulp.task(TASK_NAME_DIST, callback => {
  dist()
    .then(() => callback())
    .catch(error => {
      console.error(error);
      callback();
    });
});

async function dist() {
  let buildSrcDirGenerator = env.DIR.BUILD_GENERATOR_SRC;
  let srcDirViewer       = env.DIR.VIEWER;
  let distDirGenerator = env.DIR.DIST_GENERATOR;
  let distDirViewer    = env.DIR.DIST_VIEWER;

  await copy(buildSrcDirGenerator, distDirGenerator);
  await copy(srcDirViewer, distDirViewer);
}

function copy(src, dest) {
  return new Promise((resolve, reject) => {
    ncp(src, dest, err => err ? reject(err) : resolve());
  });
}
