'use strict';

/*global document*/

const helpers = require('../helpers');

module.exports = {
	darken,
	lighten,
};

const sky = document.querySelector('a-sky');

let ledEnterSkyAnim = helpers
	.createElement('a-animation', {
		'id': 'skyAnim',
		'attribute': 'material.color',
		'from': '#ffffff',
		'to': '#000000',
		'dur': '500',
		'ease': 'ease-out',
	});

let ledLeaveSkyAnim = helpers
	.createElement('a-animation', {
		'id': 'skyAnim',
		'attribute': 'material.color',
		'from': '#000000',
		'to': '#ffffff',
		'dur': '500',
		'ease': 'ease-out',
	});

let ledSkyAnimActive = false;

function darken() {
	if (ledSkyAnimActive) {
		sky.removeChild(ledLeaveSkyAnim);
	} else {
		ledSkyAnimActive = true;
	}

	sky.appendChild(ledEnterSkyAnim);
}

function lighten() {
	sky.removeChild(ledEnterSkyAnim);
	sky.appendChild(ledLeaveSkyAnim);
}
