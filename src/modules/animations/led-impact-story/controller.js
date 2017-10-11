'use strict';

/*global document*/
const counter = require('./counter');
const trees = require('./trees');


module.exports = {
	init,
};

function init(helpers){
	const selectors = require('./../../../selectors');
	selectors.scene.addEventListener('startLedImpactStory', function(){
		counter.init(selectors, helpers);
	});
	selectors.scene.addEventListener('startTrees', function(){
		setTimeout(function(){
			trees.animIn(selectors, helpers);
		}, 1000);
	});
}
