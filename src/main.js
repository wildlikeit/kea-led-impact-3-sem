'use strict';

/*global document*/

// DATA
const ajlampsData = require('./data/ajlamps.js');

// MODULES
const lampsModule = require('./modules/lamps.js');
const ledModule = require('./modules/led.js');
const ledHoverAnimationModule = require('./modules/animations/led-hover/controller.js');

// SETTINGS
const selectors = require('./selectors')(document);
const helpers = require('./modules/helpers');

lampsModule.init(selectors, helpers, ajlampsData);
ledModule.init(selectors, helpers);
ledHoverAnimationModule.init(selectors, helpers, lampsModule, ajlampsData);
