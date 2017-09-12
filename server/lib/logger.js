'use strict';

const winston = require('winston');
const Papertrail = require('winston-papertrail').Papertrail;
const os = require('os');

const config = require('../config');

const DefaultWinston = new winston.transports.Console({
	handleExceptions: true,
	prettyPrint: true,
	colorize: true,
	level: process.env.LOG_LEVEL || 'info',
});

const winstonOptions = {
	transports: [
		DefaultWinston,
	],
	levels: {
		error: 0,
		warn: 1,
		info: 2,
		verbose: 3,
		debug: 4,
		silly: 5,
		alert: 1,
	},
	colors: {
		error: 'red',
		warn: 'yellow',
		info: 'green',
		verbose: 'cyan',
		debug: 'magenta',
		silly: 'blue',
		alert: 'grey',
	},
};

// Dont push logs to papertrail if we are running tests
/* istanbul ignore if */
if (config.env === 'production' || config.env === 'development') {
	const papertrailTransport = new Papertrail({
		host: config.winston.host,
		port: config.winston.port,
		hostname: `vr-boilerplate-${config.env}:${os.hostname()}`,
		colorize: true,
		inlineMeta: true,
		level: process.env.LOG_LEVEL || 'info',
	});

	winstonOptions.transports.push(papertrailTransport);

	papertrailTransport.on('connect', function(err) {
		logger.info(err);
	});

	papertrailTransport.on('error', function(message) {
		logger.error(message);
	});
}

const logger = new winston.Logger(winstonOptions);

module.exports = logger;
