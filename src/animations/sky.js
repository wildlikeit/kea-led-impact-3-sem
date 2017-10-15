'use strict';

/*global document*/

const helpers = require('../helpers');

module.exports = {
	darken,
	lighten,
};

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
	const sky = document.querySelector('a-sky');

	if (ledSkyAnimActive) {
		sky.removeChild(ledLeaveSkyAnim);
	} else {
		ledSkyAnimActive = true;
	}

	sky.appendChild(ledEnterSkyAnim);
}

function lighten() {
	const sky = document.querySelector('a-sky');

	sky.removeChild(ledEnterSkyAnim);
	sky.appendChild(ledLeaveSkyAnim);
}
