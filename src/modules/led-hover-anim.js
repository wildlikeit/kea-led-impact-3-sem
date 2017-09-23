'use strict';

/*global document*/

const helpers = require('./helpers');


module.exports = {
	init,
};

function init(selectors) {
	var ledPlane = document.querySelector('#led-plane');
	var ledEnterSkyAnim;
	var ledLeaveSkyAnim;
	var ledAnimActive = false;

	ledPlane.addEventListener('mouseenter', function ledEnter(evnt) {
		this.emit('led-enter');

		ledEnterSkyAnim = helpers.createElement('a-animation', {
			'attribute': 'material.color',
			'from': '#ffffff',
			'to': '#000000',
			'dur': '500',
			'ease': 'ease-out',
		});

		if (ledAnimActive) {
			selectors.sky.removeChild(ledLeaveSkyAnim);
			ledAnimActive = true;
		} else {
			ledAnimActive = false;
		}

		selectors.sky.appendChild(ledEnterSkyAnim);
	});

	ledPlane.addEventListener('mouseleave', function ledLeave(evnt) {
		this.emit('led-leave');

		ledLeaveSkyAnim = helpers.createElement('a-animation',{
			'attribute': 'material.color',
			'from': '#000000',
			'to': '#ffffff',
			'dur': '500',
			'ease': 'ease-out',
		});

		selectors.sky.removeChild(ledEnterSkyAnim);
		selectors.sky.appendChild(ledLeaveSkyAnim);
	});
}
