'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const queryType = require('./lib/query-types');

const app = express();

app.use(morgan('dev'));

app.server = http.createServer(app);

app.set('trust proxy', true);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(queryType.middleware());

// Allow cors
app.use(function(req, res, next) {
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, X-Requested-With, auth_token, X-CSRF-Token, Authorization');
	res.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT, PATCH');
	res.set('Access-Control-Allow-Credentials', 'true');

	if (process.env.NODE_ENV === 'production') {
		if (
			req.url.indexOf('/images/') === 0 ||
			req.url.indexOf('/css/') === 0 ||
			req.url.indexOf('/js/') === 0
		) {
			//Cache static resources 30 days.
			res.setHeader('Cache-Control', 'public, max-age=2592000');
			res.setHeader('Expires', new Date(Date.now() + 2592000000).toUTCString());
		}
	}

	// intercept OPTIONS method
	if (req.method === 'OPTIONS') {
		return res.status(200).end();
	}

	next();
});

require('./routes')(app);

module.exports = app;
