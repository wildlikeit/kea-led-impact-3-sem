'use strict';

var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var gulp = require('gulp');
var gulpif = require('gulp-if');

var config = require('../config');

gulp.task('fonts', function() {
	return gulp.src(config.paths.fonts.all)
		.pipe(changed(config.paths.fonts.dest)) // Ignore unchanged files
		.pipe(gulp.dest(config.paths.fonts.dest))
		.pipe(gulpif(browserSync.active, browserSync.reload({ stream: true, once: true })));
});
