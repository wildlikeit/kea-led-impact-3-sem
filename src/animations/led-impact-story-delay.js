'use strict';
/*global document*/
const helpers = require('../helpers');

module.exports = {
  init,
}

const sceneElement = document.querySelector('a-scene');
const assets = document.querySelector('a-assets');
const sky = document.querySelector('a-sky');
const camera = document.querySelector('a-camera');
const cursor = document.querySelector('#cursor');

function init() {
	const ledImpactTextMixin = helpers.appendNewElement(assets, 'a-mixin', {
		'id': 'ledImpactTextMixin',
		'color': '#ffffff',
		'align': 'center',
		'baseline': 'bottom',
		'line-height': '80',
		'scale': '8 8',
		'rotation': '0 -43 0',
	});

	const ledImpactText = helpers.appendNewElement(sceneElement, 'a-entity', {
		'id': 'ledImpactText',
		'position': '-6.067 5.107 -8.522',
	});

	const ledImpactText1 = helpers.appendNewElement(ledImpactText, 'a-text', {
		'id': 'ledImpactText1',
		'mixin': 'ledImpactTextMixin',
		'position': '13.078 9.010 -12.879',
		'value': 'want to see the environmental',
	});

	const ledImpactText2 = helpers.appendNewElement(ledImpactText ,'a-text', {
		'id': 'ledImpactText1',
		'mixin': 'ledImpactTextMixin',
		'position': '13.273 6.106 -12.517',
		'value': 'impact you could have on the',
	});

	const ledImpactText3 = helpers.appendNewElement(ledImpactText, 'a-text', {
		'id': 'ledImpactText1',
		'mixin': 'ledImpactTextMixin',
		'position': '14.664 3.181 -11.367',
		'value': 'planet by choosing led?',
	});

	setTimeout(ledImpactYesNoTextDelay, 1000);

	function ledImpactYesNoTextDelay() {
		const ledImpactYesText = helpers.appendNewElement(ledImpactText, 'a-text', {
			'id': 'ledImpactYesText',
			'mixin': 'ledImpactTextMixin',
			'position': '13.201 -6.33 -12.737',
			'value': 'YES',
			'scale': '25 25',
		});

		const ledImpactYesPlane = helpers.appendNewElement(ledImpactText, 'a-plane', {
			'id': 'ledImpactYesPlane',
			'position': '17.117 -6.330 -8.851',
			'rotation': '0 -43 0',
			'width': '10',
			'height': '5',
			'opacity': '0',
		});

		ledImpactYesPlane.addEventListener('click', function startLedImpact() {
			sky.removeChild(document.querySelector('#skyAnim'));
			sceneElement.removeChild(document.querySelector('#led'));
			ledImpactText.removeChild(ledImpactText1);
			ledImpactText.removeChild(ledImpactText2);
			ledImpactText.removeChild(ledImpactText3);
			ledImpactText.removeChild(ledImpactYesPlane);
			camera.removeChild(cursor);

			const ledImpactYesTextScale = helpers.appendNewElement(ledImpactYesText, 'a-animation', {
				'attribute': 'scale',
				'from': '25 25 0',
				'to': '55 55 0',
				'dur': '1000',
				'ease': 'ease-out',
			});

			const ledImpactYesTextRotate = helpers.appendNewElement(ledImpactYesText, 'a-animation', {
				'attribute': 'rotation',
				'from': '0 -43 0',
				'to': '0 -34 0',
				'dur': '1000',
				'ease': 'ease-out',
			});

			const ledImpactYesTextPosition = helpers.appendNewElement(ledImpactYesText, 'a-animation', {
				'attribute': 'position',
				'from': '13.201 -6.33 -12.737',
				'to': '16.235 4 -21.652',
				'dur': '1000',
				'ease': 'ease-out',
			});

			setTimeout(hideYesText, 1350);

			function hideYesText() {
				const ledImpactFigure = helpers.appendNewElement(ledImpactText, 'a-text', {
					'id': 'ledImpactFigure',
					'mixin': 'ledImpactTextMixin',
					'position': '22.235 4 -14.602',
					'align': 'center',
					'value': '0',
					'scale': '55 55',
					'rotation': '0 -34 0',
				});

				ledImpactText.removeChild(ledImpactYesText);
				sceneElement.emit('startLedImpactStory', true);
			}
		});
	}
}
