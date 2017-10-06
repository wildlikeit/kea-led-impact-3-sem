'use strict';

/*global document*/

// DATA
const ajlampsData = require('./data/ajlamps.js');

// MODULES
const lampsModule = require('./modules/lamps.js');
const ledModule = require('./modules/led.js');
const ledHoverModule = require('./modules/animations/led-hover/controller.js');
const ledImpactStory = require('./modules/animations/led-impact-story/controller.js');

// SETTINGS
// const selectors = require('./selectors')(document);
const helpers = require('./modules/helpers');

// IMPORTS
lampsModule.init(helpers, ajlampsData);
ledModule.init(helpers);
ledHoverModule.init(helpers, lampsModule, ajlampsData);
ledImpactStory.init(helpers);
