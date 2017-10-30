'use strict';

/*global document*/
const helpers = require('../../helpers');

module.exports = {
	init,
	animIn,
};

const sceneElement = document.querySelector('a-scene');
const sky = document.querySelector('a-sky');

let ledImpactFigure;

function init() {
	setTimeout(function(){
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

		setTimeout(function(){
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
	// let carsToCreate = parseInt(((savings.yearlySavings * 1.222) / 40) * 10).toFixed(0));
	// let carsToCreate = 1;

	let points = 50;
	let x0 = 0;
	let z0 = 0;
	let r = 20;
	let positions = [];
	let rotations = [];

	for (let i = 0; i < points; i++) {
		let x = x0 + r * Math.cos(2 * Math.PI * i / -points);
		let z = z0 + r * Math.sin(2 * Math.PI * i / -points);
		let position = x + ' 0 ' + z;
		let rotation = '0 ' + (((360 / points) * i) + 15) + ' 0';
		rotations.push(rotation);
		positions.push(position);
	}

	setTimeout(function() {
		sceneElement.removeChild(cars);
		sceneElement.emit('carsEnd', true);
	}, 10000);

	const car = helpers.appendNewElement(cars, 'a-entity', {
		'obj-model': 'obj: #car-obj; mtl: #car-mtl;',
		'position': positions[positions.length - 1],
		'rotation': rotations[rotations.length - 1],
		'scale': '5 5 5',
	});

	let i = 0;
	let pPos;
	let cPos;
	let pRot;
	let cRot;

	function addAnimation() {
		setTimeout(function() {
			if (i < positions.length) {
				if (i == 0) {
					pPos = positions[positions.length - 1];
					pRot = rotations[positions.length - 1];
				} else {
					pPos = positions[i - 1];
					pRot = rotations[i - 1];
				}

				cPos = positions[i];
				cRot = rotations[i];
				helpers.appendNewElement(car, 'a-animation', {
					'id': 'carAnim-' + i,
					'attribute': 'position',
					'from': pPos,
					'to': cPos,
					'dur': '50',
					'ease': 'linear'
				});

				helpers.appendNewElement(car, 'a-animation', {
					'id': 'carAnimRotate-' + i,
					'attribute': 'rotation',
					'from': pRot,
					'to': cRot,
					'dur': '50',
					'ease': 'linear'
				});
				let prevAnim;
				if (i == 0) {
					prevAnim = document.querySelector('#carAnim-' + i);
				} else {
					prevAnim = document.querySelector('#carAnim-' + (i - 1));
				}

				if (prevAnim) {
					car.removeChild(prevAnim);
				}
				let prevAnimRotate;
				if (i == 0) {
					prevAnimRotate = document.querySelector('#carAnimRotate-' + i);
				} else {
					prevAnimRotate = document.querySelector('#carAnimRotate-' + (i - 1));
				}


				if (prevAnimRotate) {
					car.removeChild(prevAnimRotate);
				}
				i++;
				if (i == positions.length) {
					i = 0;
				}
				addAnimation();
			}
		}, 50);
	}
	addAnimation();
}
