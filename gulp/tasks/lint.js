'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var config = require('../config');

gulp.task('lint', function() {
	return gulp.src([config.paths.js.all, '!' + config.aliasConfig.aliases.configFile, '!' + config.aliasConfig.aliases.templates])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});
