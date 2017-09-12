'use strict';

// Common config for all environments
// ==================================
module.exports = {
	port: process.env.PORT || 8080,
	winston: {
		port: 29964,
		host: 'logs3.papertrailapp.com',
	},
};
