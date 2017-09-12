'use strict';

var atImport = require('postcss-import');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync');
var cleanCSS = require('gulp-clean-css');
var config = require('../config');
var discardComments = require('postcss-discard-comments');
var discardEmpty = require('postcss-discard-empty');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var mqpacker = require('css-mqpacker');
var postcss = require('gulp-postcss');
var postcssEasings = require('postcss-easings');
var postcsswillchange = require('postcss-will-change');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var singleCharset = require('postcss-single-charset');
var sourcemaps = require('gulp-sourcemaps');

var processors = [
	atImport(),
	postcsswillchange,
	postcssEasings,
	mqpacker({
		sort: true
	}),
	autoprefixer({
		browsers: ['last 2 version']
	}),
	discardEmpty,
	discardComments,
	singleCharset
];

gulp.task('styles', function() {
	return gulp.src(config.paths.scss.entry)
		.pipe(gulpif(!global.isProd, sourcemaps.init()))
		.pipe(sass({
			includePaths: [
				'node_modules/',
				'bower_components/'
			],
		})).on('error', sass.logError)
		.pipe(postcss(processors))
		.pipe(gulpif(!global.isProd, sourcemaps.write()))
		.pipe(gulpif(global.isProd, cleanCSS()))
		.pipe(gulpif(global.isProd, rename({suffix: config.names.version})))
		.pipe(gulp.dest(config.paths.scss.dest))
		.pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })));
});
