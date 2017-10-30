'use strict';

/*global document*/
const helpers = require('../../helpers');

module.exports = {
	init,
	animIn,
};

const sceneElement = document.querySelector('a-scene');
const sky = document.querySelector('a-sky');
const ajsounds = require('../../data/ajsounds');

let ledImpactFigure;

function init() {
	setTimeout(function() {
		ledImpactFigure = helpers.appendNewElement(sceneElement, 'a-text', {
			'id': 'ledImpactFigure',
			'color': '#19b77e',
			'position': '13.700 -1 -22.485',
			'align': 'center',
			'baseline': 'bottom',
			'scale': '55 55',
			'rotation': '0 -34 0',
			'value': '0',
			'opacity': '0',
		});
		const cars = helpers.appendNewElement(sceneElement, 'a-text', {
			'id': 'cars',
			'mixin': 'ledImpactTextMixin',
			'color': '#19b77e',
			'position': '14.200 4 -21.985',
			'align': 'center',
			'value': 'cars',
			'scale': '55 55 0',
			'rotation': '0 -34 0',
		});

		setTimeout(function() {
			helpers.appendNewElement(cars, 'a-animation', {
				'attribute': 'opacity',
				'from': '1',
				'to': '0',
				'dur': '500',
				'ease': 'ease-in-out',
			});
			setTimeout(sceneElement.removeChild(cars), 500);

			helpers.appendNewElement(ledImpactFigure, 'a-animation', {
				'attribute': 'opacity',
				'from': '0',
				'to': '1',
				'dur': '600',
				'ease': 'ease-in-out',
			});
		}, 6500);
	}, 6000);

}

function animIn(savings) {
	sceneElement.removeChild(ledImpactFigure);


	const cars = helpers.appendNewElement(sceneElement, 'a-entity', {
		'id': 'cars',
	});

	const path = helpers.appendNewElement(cars, 'a-curve', {
		'id': 'path',
	});

	// FUTURE DEVELOPMENT
	let carsToCreate = parseInt(((savings.yearlySavings * 1.222) / 8000).toFixed(0));

	let points = 50;
	let x0 = 0;
	let z0 = 0;
	let r = 40;
	for (let i = 0; i <= points; i++) {
		let x = x0 + r * Math.cos(2 * Math.PI * i / -points);
		let z = z0 + r * Math.sin(2 * Math.PI * i / -points);
		let position = x + ' 0 ' + z;
		console.log(position);
		const curve = helpers.appendNewElement(path, 'a-curve-point', {
			'position': position,
		});
	}

	let carsCounter = 0;

	function createCar() {
		setTimeout(function() {
			const car = helpers.appendNewElement(cars, 'a-entity', {
				'obj-model': 'obj: #car-obj; mtl: #car-mtl;',
				'alongpath': 'curve: #path; dur: 10000; loop: true; rotate: true;',
				'scale': '5 5 5',
			});
			if (carsCounter < carsToCreate) {
				createCar();
				carsCounter++;
			} else if (carsCounter >= carsToCreate) {
				setTimeout(function() {
					sceneElement.removeChild(cars);
					sceneElement.emit('carsEnd', true);
				}, 6000);
			}
		}, 10000 / (carsToCreate + 1));
	}
	ajsounds.cars_noise.play();
	createCar();
}
