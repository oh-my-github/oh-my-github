'use strict';

import env   from './env.json';

import gulp  from 'gulp';
import path  from 'path';
import ts    from 'gulp-typescript'
import del   from 'del'
import watch from 'gulp-watch'

import jasmine        from 'gulp-jasmine'
import reporters      from 'jasmine-reporters';
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

gulp.task('test-console', () => {
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

  var tsProject = ts.createProject('tsconfig.json');

  return tsProject.src(targetFiles, { base: base })
    .pipe(ts(tsProject))
    .js
    .pipe(gulp.dest(env.DIR.BUILD));
}


