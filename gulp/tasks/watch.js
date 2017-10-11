'use strict';
var config = require('../config');
var fs = require('fs');
var gulp = require('gulp');
var path = require('path');

gulp.task('watch', function() {
	gulp.watch(config.paths.scss.all, ['styles']);
	gulp.watch(config.paths.js.all, ['lint']);
	gulp.watch(config.paths.views.all, ['views']);
	gulp.watch(config.paths.images.all, ['images']);
	gulp.watch(config.paths.models.all, ['models']);
	gulp.watch(config.paths.fonts.all, ['fonts']);
	gulp.watch(config.paths.js.all, function(e) {
		if (e.type === 'added') {
			// Updates timestamps on bulkModules and bulkConfig
			// causing watchify to rebundle.
			fs.utimes(path.resolve(config.aliasConfig.aliases.bulkModules), new Date(), new Date());
			fs.utimes(path.resolve(config.aliasConfig.aliases.bulkConfig), new Date(), new Date());
		}
	});
});
