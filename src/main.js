'use strict';

/*global document*/

// DATA
const ajlampsData = require('./data/ajlamps.js');

const lampsModule = require('./modules/lamps.js');
const ledHoverAnimationModule = require('./modules/led-hover-anim.js');

// SETTINGS
const selectors = require('./selectors')(document);

lampsModule.init(selectors, ajlampsData);
ledHoverAnimationModule.init(selectors);
