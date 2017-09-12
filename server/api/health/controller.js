'use strict';

var process = require('process');

module.exports = {
	stats: stats,
	iamok: iamok,
};

function stats(req, res) {
	var response = {
		status: 200,
		message: 'All systems nominal',
		process: {
			nodeVersion: process.version,
			platform: process.platform,
			arc: process.arch,
			pid: process.pid,
			uptime: process.uptime(),
			argv: process.argv,
			memoryUsage: process.memoryUsage(),
		},
	};

	res.status(200).json(response);
}

function iamok(req, res) {
	res.status(200).json({status: 200, message: 'iamok'});
}
