'use strict';
/*global document*/

module.exports = {
	init,
};

function init(helpers, ajlamps) {
	const selectors = require('./../selectors');
	// MIXINS //
	const lampInfoTextMixin = helpers.createElement('a-mixin', {
		'id': 'lampInfoTextMixin',
		'color': '#ffffff',
		'align': 'left',
		'baseline': 'bottom',
		'line-height': '60',
		'scale': '3 3 0',
		'rotation': '0 15 0',
	});
	selectors.assets.appendChild(lampInfoTextMixin);

	const ledTextMixin = helpers.createElement('a-mixin', {
		'id': 'ledTextMixin',
		'color': '#ffffff',
		'align': 'center',
		'baseline': 'bottom',
		'line-height': '80',
		'scale': '6 6',
		'rotation': '0 -15 0',
	});
	selectors.assets.appendChild(ledTextMixin);

	// LAMP //
	const lamp = helpers.createElement('a-entity', {
		'id': 'lamp',
	});
	selectors.scene.appendChild(lamp);

	// LAMP INFO //
	const lampInfoPlaneEl = helpers.createElement('a-plane', {
		'id': 'lampInfo-plane',
		'position': '-22 5.7 -12',
		'rotation': '0 15 0',
		'color': '#0054a6',
		'width': '19',
		'height': '9',
	});
	lamp.appendChild(lampInfoPlaneEl);

	const lampNameEl = helpers.createElement('a-text', {
		'id': 'lamp-name',
		'color': '#0054a6',
		'align': 'left',
		'baseline': 'bottom',
		'line-height': '60',
		'scale': '7 7',
		'position': '-10 13 -15',
		'value': ajlamps[0].name,
	});
	lamp.appendChild(lampNameEl);

	let posY = 8;
	ajlamps[0].measurements.forEach(function(measurement, index) {
		let lampMeasurementEl = helpers.createElement('a-text', {
			'id': 'measurement-' + [index + 1],
			'class': 'measurements lamp-text',
			'mixin': 'lampInfoTextMixin',
			'position': '-28 ' + posY + ' -9',
			'value': measurement.measurement,
		});
		lamp.appendChild(lampMeasurementEl);

		let lampMeasurementValueEl = helpers.createElement('a-text', {
			'id': 'value-' + [index + 1],
			'class': 'values lamp-text',
			'mixin': 'lampInfoTextMixin',
			'position': '-15 ' + posY + ' -12.8',
			'value': measurement.value,
		});
		lamp.appendChild(lampMeasurementValueEl);

		posY = (posY - 1);
	});
}
