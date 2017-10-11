'use strict';

const helpers = require('./helpers');

module.exports = {
	init,
};

function init(ajlamps) {
	const selectors = require('./../selectors');
	// MIXINS //
	helpers.appendNewElement(selectors.assets, 'a-mixin', {
		'id': 'lampInfoTextMixin',
		'color': '#ffffff',
		'align': 'left',
		'baseline': 'bottom',
		'line-height': '60',
		'scale': '3 3 0',
		'rotation': '0 15 0',
	});

	helpers.appendNewElement(selectors.assets, 'a-mixin', {
		'id': 'ledTextMixin',
		'color': '#ffffff',
		'align': 'center',
		'baseline': 'bottom',
		'line-height': '80',
		'scale': '6 6',
		'rotation': '0 -15 0',
	});

	// LAMP //
	const lamp = helpers.appendNewElement(selectors.scene, 'a-entity', {
		'id': 'lamp',
	});

	// LAMP INFO //
	helpers.appendNewElement(lamp, 'a-plane', {
		'id': 'lampInfo-plane',
		'position': '-22 5.7 -12',
		'rotation': '0 15 0',
		'color': '#0054a6',
		'width': '19',
		'height': '9',
	});

	helpers.appendNewElement(lamp, 'a-text', {
		'id': 'lamp-name',
		'color': '#0054a6',
		'align': 'left',
		'baseline': 'bottom',
		'line-height': '60',
		'scale': '7 7',
		'position': '-10 13 -15',
		'value': ajlamps[0].name,
	});

	let posY = 8;
	ajlamps[0].measurements.forEach(function(measurement, index) {
		helpers.appendNewElement(lamp, 'a-text', {
			'id': 'measurement-' + [index + 1],
			'class': 'measurements lamp-text',
			'mixin': 'lampInfoTextMixin',
			'position': '-28 ' + posY + ' -9',
			'value': measurement.measurement,
		});

		helpers.appendNewElement(lamp, 'a-text', {
			'id': 'value-' + [index + 1],
			'class': 'values lamp-text',
			'mixin': 'lampInfoTextMixin',
			'position': '-15 ' + posY + ' -12.8',
			'value': measurement.value,
		});

		posY = (posY - 1);
	});
}
