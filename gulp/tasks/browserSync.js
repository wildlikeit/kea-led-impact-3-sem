'use strict';

var browserSync = require('browser-sync');
var gulp = require('gulp');

var config = require('../config');

gulp.task('browserSync', function() {
	browserSync({
		proxy: 'localhost:' + config.serverport,
		ui: {
			port: config.serverport + 1,
		},
		port: config.serverport + 2,
	});
});
