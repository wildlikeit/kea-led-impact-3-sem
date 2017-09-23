'use strict';

const helpers = require('./helpers');

module.exports = {
	init,
};

function init(selectors, ajlamps) {
	////////////////////////////LAMP INFO////////////////////////////

	// MIXINS //
	const lampInfoTextMixin = helpers.createElement('a-mixin', {
		'id': 'lampInfoTextMixin',
		'color': '#ffffff',
		'align': 'left',
		'baseline': 'bottom',
		'line-height': '60',
		'scale': '3 3',
		'rotation': '0 15 0',
	});

	selectors.assets.appendChild(lampInfoTextMixin);

	// var ledPlaneMixin = document.createElement('a-mixin');
	// var ledTextMixin = helpers.createElement('a-mixin', {
	// 	'id': 'ledPlaneMixin',
	// 	'rotation': '0 -15 0',
	// 	'geometry.radius': '2.25',
	// 	'geometry.segments': '64',
	// 	'material.color': '#0054a6',
	// });
	// selectors.assets.appendChild(ledPlaneMixin);

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

	// LAMP INFO BACKGROUND //
	const lampInfoPlaneEl = helpers.createElement('a-plane', {
		'id': 'lampInfo-plane',
		'position': '-22 5.7 -12',
		'rotation': '0 15 0',
		'color': '#0054a6',
		'width': '19',
		'height': '9',
	});

	selectors.scene.appendChild(lampInfoPlaneEl);

	// LAMP INFO NAME //
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

	selectors.scene.appendChild(lampNameEl);

	// LAMP INFO MEASUREMENTS //
	let posY = 8;
	ajlamps[0].measurements.forEach(function(measurement, index) {
		let lampMeasurementEl = helpers.createElement('a-text', {
			'id': 'measurement-' + [index + 1],
			'class': 'measurements lamp-text',
			'mixin': 'lampInfoTextMixin',
			'position': '-28 ' + posY + ' -9',
			'value': measurement.measurement,
		});

		let lampMeasurementValueEl = helpers.createElement('a-text', {
			'id': 'value-' + [index + 1],
			'class': 'values lamp-text',
			'mixin': 'lampInfoTextMixin',
			'position': '-15 ' + posY + ' -12.8',
			'value': measurement.value,
		});

		selectors.scene.appendChild(lampMeasurementEl);
		selectors.scene.appendChild(lampMeasurementValueEl);
		posY = (posY - 1);
	});

	// LAMP SAVINGS LED//
	let ledPlaneEl = helpers.createElement('a-circle', {
		'id': 'led-plane',
		'mixin': 'ledPlaneMixin',
		'position': '15.5  6.5 -13.5',
	});

	selectors.scene.appendChild(ledPlaneEl);

	let ledTextEl = helpers.createElement('a-text', {
		'class': 'led-text',
		'mixin': 'ledTextMixin',
		'position': '12.1 7.482 -13.748',
		'value': 'SAVE 70%',
	});

	selectors.scene.appendChild(ledTextEl);

	let ledSubTextEl = helpers.createElement('a-text', {
		'class': 'led-text',
		'mixin': 'ledTextMixin',
		'position': '11.8 5.759 -13.748',
		'value': 'USING LED',
	});

	selectors.scene.appendChild(ledSubTextEl);

	selectors.scene.addEventListener('led-enter', function(evnt) {
		// var measurements = document.querySelectorAll('#measurements');
		// var measurements = document.querySelectorAll('#values');
		selectors.scene.removeChild(lampInfoPlaneEl);
		selectors.scene.removeChild(lampNameEl);
		// selectors.scene.removeChild(measurements);
		// selectors.scene.removeChild(values);
		selectors.scene.removeChild(ledTextEl);
		selectors.scene.removeChild(ledSubTextEl);
	});

	selectors.scene.addEventListener('led-leave', function(evnt) {
		// var measurements = document.querySelectorAll('.measurements');
		// var values = document.querySelectorAll('.values');
		selectors.scene.appendChild(lampInfoPlaneEl);
		selectors.scene.appendChild(lampNameEl);
		// selectors.scene.removeChild(measurements);
		// selectors.scene.removeChild(values);
		selectors.scene.appendChild(ledTextEl);
		selectors.scene.appendChild(ledSubTextEl);
	});
}
