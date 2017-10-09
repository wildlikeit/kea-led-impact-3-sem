'use strict';

const express = require('express');
const path = require('path');

module.exports = function(app) {
	// Static files
	app.use('/', express.static(path.join(__dirname, '../build/')));

	// Api
	app.use('/api/health', require('./api/health'));

	app.all('/*', function(req, res) {
		// Test if this looks like an api endpoint
		if (req.url.match(/^\/(api)/)) {
			return res.status(404).json({
				status: 404,
				error: 'Not found',
				message: req.method + ' ' + req.url + ' did not match any configured routes.',
			});
		}

		// Serve index.html if not, so as to leave routing up to Angular
		return res.status(404).send();
	});
};
