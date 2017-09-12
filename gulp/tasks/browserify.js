'use strict';

var config = require('../config');
var handleErrors = require('../util/handleErrors');

var aliasify = require('aliasify');
var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var bulkify = require('bulkify');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var uglifyify = require('uglifyify');
var watchify = require('watchify');

// Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
function buildScript(file) {
	var bundler = browserify({
		entries: config.paths.js.entry,
		debug: !global.prod,
		cache: {},
		packageCache: {},
		fullPaths: false,
	}, watchify.args);
	if (!global.isProd) {
		bundler = watchify(bundler);
		bundler.on('update', function() {
			rebundle();
		});
	}

	var babelOptions = {
		compact: true,
		presets: [
			['env', { 'browsers': 'last 2 versions' }]
		]
	};

	var transforms = [
		{ tr: babelify, opt: babelOptions },
		{ tr: bulkify, opt: null },
		{ tr: aliasify, opt: config.aliasConfig },
	];

	if (global.isProd) {
		transforms.push({ tr: uglifyify, opt: { global: true, sourcemap: false } });
	}

	transforms.forEach(function(transform) {
		bundler.transform(transform.tr, transform.opt);
	});

	function rebundle() {
		var stream = bundler.bundle();

		gutil.log('Rebundle...');

		return stream.on('error', handleErrors)
			.pipe(source(file))
			.pipe(gulpif(global.isProd, rename({suffix: config.names.version})))
			.pipe(gulp.dest(config.paths.js.dest))
			.pipe(gulpif(browserSync.active, browserSync.reload({ stream: true, once: true })));
	}

	return rebundle();
}

gulp.task('browserify', function() {
	return buildScript(config.names.js.main);
});
