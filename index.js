'use strict';

var config = require('./server/config');
var logger = require('./server/lib/logger');
var app = require('./server');

// ==========================
// start the server =========
// ==========================
app.server.listen(config.port, function() {
	logger.info('SERVER_STARTED - Server startup', {
		env: config.env,
		port: config.port,
	});
});
