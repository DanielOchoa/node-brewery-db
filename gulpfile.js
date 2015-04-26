'use strict';

var gulp    = require('gulp');
var jshint  = require('gulp-jshint');
var stylish = require('jshint-stylish');
var watch   = require('gulp-watch');
var shell   = require('gulp-shell')

var filesToWatch = [
  './lib/**/*.js',
  './index.js'
];

gulp.task('default', ['autotest'], function() {
  return watch(filesToWatch)
    .pipe(jshint({node: true}))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('exec-tests', shell.task([
    'tape test/* | faucet'
]));

gulp.task('autotest', ['exec-tests'], function() {
  gulp.watch(filesToWatch, ['exec-tests']);
});
