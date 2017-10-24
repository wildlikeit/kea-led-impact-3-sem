'use strict';

var changed = require('gulp-changed');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var browserSync = require('browser-sync');

var config = require('../config');

gulp.task('audio', function() {
	return gulp.src(config.paths.audio.all)
		.pipe(changed(config.paths.audio.dest))
		.pipe(gulp.dest(config.paths.audio.dest))
		.pipe(gulpif(browserSync.active, browserSync.reload({ stream: true, once: true })));
});
