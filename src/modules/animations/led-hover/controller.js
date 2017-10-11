'use strict';

/*global document*/
const skyAnim = require('./skyAnim');
const ledAnim = require('./ledImpactAnim');

module.exports = {
	init,
};

function init(lampsModule, ajlamps) {
	const selectors = require('./../../../selectors');
	let ledPlane = document.querySelector('#led-plane');
	ledPlane.addEventListener('mouseenter', function ledEnter() {
		skyAnim.darkenSky(selectors);
		// selectors.scene.removeChild(selectors.lamp);
		selectors.scene.removeChild(document.querySelector('#lamp'));
		ledAnim.show(selectors);
	});

	ledPlane.addEventListener('mouseleave', function ledLeave() {
		ledAnim.hide(selectors);
		lampsModule.init(ajlamps);
		skyAnim.lightenSky(selectors);
	});
}
