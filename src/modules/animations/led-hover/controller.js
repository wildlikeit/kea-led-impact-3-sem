'use strict';

/*global document*/
const sky = require('./sky');
const lamp = require('./lamp');
const led = require('./led');


module.exports = {
	init,
};

function init(selectors, helpers) {
	let ledPlane = document.querySelector('#led-plane');
	ledPlane.addEventListener('mouseenter', function ledEnter() {
		this.emit('led-enter');
		sky.darkenSky(selectors, helpers);
		lamp.hideLamp(selectors);
		setTimeout(led.displayLedImpact(selectors, helpers), 400);
	});

	ledPlane.addEventListener('mouseleave', function ledLeave() {
		this.emit('led-leave');
		led.hideLedImpact(selectors);
		lamp.displayLamp(selectors);
		sky.lightenSky(selectors, helpers);
	});
}
