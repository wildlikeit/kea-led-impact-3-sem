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
const ajsounds = require('../data/ajsounds');

function init(savings) {
	const ledImpactTextMixin = helpers.appendNewElement(assets, 'a-mixin', {
		'id': 'ledImpactTextMixin',
		'color': '#ffffff',
		'baseline': 'bottom',
		'line-height': '80',
		'scale': '12 12',
		'rotation': '0 -43 0',
	});

	const ledImpactText = helpers.appendNewElement(sceneElement, 'a-entity', {
		'id': 'ledImpactText',
		'position': '-3.769 -2.030 -3.951',
	});

	const ledImpactText1 = helpers.appendNewElement(ledImpactText, 'a-text', {
		'id': 'ledImpactText1',
		'mixin': 'ledImpactTextMixin',
		'position': '18.663 9.010 -7.3',
		'font': 'https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/opensans/OpenSans-Bold.json',
		'shader': 'msdf',
		'align': 'center',
		'scale': '13 13',
		'value': 'SAVINGS',
	});

	const ledImpactText2 = helpers.appendNewElement(ledImpactText, 'a-text', {
		'id': 'ledImpactText1',
		'mixin': 'ledImpactTextMixin',
		'position': '18.663 6.106 -7.3',
		'font': 'https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/opensans/OpenSans-Light.json',
		'shader': 'msdf',
		'align': 'center',
		'value': 'You can save ' + savings.yearlySavingsPercent + '%',
	});

	ajsounds.impact_intro.addEventListener('ended', function() {
		ajsounds.impact_intro.currentTime = 0;
		helpers.appendNewElement(ledImpactText, 'a-animation', {
			'attribute': 'position',
			'from': '-3.769 -2.030 -3.951',
			'to': '-3.769 2.737 -3.951',
			'dur': '1000',
			'ease': 'ease-out',
		})
		setTimeout(ledImpactYesNoTextDelay, 1000);
	}, {
		passive: true,
	});

	function ledImpactYesNoTextDelay() {
		const ledImpactYesText = helpers.appendNewElement(ledImpactText, 'a-text', {
			'id': 'ledImpactYesText',
			'mixin': 'ledImpactTextMixin',
			'position': '18.663 -3.030 -7.2',
			'font': 'https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/opensans/OpenSans-Bold.json',
			'shader': 'msdf',
			'value': 'START',
			'align': 'center',
			'scale': '20 20',
			'opacity': '0',
		});

		helpers.appendNewElement(ledImpactYesText, 'a-animation', {
			'attribute': 'opacity',
			'from': '0',
			'to': '1',
			'dur': '500',
			'ease': 'ease-out',
		});

		const ledImpactYesPlane = helpers.appendNewElement(ledImpactText, 'a-plane', {
			'id': 'ledImpactYesPlane',
			'position': '18.663 0.309 -7.3',
			'rotation': '0 -43 0',
			'width': '15',
			'height': '5',
			'opacity': '0',
			'color': '#ff6961'
		});

		helpers.appendNewElement(ledImpactYesPlane, 'a-animation', {
			'attribute': 'opacity',
			'from': '0',
			'to': '1',
			'dur': '500',
			'ease': 'ease-out',
		});

		ledImpactYesPlane.addEventListener('click', function startLedImpact() {
			sky.removeChild(document.querySelector('#skyAnim'));
			sceneElement.removeChild(document.querySelector('#led'));
			ledImpactText.removeChild(ledImpactText1);
			ledImpactText.removeChild(ledImpactText2);
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
				'from': '18.663 -3.030 -7.2',
				'to': '22.235 4 -14.602',
				'dur': '1000',
				'ease': 'ease-out',
			});

			const ledImpactYesTextColor = helpers.appendNewElement(ledImpactYesText, 'a-animation', {
				'attribute': 'color',
				'from': '#FFFFFF',
				'to': '#000000',
				'dur': '1000',
				'ease': 'ease-out',
			});

			helpers.appendNewElement(sky, 'a-animation', {
				'attribute': 'color',
				'from': '#000000',
				'to': '#FFFFFF',
				'dur': '1000',
				'ease': 'ease-out',
			});

			setTimeout(hideYesText, 1500);

			function hideYesText() {
				const ledImpactFigure = helpers.appendNewElement(ledImpactText, 'a-text', {
					'id': 'ledImpactFigure',
					'mixin': 'ledImpactTextMixin',
					'color': '#000000',
					'position': '22.235 4 -14.602',
					'align': 'center',
					'value': '0',
					'scale': '55 55 0',
					'rotation': '0 -34 0',
				});

				ledImpactText.removeChild(ledImpactYesText);
				setTimeout(function() {
					sceneElement.emit('startLedImpactStory', true);
				}, 1000);
			}
		});
	}
}
