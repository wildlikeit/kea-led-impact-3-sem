'use strict';

var changed = require('gulp-changed');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var browserSync = require('browser-sync');

var config = require('../config');

gulp.task('models', function() {
	return gulp.src(config.paths.models.all)
		.pipe(changed(config.paths.models.dest))
		.pipe(gulp.dest(config.paths.models.dest))
		.pipe(gulpif(browserSync.active, browserSync.reload({ stream: true, once: true })));
});
