'use strict';

var config = require('../config');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var modernizr = require('gulp-modernizr');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('modernizr', function() {
	return gulp.src([config.paths.js.all, config.paths.scss.all])
		.pipe(modernizr({
			'cache': true,
			'options': [
				'setClasses'
			]
		}))
		.pipe(gulpif(global.isProd, uglify()))
		.pipe(gulpif(global.isProd, rename({suffix: config.names.version})))
		.pipe(gulp.dest(config.paths.js.dest));
});
