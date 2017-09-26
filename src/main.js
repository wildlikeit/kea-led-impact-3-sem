'use strict';

/*global document*/

// DATA
const ajlampsData = require('./data/ajlamps.js');

const lampsModule = require('./modules/lamps.js');
const ledHoverAnimationModule = require('./modules/animations/led-hover/controller.js');

// SETTINGS
const selectors = require('./selectors')(document);
const helpers = require('./modules/helpers');

lampsModule.init(selectors, helpers, ajlampsData);
ledHoverAnimationModule.init(selectors, helpers, lampsModule);
