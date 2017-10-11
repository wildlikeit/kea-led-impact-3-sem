'use strict';

const helpers = require('./helpers');

module.exports = {
	init,
};

function init() {
	const selectors = require('./../selectors');
	// LAMP SAVINGS LED//

	const led = helpers.appendNewElement(selectors.scene, 'a-entity', {
		'id': 'led',
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
		'position': '12.1 7.482 -13.748',
		'value': 'SAVE 70%',
	});

	helpers.appendNewElement(led, 'a-text', {
		'id': 'led-sub-text',
		'mixin': 'ledTextMixin',
		'position': '11.8 5.759 -13.748',
		'value': 'USING LED',
	});
}
