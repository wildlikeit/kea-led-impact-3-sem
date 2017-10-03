'use strict';

/*global document*/
const skyAnim = require('./skyAnim');
const ledAnim = require('./ledImpactAnim');


module.exports = {
	init,
};

function init(selectors, helpers, lampsModule, ajlamps) {
	let ledPlane = document.querySelector('#led-plane');
	ledPlane.addEventListener('mouseenter', function ledEnter() {
		skyAnim.darkenSky(selectors, helpers);
		selectors.scene.removeChild(document.querySelector('#lamp'));
		ledAnim.show(selectors, helpers);
	});

	ledPlane.addEventListener('mouseleave', function ledLeave() {
		ledAnim.hide(selectors, helpers);
		lampsModule.init(selectors, helpers, ajlamps);
		skyAnim.lightenSky(selectors, helpers);
	});
}
