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

function init(savings) {
	const ledImpactTextMixin = helpers.appendNewElement(assets, 'a-mixin', {
		'id': 'ledImpactTextMixin',
		'color': '#ffffff',
		'baseline': 'bottom',
		'line-height': '80',
		'scale': '10 10',
		'rotation': '0 -43 0',
	});

	const ledImpactText = helpers.appendNewElement(sceneElement, 'a-entity', {
		'id': 'ledImpactText',
		'position': '-3.477 7.161 -6.442',
	});

	const ledImpactText1 = helpers.appendNewElement(ledImpactText, 'a-text', {
		'id': 'ledImpactText1',
		'mixin': 'ledImpactTextMixin',
		'position': '18.663 9.010 -7.3',
        'align': 'center',
		'value': 'SAVINGS',
	});

	const ledImpactText2 = helpers.appendNewElement(ledImpactText ,'a-text', {
		'id': 'ledImpactText1',
		'mixin': 'ledImpactTextMixin',
		'position': '18.663 6.106 -7.3',
        'align': 'center',
		'value': 'You can save',
	});

	const ledImpactText3 = helpers.appendNewElement(ledImpactText, 'a-text', {
		'id': 'ledImpactText1',
		'mixin': 'ledImpactTextMixin',
		'position': '18.663 3.181 -7.3',
        'align': 'center',
		'value': savings.yearlySavingsPercent + '%',
	});

	setTimeout(ledImpactYesNoTextDelay, 1000);

	function ledImpactYesNoTextDelay() {
		const ledImpactYesText = helpers.appendNewElement(ledImpactText, 'a-text', {
			'id': 'ledImpactYesText',
			'mixin': 'ledImpactTextMixin',
			'position': '18.663 -6.33 -7.3',
			'value': 'START',
            'align': 'center',
			'scale': '25 25',
		});

		const ledImpactYesPlane = helpers.appendNewElement(ledImpactText, 'a-plane', {
			'id': 'ledImpactYesPlane',
			'position': '18.663 -6.33 -7.3',
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
				'from': '18.663 -6.33 -7.3',
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
