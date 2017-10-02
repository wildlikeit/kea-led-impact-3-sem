'use strict';

/*global document*/
const skyAnim = require('./skyAnim');
const ledAnim = require('./ledAnim');


module.exports = {
	init,
};

function init(selectors, helpers, lampsModule, ajlamps) {
	let ledPlane = document.querySelector('#led-plane');
	ledPlane.addEventListener('mouseenter', function ledEnter() {
		this.emit('led-enter');
		skyAnim.darkenSky(selectors, helpers);
		selectors.scene.removeChild(document.querySelector('#lamp'));
		setTimeout(ledAnim.show(selectors, helpers), 400);
	});

	ledPlane.addEventListener('mouseleave', function ledLeave() {
		this.emit('led-leave');
		ledAnim.hide(selectors, helpers);
		lampsModule.init(selectors, helpers, ajlamps);
		skyAnim.lightenSky(selectors, helpers);
	});
}
