'use strict';

/*global document*/
const helpers = require('../helpers');

module.exports = {
	create,
	remove,
};

const led = helpers.createElement('a-entity', {
	'id': 'led',
});

const ledPlaneEl = helpers.appendNewElement(led, 'a-circle', {
	'id': 'led-plane',
	'color': '#0054a6',
	'rotation': '0 -55 0',
	'segments': '128',
	'radius': '5',
	'position': '15.302 6.5 -11.091',
});

const ledTextContainer = helpers.appendNewElement(ledPlaneEl, 'a-entity', {
	'id': 'ledTextContainer',
	'attribute': 'radius',
	'rotation': '0 15 0',
	'position': '0 -0.1 0.1',
});

helpers.appendNewElement(ledTextContainer, 'a-text', {
	'id': 'led-text',
	'mixin': 'ledTextMixin',
	'align': 'center',
	'position': '0 0 0',
	'font': 'https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/opensans/OpenSans-Bold.json',
	'shader': 'msdf',
	'value': 'CALCULATE YOUR',
});

helpers.appendNewElement(ledTextContainer, 'a-text', {
	'id': 'led-sub-text',
	'mixin': 'ledTextMixin',
	'align': 'center',
	'position': '0 -1.3 0',
	'font': 'https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/opensans/OpenSans-Bold.json',
	'shader': 'msdf',
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
