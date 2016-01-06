'use strict';

import env   from "./env.json";

import ts    from "gulp-typescript";
import gulp  from "gulp";
import path  from "path";
import shim  from "browserify-shim";
import babel from "gulp-babel";
import watch from "gulp-watch";
import clean from "gulp-clean";
import merge from "merge2";

import source         from "vinyl-source-stream";
import tslint         from "gulp-tslint";
import rename         from "gulp-rename";
import notify         from "gulp-notify";
import uglify         from "gulp-uglify";
import inject         from "gulp-inject";
import buffer         from "vinyl-buffer";
import jasmine        from "gulp-jasmine";
import jsonlint       from "gulp-jsonlint";
import babelify       from "babelify";
import watchify       from "watchify";
import reporters      from "jasmine-reporters";
import streamify      from "gulp-streamify";
import bowerFiles     from "main-bower-files";
import browserify     from "browserify";
import sourcemaps     from "gulp-sourcemaps";
import browserSync    from 'browser-sync';
import runSequence    from "run-sequence";
import jasmineBrowser from "gulp-jasmine-browser";

/** constants for TASK name */
const TASK_NAME_TEST         = "test";
const TASK_NAME_TSLINT       = "tslint";
const TASK_NAME_JSLINT       = "jslint";
const TASK_NAME_DIST         = "dist";
const TASK_NAME_CLEAN        = "clean";
const TASK_NAME_BUILD        = "build";
const TASK_NAME_BS_START     = "bs-start";
const TASK_NAME_BS_RELOAD    = "bs-reload";
const TASK_NAME_COMPILE_TS   = "compile-ts";
const TASK_NAME_COMPILE_JSX  = "compile-jsx";
const TASK_NAME_INJECT       = "inject";
const TASK_NAME_PREVIEW      = "preview";

/** constants for FILEs */

const GENERATOR_WATCH_TARGET = [
  env.FILE.GENERATOR.SOURCE_TS,
  env.FILE.GENERATOR.TEST_TS,
  env.FILE.IGNORED_ALL_D_TS
];
const CLEAN_TARGET = [ /** clean `*.js`, `*.js.map`, `*.d.ts` */
  env.DIR.BUILD,
  `${env.FILE.GENERATOR.SRC_D_TS}`, `${env.FILE.GENERATOR.SRC_JS}`, `${env.FILE.GENERATOR.SRC_JS_MAP}`,
  `${env.FILE.GENERATOR.TEST_D_TS}`, `${env.FILE.GENERATOR.TEST_JS}`, `${env.FILE.GENERATOR.TEST_JS_MAP}`
];
const INJECT_CSS_TARGET = [

];

let bs = browserSync.create();

/** tasks */

gulp.task(TASK_NAME_BUILD, callback => {
  runSequence(
    TASK_NAME_TSLINT,
    TASK_NAME_JSLINT,
    TASK_NAME_CLEAN,
    TASK_NAME_COMPILE_TS,
    TASK_NAME_TEST,
    callback);
});

gulp.task(TASK_NAME_CLEAN, () => {
  return gulp.src(CLEAN_TARGET, {read: false})
    .pipe(clean());
});

gulp.task(TASK_NAME_TSLINT, () => {
  return gulp.src(GENERATOR_WATCH_TARGET.concat(["!generator/test/spec/sampleResponse.ts", "!generator/test/spec/sampleProfile.ts"]))
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

  return gulp.src([env.FILE.VIEWER.BUILD_TEST_JS, env.FILE.GENERATOR.BUILD_TEST_JS])
    .pipe(jasmine({
      config: jasmineConfig,
      includeStackTrace: true,
      verbose: false
    }));
});

gulp.task(TASK_NAME_COMPILE_TS, () => {
  const tsProject = ts.createProject("tsconfig.json", {
    declaration: true
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
});

gulp.task(TASK_NAME_BS_RELOAD, callback => {
  bs.reload();
  callback();
});

gulp.task(TASK_NAME_COMPILE_JSX, () => {
  let entryJSX = env.FILE.VIEWER.ENTRY_JSX;

  return browserify({
    entries: [entryJSX],
    extensions: [".jsx"]
    , debug: true
  })
    .transform(babelify, {
      presets: ["es2015", "react"],
      ignore: /bower_components/
    })
    .bundle()
    .on('error', notify.onError({
      title: "JSX Compile Error",
      message: "<%= error.message %>"
    }))
    .pipe(source(entryJSX))
    .pipe(rename((path) => { path.extname = ".js"; return path; }))
    .pipe(gulp.dest(env.DIR.BUILD));
  //.pipe(rename((path) => { path.extname = ".min.js"; return path; }))
  //.pipe(buffer())
  //.pipe(sourcemaps.init({ loadMaps: true }))
  //.pipe(uglify())
  //.pipe(sourcemaps.write("."))
  //.pipe(gulp.dest(env.DIR.BUILD));
});

gulp.task(TASK_NAME_INJECT, () => {
  var target = gulp.src(env.FILE.VIEWER.ENTRY_HTML, {base: "."});

  return target
    .pipe(inject(gulp.src(bowerFiles(), {read: false}), { name: "bower" }))
    .pipe(inject(gulp.src([env.FILE.VIEWER.BUILD_ENTRY_JS], {read: false}), {
      transform: (path) => {
        arguments[0] = path.replace(`/${env.DIR.BUILD_VIEWER}`, "");
        return inject.transform.apply(inject.transform, arguments);
      }
    }))
    .pipe(gulp.dest(env.DIR.BUILD));
});

gulp.task("BS_START", callback => {
  bs.init({ server: {
    baseDir: [ `${env.DIR.BOWER_COMPONENTS}/` , env.DIR.BUILD_VIEWER],
    routes: { "/bower_components": `${env.DIR.BOWER_COMPONENTS}/` }
  }});

  callback();
});

gulp.task(TASK_NAME_PREVIEW, callback => {
  gulp.watch(env.FILE.VIEWER.ALL_FILES_JSX).on("change", () => {
    runSequence(TASK_NAME_COMPILE_JSX, TASK_NAME_BS_RELOAD);
  });

  gulp.watch(env.FILE.VIEWER.ENTRY_HTML).on("change", () => {
    runSequence(TASK_NAME_INJECT, TASK_NAME_BS_RELOAD);
  });

  runSequence(
    TASK_NAME_COMPILE_JSX,
    TASK_NAME_INJECT,
    "BS_START",
    callback);
});

function assertEnv(envVar) {
  const envValue = process.env[envVar];

  if ("undefined" === typeof envValue || "" === envValue)
    throw new Error(`Invalid ENV Variable: ${envVar}`)
}

