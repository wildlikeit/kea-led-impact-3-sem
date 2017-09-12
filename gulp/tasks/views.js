'use strict';

var config = require('../config');
var gulp = require('gulp');
var replace = require('gulp-replace');

// Views task
gulp.task('views', function() {
	gulp.src(config.paths.views.entry)
		.pipe(replace('[ver]', global.isProd ? config.names.version : ''))
		.pipe(gulp.dest(config.paths.build));
});


