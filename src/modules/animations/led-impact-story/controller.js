'use strict';

/*global document*/
const trees = require('./trees');


module.exports = {
	init,
};

function init(helpers){
	const selectors = require('./../../../selectors');
	selectors.scene.addEventListener('startLedImpactStory', function(){
		trees.animIn(selectors, helpers);
	});
}
