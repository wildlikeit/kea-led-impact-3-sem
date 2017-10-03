'use strict';

/*global document*/
const trees = require('./trees');


module.exports = {
	init,
};

function init(selectors, helpers){
	selectors.scene.addEventListener('startLedImpactStory', function(){
		trees.animIn(selectors, helpers);
	});
}
