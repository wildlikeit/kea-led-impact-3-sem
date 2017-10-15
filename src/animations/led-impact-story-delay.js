'use strict';

// const helpers = require('../helpers');

module.exports = function ledImpactStoryDelay() {
	// const ledImpactTextMixin = helpers.createElement('a-mixin', {
	// 	'id': 'ledImpactTextMixin',
	// 	'color': '#ffffff',
	// 	'align': 'center',
	// 	'baseline': 'bottom',
	// 	'line-height': '80',
	// 	'scale': '8 8',
	// 	'rotation': '0 -43 0',
	// });
	// selectors.assets.appendChild(ledImpactTextMixin);

	// ledImpactText = helpers.createElement('a-entity', {
	// 	'id': 'ledImpactText',
	// 	'position': '-6.067 5.107 -8.522',
	// });
	// selectors.scene.appendChild(ledImpactText);

	// const ledImpactText1 = helpers.createElement('a-text', {
	// 	'id': 'ledImpactText1',
	// 	'mixin': 'ledImpactTextMixin',
	// 	'position': '13.078 9.010 -12.879',
	// 	'value': 'want to see the environmental',
	// });
	// ledImpactText.appendChild(ledImpactText1);

	// const ledImpactText2 = helpers.createElement('a-text', {
	// 	'id': 'ledImpactText1',
	// 	'mixin': 'ledImpactTextMixin',
	// 	'position': '13.273 6.106 -12.517',
	// 	'value': 'impact you could have on the',
	// });
	// ledImpactText.appendChild(ledImpactText2);

	// const ledImpactText3 = helpers.createElement('a-text', {
	// 	'id': 'ledImpactText1',
	// 	'mixin': 'ledImpactTextMixin',
	// 	'position': '14.664 3.181 -11.367',
	// 	'value': 'planet by choosing led?',
	// });
	// ledImpactText.appendChild(ledImpactText3);

	// setTimeout(ledImpactYesNoTextDelay, 1000);

	// function ledImpactYesNoTextDelay() {
	// 	const ledImpactYesText = helpers.createElement('a-text', {
	// 		'id': 'ledImpactYesText',
	// 		'mixin': 'ledImpactTextMixin',
	// 		'position': '13.201 -6.33 -12.737',
	// 		'value': 'YES',
	// 		'scale': '25 25',
	// 	});
	// 	ledImpactText.appendChild(ledImpactYesText);

	// 	const ledImpactYesPlane = helpers.createElement('a-plane', {
	// 		'id': 'ledImpactYesPlane',
	// 		'position': '17.117 -6.330 -8.851',
	// 		'rotation': '0 -43 0',
	// 		'width': '10',
	// 		'height': '5',
	// 		'opacity': '0',
	// 	});
	// 	ledImpactText.appendChild(ledImpactYesPlane);

	// 	const ledImpactNoText = helpers.createElement('a-text', {
	// 		'id': 'ledImpactNoText',
	// 		'mixin': 'ledImpactTextMixin',
	// 		'position': '24.236 -7.05 -2.356',
	// 		'value': 'NO',
	// 		'opacity': '0.35',
	// 		'scale': '15 15',
	// 	});
	// 	ledImpactText.appendChild(ledImpactNoText);

	// 	const ledImpactNoPlane = helpers.createElement('a-plane', {
	// 		'id': 'ledImpactNoPlane',
	// 		'position': '26.127 -7.105 -0.475',
	// 		'rotation': '0 -43 0',
	// 		'width': '6',
	// 		'height': '4',
	// 		'opacity': '0',
	// 	});
	// 	ledImpactText.appendChild(ledImpactNoPlane);

	// 	ledImpactYesPlane.addEventListener('click', function startLedImpact() {
	// 		selectors.sky.removeChild(document.querySelector('#skyAnim'));
	// 		selectors.scene.removeChild(document.querySelector('#led'));
	// 		selectors.scene.removeChild(document.querySelector('#lamp'));
	// 		ledImpactText.removeChild(ledImpactText1);
	// 		ledImpactText.removeChild(ledImpactText2);
	// 		ledImpactText.removeChild(ledImpactText3);
	// 		ledImpactText.removeChild(ledImpactYesPlane);
	// 		ledImpactText.removeChild(ledImpactNoText);
	// 		ledImpactText.removeChild(ledImpactNoPlane);

	// 		const ledImpactYesTextScale = helpers.createElement('a-animation', {
	// 			'attribute': 'scale',
	// 			'from': '25 25 0',
	// 			'to': '55 55 0',
	// 			'dur': '1000',
	// 			'ease': 'ease-out',
	// 		});
	// 		ledImpactYesText.appendChild(ledImpactYesTextScale);

	// 		const ledImpactYesTextRotate = helpers.createElement('a-animation', {
	// 			'attribute': 'rotation',
	// 			'from': '0 -43 0',
	// 			'to': '0 -34 0',
	// 			'dur': '1000',
	// 			'ease': 'ease-out',
	// 		});
	// 		ledImpactYesText.appendChild(ledImpactYesTextRotate);

	// 		const ledImpactYesTextPosition = helpers.createElement('a-animation', {
	// 			'attribute': 'position',
	// 			'from': '13.201 -6.33 -12.737',
	// 			'to': '16.235 4 -21.652',
	// 			'dur': '1000',
	// 			'ease': 'ease-out',
	// 		});
	// 		ledImpactYesText.appendChild(ledImpactYesTextPosition);

	// 		setTimeout(hideYesText, 1350);

	// 		function hideYesText() {
	// 			const ledImpactFigure = helpers.createElement('a-text', {
	// 				'id': 'ledImpactFigure',
	// 				'mixin': 'ledImpactTextMixin',
	// 				'position': '22.235 4 -14.602',
	// 				'align': 'center',
	// 				'value': '0',
	// 				'scale': '55 55',
	// 				'rotation': '0 -34 0',
	// 			});
	// 			ledImpactText.appendChild(ledImpactFigure);
	// 			ledImpactText.removeChild(ledImpactYesText);
	// 			selectors.scene.emit('startLedImpactStory', true);
	// 		}
	// 	});

	// 	ledImpactNoPlane.addEventListener('click', function backToLamp() {
	// 		hide();
	// 	});
	// }
}
