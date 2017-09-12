'use strict';

var express = require('express');

var controller = require('./controller');

var router = express.Router();

router.get('/', controller.iamok);
router.get('/stats', controller.stats);

module.exports = router;
