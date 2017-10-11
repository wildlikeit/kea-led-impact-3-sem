'use strict';

/*global document*/
const counter = require('./counter');
const trees = require('./trees');


module.exports = {
	init,
};

function init(){
	const selectors = require('./../../../selectors');
	selectors.scene.addEventListener('startLedImpactStory', function(){
		counter.init(selectors);
	});
}
