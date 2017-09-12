'use strict';

var changed = require('gulp-changed');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var browserSync = require('browser-sync');

var config = require('../config');

gulp.task('images', function() {
	return gulp.src(config.paths.images.all)
		.pipe(changed(config.paths.images.dest))
		.pipe(gulp.dest(config.paths.images.dest))
		.pipe(gulpif(browserSync.active, browserSync.reload({ stream: true, once: true })));
});
