'use strict';

/*global document*/
const skyAnim = require('./skyAnim');
const ledAnim = require('./ledImpactAnim');
const ledHours = require('./ledImpactHours');


module.exports = {
	init,
};

function init(helpers, lampsModule, ajlamps) {
	const selectors = require('./../../../selectors');
	let ledPlane = document.querySelector('#led-plane');
	ledPlane.addEventListener('mouseenter', function ledEnter() {
		skyAnim.darkenSky(selectors, helpers);
		// selectors.scene.removeChild(selectors.lamp);
		selectors.scene.removeChild(document.querySelector('#lamp'));
		ledAnim.show(selectors, helpers);
		ledHours.init(selectors, helpers);
	});


	// TODO: Add eventlistener for pressing the "back"/"next" plane

	// ledPlane.addEventListener('mouseleave', function ledLeave() {
	// 	ledAnim.hide(selectors, helpers);
	// 	lampsModule.init(helpers, ajlamps);
	// 	skyAnim.lightenSky(selectors, helpers);
	// });
}
