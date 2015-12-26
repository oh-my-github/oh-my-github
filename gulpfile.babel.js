'use strict';

import env   from './env.json'

import ts    from 'gulp-typescript'
import del   from 'del'
import gulp  from 'gulp'
import path  from 'path'
import babel from 'gulp-babel'
import watch from 'gulp-watch'


import jasmine        from 'gulp-jasmine'
import reporters      from 'jasmine-reporters'
import sourcemaps     from 'gulp-sourcemaps'
import runSequence    from 'run-sequence'
import jasmineBrowser from 'gulp-jasmine-browser'

gulp.task('clean', () => { return del([env.DIR.BUILD]); });

gulp.task('watch', () => {
  const watchTarget = [ env.FILE.SOURCE_TS, env.FILE.TEST_TS ];

  gulp.watch(watchTarget, () => {
    runSequence(
      'compile-src',
      'compile-test',
      'test-console');
  });
});

gulp.task('watch-src', () => {
  gulp.watch([env.FILE.SOURCE_TS], () => {
    gulp.run(['compile-src']);
  });
});

gulp.task('test-console', () => {
  /** pre-task: assert env vars */
  env.ASSERTED_ENV.forEach(envVar => {
    console.log(envVar);
    assertEnv(envVar);
  });

  const jasmineConfig = {
    "spec_dir": env.DIR.BUILD_TEST,
    "spec_files": [
      "**/*.js"
    ],
    "helpers": [
      "../../node_modules/babel-register/lib/node.js",
      "../../node_modules/babel-polyfill/lib/index.js"
    ],
    "stopSpecOnExpectationFailure": false,
    "random": false
  };

  return gulp.src([env.FILE.TEST_JS])
    .pipe(jasmine({
      verbose: true,
      config: jasmineConfig
    }));
});

gulp.task('test-browser', () => {
  return gulp.src([env.FILE.TEST_JS])
    .pipe(watch(watchTarget))
    .pipe(jasmineBrowser.specRunner())
    .pipe(jasmineBrowser.server({port: 8888}));
});

gulp.task('compile-src', () => {
  return compile(env.FILE.SOURCE_TS, env.DIR.BASE_SOURCE);
});

gulp.task('compile-test', () => {
  return compile(env.FILE.TEST_TS, env.DIR.BASE_TEST);
});

function compile(targetFiles, base) {
  const tsProject = ts.createProject('tsconfig.json');

  return tsProject.src(targetFiles, { base: base })
    .pipe(ts(tsProject))
    .js
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(env.DIR.BUILD));
}

function assertEnv(envVar) {
  const envValue = process.env[envVar];
  const EMPTY_STRING = "";

  if (typeof envValue === 'undefined' || EMPTY_STRING === envValue)
    throw new Error(`Invalid ENV Variable: ${envVar}`)
}


