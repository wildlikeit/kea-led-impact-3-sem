'use strict';

module.exports = {
	init,
};

function init(selectors, helpers, ajlamps) {

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

	const led = helpers.createElement('a-entity', {
		'id': 'led',
	});
	selectors.scene.appendChild(led);

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

	// LAMP SAVINGS LED//
	let ledPlaneEl = helpers.createElement('a-circle', {
		'id': 'led-plane',
		'color': '#0054a6',
		'rotation': '0 -15 0',
		'segments': '64',
		'radius': '5',
		'position': '15.5  6.5 -13.5',
	});
	led.appendChild(ledPlaneEl);

	const ledPlaneScaleAnim = helpers.createElement('a-animation', {
		'attribute': 'radius',
		'from': '5',
		'to': '5.2',
		'dur': '1000',
		'repeat': 'indefinite',
		'direction': 'alternate',
		'ease': 'ease-in-out',
	});
	ledPlaneEl.appendChild(ledPlaneScaleAnim);

	let ledTextEl = helpers.createElement('a-text', {
		'id': 'led-text',
		'mixin': 'ledTextMixin',
		'position': '12.1 7.482 -13.748',
		'value': 'SAVE 70%',
	});
	led.appendChild(ledTextEl);

	let ledSubTextEl = helpers.createElement('a-text', {
		'id': 'led-sub-text',
		'mixin': 'ledTextMixin',
		'position': '11.8 5.759 -13.748',
		'value': 'USING LED',
	});
	led.appendChild(ledSubTextEl);

	selectors.scene.addEventListener('led-enter', function() {

	});



	selectors.scene.addEventListener('led-leave', function() {

	});
}
