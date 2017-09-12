'use strict';

const environments = {
	common: require('./common'),
	development: require('./development'),
	production: require('./production'),
}

var environment = process.env.NODE_ENV || 'development';

var config = environments[environment];

if (!config) {
	throw new Error('Undefined config file')
}

module.exports = Object.assign({}, environments.common, config);
