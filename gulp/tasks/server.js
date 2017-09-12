'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var nodemon = require('gulp-nodemon');

var config = require('../config');

gulp.task('server', function(cb) {
	var isReady = false;

	var settings = {
		script: './index.js',
		ext: 'js',
		ignore: ['./src'],
		stdout: false,
		env: { 'NODE_ENV': config.environment, PORT: config.serverport }
	};

	nodemon(settings)
		.on('error', function(err) {
			if (err.code === 'EADDRINUSE') {
				gutil.log('Development server is already started at port ' + config.serverport);
			} else {
				throw err;
			}
		})
		.on('restart', function() {
			gutil.log('restarted!');
		})
		.on('stderr', function(stderr) {
			process.stderr.write(stderr.toString());
		})
		.on('stdout', function(stdout) {
			process.stdout.write(stdout.toString());

			// to avoid nodemon being started multiple times
			// thanks @matthisk
			if (isReady) return;
			isReady = stdout.toString().includes('SERVER_START');
			if (isReady) return cb();
		})
		.on('start', function() {
			if (!isReady) {
				gutil.log('Awaiting server startup');
			}
		});
});
