'use strict';

const helpers = require('../../helpers');

module.exports = {
	darkenSky,
	lightenSky,
};

let ledEnterSkyAnim;
let ledLeaveSkyAnim;
let ledSkyAnimActive = false;

function darkenSky(selectors) {
	ledEnterSkyAnim = helpers.createElement('a-animation', {
		'id':'skyAnim',
		'attribute': 'material.color',
		'from': '#ffffff',
		'to': '#000000',
		'dur': '500',
		'ease': 'ease-out',
	});

	if (ledSkyAnimActive) {
		selectors.sky.removeChild(ledLeaveSkyAnim);
	} else {
		ledSkyAnimActive = true;
	}
	selectors.sky.appendChild(ledEnterSkyAnim);
}

function lightenSky(selectors){
	ledLeaveSkyAnim = helpers.createElement('a-animation',{
		'id':'skyAnim',
		'attribute': 'material.color',
		'from': '#000000',
		'to': '#ffffff',
		'dur': '500',
		'ease': 'ease-out',
	});
	selectors.sky.removeChild(ledEnterSkyAnim);
	selectors.sky.appendChild(ledLeaveSkyAnim);
}
