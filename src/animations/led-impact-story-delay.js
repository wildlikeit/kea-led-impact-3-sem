'use strict';
/*global document*/
const helpers = require('../helpers');

module.exports = {
	init,
};

const sceneElement = document.querySelector('a-scene');
const assets = document.querySelector('a-assets');
const sky = document.querySelector('a-sky');
const camera = document.querySelector('a-camera');
const cursor = document.querySelector('#cursor');
const ajsounds = require('../data/ajsounds');

function init(savings) {
	camera.removeChild(cursor);
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
		'position': '-3.769 -1.030 -3.951',
	});

	const ledImpactText1 = helpers.appendNewElement(ledImpactText, 'a-text', {
		'id': 'ledImpactText1',
		'mixin': 'ledImpactTextMixin',
		'position': '18.663 12 -7.3',
		'font': 'https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/opensans/OpenSans-Light.json',
		'shader': 'msdf',
		'align': 'center',
		'scale': '13 13',
		'value': 'You could save',
	});

	const ledImpactText2 = helpers.appendNewElement(ledImpactText, 'a-text', {
		'id': 'ledImpactText1',
		'mixin': 'ledImpactTextMixin',
		'position': '18.663 4.225 -7.3',
		'font': 'https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/opensans/OpenSans-Bold.json',
		'shader': 'msdf',
		'align': 'center',
		'scale': '26 26',
		'value': savings.yearlySavingsPercent + '%',
	});

	const ledImpactText3 = helpers.appendNewElement(ledImpactText, 'a-text', {
		'id': 'ledImpactText1',
		'mixin': 'ledImpactTextMixin',
		'position': '18.663 4.45 -7.3',
		'font': 'https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/opensans/OpenSans-Light.json',
		'shader': 'msdf',
		'align': 'center',
		'scale': '6 6',
		'value': 'per kwh',
	});

	const ledImpactText4 = helpers.appendNewElement(ledImpactText, 'a-text', {
		'id': 'ledImpactText1',
		'mixin': 'ledImpactTextMixin',
		'position': '18.663 -0.035 -7.3',
		'font': 'https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/opensans/OpenSans-Light.json',
		'shader': 'msdf',
		'align': 'center',
		'scale': '13 13',
		'value': 'by using LED!',
	});

	setTimeout(function() {
		helpers.appendNewElement(ledImpactText, 'a-animation', {
			'attribute': 'opacity',
			'from': '1',
			'to': '0',
			'dur': '1000',
			'ease': 'ease-out',
		});
		setTimeout(startLedImpact, 1000);
	}, 8000);

	function startLedImpact() {

		sky.removeChild(document.querySelector('#skyAnim'));
		sceneElement.removeChild(document.querySelector('#led'));
		ledImpactText.removeChild(ledImpactText1);
		ledImpactText.removeChild(ledImpactText2);
		ledImpactText.removeChild(ledImpactText3);
		ledImpactText.removeChild(ledImpactText4);
		helpers.appendNewElement(sky, 'a-animation', {
			'attribute': 'color',
			'from': '#000000',
			'to': '#FFFFFF',
			'dur': '2300',
			'ease': 'ease-out',
		});

		setTimeout(function() {

			const trees = helpers.appendNewElement(ledImpactText, 'a-text', {
				'id': 'trees',
				'mixin': 'ledImpactTextMixin',
				'color': '#19b77e',
				'position': '24 7 -14.602',
				'align': 'center',
				'value': 'trees',
				'scale': '55 55 0',
				'rotation': '0 -42 0',
			});

			const ledImpactFigure = helpers.appendNewElement(ledImpactText, 'a-text', {
				'id': 'ledImpactFigure',
				'mixin': 'ledImpactTextMixin',
				'color': '#19b77e',
				'position': '22.235 5 -14.602',
				'align': 'center',
				'value': '0',
				'scale': '55 55 0',
				'rotation': '0 -35 0',
				'opacity': '0',
			});

			setTimeout(function() {
				helpers.appendNewElement(trees, 'a-animation', {
					'attribute': 'opacity',
					'from': '1',
					'to': '0',
					'dur': '500',
					'ease': 'ease-in-out',
				});
				setTimeout(ledImpactText.removeChild(trees), 500);

				helpers.appendNewElement(ledImpactFigure, 'a-animation', {
					'attribute': 'opacity',
					'from': '0',
					'to': '1',
					'dur': '600',
					'ease': 'ease-in-out',
				});
			}, 9500);

			sceneElement.emit('startLedImpactStory', true);

		}, 1500);
	}
}
