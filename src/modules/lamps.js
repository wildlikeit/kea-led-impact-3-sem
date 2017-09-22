'use strict';

/*global document*/

module.exports = {
	init,
};

function init(selectors, ajlamps) {
////////////////////////////LAMP INFO////////////////////////////

// MIXINS //
	var lampInfoTextMixin = document.createElement('a-mixin');
	lampInfoTextMixin.setAttribute('id', 'lampInfoTextMixin');
	lampInfoTextMixin.setAttribute('color', '#ffffff');
	lampInfoTextMixin.setAttribute('align', 'left');
	lampInfoTextMixin.setAttribute('baseline', 'bottom');
	lampInfoTextMixin.setAttribute('line-height', '60');
	lampInfoTextMixin.setAttribute('scale', '3 3');
	lampInfoTextMixin.setAttribute('rotation', '0 15 0');
	selectors.assets.appendChild(lampInfoTextMixin);

	// var ledPlaneMixin = document.createElement('a-mixin');
	// ledPlaneMixin.setAttribute('id', 'ledPlaneMixin');
	// ledPlaneMixin.setAttribute('rotation', '0 -15 0');
	// ledPlaneMixin.setAttribute('geometry.radius', '2.25');
	// ledPlaneMixin.setAttribute('geometry.segments', '64');
	// ledPlaneMixin.setAttribute('material.color', '#0054a6');
	// selectors.assets.appendChild(ledPlaneMixin);

	var ledTextMixin = document.createElement('a-mixin');
	ledTextMixin.setAttribute('id', 'ledTextMixin');
	ledTextMixin.setAttribute('color', '#ffffff');
	ledTextMixin.setAttribute('align', 'center');
	ledTextMixin.setAttribute('baseline', 'bottom');
	ledTextMixin.setAttribute('line-height', '80');
	ledTextMixin.setAttribute('scale', '6 6');
	ledTextMixin.setAttribute('rotation', '0 -15 0');
	selectors.assets.appendChild(ledTextMixin);

// LAMP INFO BACKGROUND //
	var lampInfoPlaneEl = document.createElement('a-plane');
	lampInfoPlaneEl.setAttribute('id', 'lampInfo-plane');
	lampInfoPlaneEl.setAttribute('position', '-22 5.7 -12');
	lampInfoPlaneEl.setAttribute('rotation', '0 15 0');
	lampInfoPlaneEl.setAttribute('color', '#0054a6');
	lampInfoPlaneEl.setAttribute('width', '19');
	lampInfoPlaneEl.setAttribute('height', '9');
	selectors.scene.appendChild(lampInfoPlaneEl);

// LAMP INFO NAME //
	var lampNameEl = document.createElement('a-text');
	lampNameEl.setAttribute('id', 'lamp-name');
	lampNameEl.setAttribute('color', '#0054a6');
	lampNameEl.setAttribute('align', 'left');
	lampNameEl.setAttribute('baseline', 'bottom');
	lampNameEl.setAttribute('line-height', '60');
	lampNameEl.setAttribute('scale', '7 7');
	lampNameEl.setAttribute('position', '-10 13 -15');
	lampNameEl.setAttribute('value', ajlamps[0].name);
	selectors.scene.appendChild(lampNameEl);

// LAMP INFO MEASUREMENTS //
	var posY = 8;
	for (var i = 0; i < ajlamps[0].measurements.length; i++) {
		var lampMeasurementEl = document.createElement('a-text');
		var lampMeasurementValueEl = document.createElement('a-text');
		lampMeasurementEl.setAttribute('id', 'measurement-' + [i+1]);
		lampMeasurementEl.setAttribute('class', 'measurements lamp-text');
		lampMeasurementEl.setAttribute('mixin', 'lampInfoTextMixin');
		lampMeasurementEl.setAttribute('position', '-28 ' + posY + ' -9');
		lampMeasurementEl.setAttribute('value', ajlamps[0].measurements[i].measurement);
		lampMeasurementValueEl.setAttribute('id', 'value-' + [i+1]);
		lampMeasurementValueEl.setAttribute('class', 'values lamp-text');
		lampMeasurementValueEl.setAttribute('mixin', 'lampInfoTextMixin');
		lampMeasurementValueEl.setAttribute('position', '-15 ' + posY + ' -12.8');
		lampMeasurementValueEl.setAttribute('value', ajlamps[0].measurements[i].value);
		selectors.scene.appendChild(lampMeasurementEl);
		selectors.scene.appendChild(lampMeasurementValueEl);
		posY = (posY-1);
	}

// LAMP SAVINGS LED//
	var ledPlaneEl = document.createElement('a-circle');
	ledPlaneEl.setAttribute('id', 'led-plane');
	ledPlaneEl.setAttribute('mixin', 'ledPlaneMixin');
	ledPlaneEl.setAttribute('position', '15.5  6.5 -13.5');
	selectors.scene.appendChild(ledPlaneEl);
	var ledTextEl = document.createElement('a-text');
	ledTextEl.setAttribute('class', 'led-text');
	ledTextEl.setAttribute('mixin', 'ledTextMixin');
	ledTextEl.setAttribute('position', '12.1 7.482 -13.748');
	ledTextEl.setAttribute('value', 'SAVE 70%');
	selectors.scene.appendChild(ledTextEl);
	var ledSubTextEl = document.createElement('a-text');
	ledSubTextEl.setAttribute('class', 'led-text');
	ledSubTextEl.setAttribute('mixin', 'ledTextMixin');
	ledSubTextEl.setAttribute('position', '11.8 5.759 -13.748');
	ledSubTextEl.setAttribute('value', 'USING LED');
	selectors.scene.appendChild(ledSubTextEl);

	selectors.scene.addEventListener('led-enter', function (evnt) {
		// var measurements = document.querySelectorAll('#measurements');
		// var measurements = document.querySelectorAll('#values');
		selectors.scene.removeChild(lampInfoPlaneEl);
		// selectors.scene.removeChild(lampNameEl);
		// selectors.scene.removeChild(measurements);
		// selectors.scene.removeChild(values);
		// selectors.scene.removeChild(ledTextEl);
		// selectors.scene.removeChild(ledSubTextEl);
	});

	selectors.scene.addEventListener('led-leave', function (evnt) {
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
