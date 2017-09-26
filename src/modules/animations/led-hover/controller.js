'use strict';

/*global document*/

const helpers = require('./../../helpers');


module.exports = {
	init,
};

function init(selectors, ledHoverLedAnimationModule) {
	let ledPlane = document.querySelector('#led-plane');
	let ledEnterSkyAnim;
	let ledLeaveSkyAnim;
	let ledSkyAnimActive = false;

	ledPlane.addEventListener('mouseenter', function ledEnter() {
		this.emit('led-enter');

		ledEnterSkyAnim = helpers.createElement('a-animation', {
			'attribute': 'material.color',
			'from': '#ffffff',
			'to': '#000000',
			'dur': '500',
			'ease': 'ease-out',
		});

		if (ledSkyAnimActive) {
			selectors.sky.removeChild(ledLeaveSkyAnim);
		} else {
			ledSkyAnimActive = true;
		}
		selectors.sky.appendChild(ledEnterSkyAnim);

		setTimeout(displayLedImpact, 400);
	});

	// function displayLedImpact(){
	// 	const ledImpactTextMixin = helpers.createElement('a-mixin', {
	// 		'id': 'ledImpactTextMixin',
	// 		'color': '#ffffff',
	// 		'align': 'center',
	// 		'baseline': 'bottom',
	// 		'line-height': '80',
	// 		'scale': '8 8',
	// 		'rotation': '0 -43 0',
	// 	});
	// 	selectors.assets.appendChild(ledImpactTextMixin);
	//
	// 	ledImpactText = helpers.createElement('a-entity', {
	// 		'id': 'ledImpactText',
	// 		'position': '-6.067 5.107 -8.522',
	// 	});
	// 	selectors.scene.appendChild(ledImpactText);
	//
	// 	const ledImpactText1 = helpers.createElement('a-text',{
	// 		'id': 'ledImpactText1',
	// 		'mixin': 'ledImpactTextMixin',
	// 		'position': '13.078 10.010 -12.879',
	// 		'value': 'want to see the environmental',
	// 	});
	// 	ledImpactText.appendChild(ledImpactText1);
	//
	// 	const ledImpactText2 = helpers.createElement('a-text',{
	// 		'id': 'ledImpactText1',
	// 		'mixin': 'ledImpactTextMixin',
	// 		'position': '13.273 7.106 -12.517',
	// 		'value': 'impact you could have on the',
	// 	});
	// 	ledImpactText.appendChild(ledImpactText2);
	//
	// 	const ledImpactText3 = helpers.createElement('a-text',{
	// 		'id': 'ledImpactText1',
	// 		'mixin': 'ledImpactTextMixin',
	// 		'position': '14.664 4.181 -11.367',
	// 		'value': 'planet by choosing led?',
	// 	});
	// 	ledImpactText.appendChild(ledImpactText3);
	// }

	ledPlane.addEventListener('mouseleave', function ledLeave() {
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

		selectors.scene.removeChild(ledImpactText);
	});
}
