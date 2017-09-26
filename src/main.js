'use strict';

/*global document*/

// DATA
const ajlampsData = require('./data/ajlamps.js');

const lampsModule = require('./modules/lamps.js');
const ledHoverAnimationModule = require('./modules/animations/led-hover/controller.js');
const ledHoverLedAnimationModule = require('./modules/animations/led-hover/led.js');

// SETTINGS
const selectors = require('./selectors')(document);

lampsModule.init(selectors, ajlampsData);
ledHoverAnimationModule.init(selectors, ledHoverLedAnimationModule);
ledHoverLedAnimationModule.init(selectors);
