'use strict';

/*global document*/
const helpers = require('../helpers');

module.exports = {
	create,
	remove,
};

const led = helpers.createElement('a-entity', {
	'id': 'led'
});

const ledPlaneEl = helpers.appendNewElement(led, 'a-circle', {
	'id': 'led-plane',
	'color': '#0054a6',
	'rotation': '0 -15 0',
	'segments': '128',
	'radius': '5',
	'position': '15.5  6.5 -13.5',
});

helpers.appendNewElement(ledPlaneEl, 'a-animation', {
	'id': 'ledPlaneScaleAnim',
	'attribute': 'radius',
	'from': '5',
	'to': '5.2',
	'dur': '1000',
	'repeat': 'indefinite',
	'direction': 'alternate',
	'ease': 'ease-in-out',
});

helpers.appendNewElement(led, 'a-text', {
	'id': 'led-text',
	'mixin': 'ledTextMixin',
	'position': '11.589 7.216 -14.371',
	'value': 'CALCULATE YOUR',
});

helpers.appendNewElement(led, 'a-text', {
	'id': 'led-sub-text',
	'mixin': 'ledTextMixin',
	'position': '12.382 5.890 -14.270',
	'value': 'LED SAVINGS',
});

function create() {
	const sceneContainerElement = document.querySelector('a-scene');
	sceneContainerElement.appendChild(led);
	return led;
}

function remove() {
	const sceneContainerElement = document.querySelector('a-scene');
	const ledElement = document.querySelector('#led');

	if (ledElement) {
		sceneContainerElement.removeChild(ledElement);
	}
}
