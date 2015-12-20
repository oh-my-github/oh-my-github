'use strict';

import env   from './env.json';

import gulp  from 'gulp';
import ts    from 'gulp-typescript'
import del   from 'del'
import watch from 'gulp-watch'

import jasmine        from 'gulp-jasmine'
import reporters      from 'jasmine-reporters';
import runSequence    from 'run-sequence'
import jasmineBrowser from 'gulp-jasmine-browser'


gulp.task('clean', () => { return del([env.DIR.BUILD]); });

gulp.task('watch', callback => {
  const watchTarget = [ env.FILE.SOURCE_TS, env.FILE.TEST_TS ];

  gulp.watch(watchTarget, () => {
    runSequence(
      'compile',
      'test-console',
      callback);
  });
});

gulp.task('test-console', () => {
  return gulp.src([env.FILE.TEST_JS])
    .pipe(jasmine({ reporter: new reporters.TerminalReporter() }));
});

gulp.task('test-browser', () => {
  return gulp.src([env.FILE.TEST_JS])
    .pipe(watch(watchTarget))
    .pipe(jasmineBrowser.specRunner())
    .pipe(jasmineBrowser.server({port: 8888}));
});

gulp.task('compile', callback => {
  runSequence(
    'compile-src',
    'compile-test',
    callback);
});

gulp.task('compile-src', () => {
  return compile(env.FILE.SOURCE_TS, env.DIR.BUILD_SOURCE);
});

gulp.task('compile-test', () => {
  return compile(env.FILE.TEST_TS, env.DIR.BUILD_TEST);
});

function compile(targetFiles, outputDir) {
  return gulp.src(targetFiles)
    .pipe(ts({ noImplicitAny: true }))
    .pipe(gulp.dest(outputDir));
}


