'use strict';

module.exports = {
	environment: process.env.NODE_ENV || 'development',
	serverport: process.env.PORT || 3000,

	config: 'src/configFile.json',
	aliasConfig: {
		aliases: {
			configFile: './src/configFile.js',
			templates: './src/templates.js',
			bulkConfig: './src/bulkConfig.js',
			bulkModules: './src/bulkModules.js',
			node_modules: './node_modules',
		},
		verbose: false
	},
	paths: {
		build: 'build',
		src: 'src',
		scss: {
			entry: 'src/assets/scss/app.scss',
			all: 'src/assets/scss/**/*.scss',
			dest: 'build/css/'
		},
		js: {
			entry: 'src/main.js',
			all: 'src/**/*.js',
			dest: 'build/js'
		},
		views: {
			entry: 'src/index.html',
			all: 'src/**/*.html',
			dest: 'src'
		},
		images: {
			all: 'src/assets/images/**/*',
			dest: 'build/images'
		},
		models: {
			all: 'src/assets/models/**/*',
			dest: 'build/models'
		},
		favicon : {
			icon : 'src/tile.png',
			dest : 'build/images/favicon'
		},
		fonts: {
			all: 'src/assets/fonts/**/*',
			dest: 'build/fonts'
		}
	},
	names: {
		version : '-' + new Date().getTime(),
		js: {
			main: 'main.js'
		}
	}
};
