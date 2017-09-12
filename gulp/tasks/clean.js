'use strict';

var config = require('../config');
var del = require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('clean', function() {
	return del([config.paths.build]).then(function() {
		gutil.log(gutil.colors.red('Cleaning...'));
	});
});