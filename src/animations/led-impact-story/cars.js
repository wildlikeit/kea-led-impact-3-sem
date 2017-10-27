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
	ledImpactFigure = helpers.appendNewElement(sceneElement, 'a-text', {
		'id': 'ledImpactFigure',
		'color': '#000000',
		'position': '11.700 0 -24.485',
		'align': 'center',
		'baseline': 'bottom',
		'scale': '55 55',
		'rotation': '0 -34 0',
		'value': '0',
	});
}

function animIn(savings) {
	sceneElement.removeChild(ledImpactFigure);

	let carsToCreate = (((savings.yearlySavings * 1.222) / 40) * 10).toFixed(0);

	const cars = helpers.appendNewElement(sceneElement, 'a-entity', {
		'id': 'cars',
	});

	const path = helpers.appendNewElement(cars, 'a-curve', {
		'id': 'path',
	});

	const car = helpers.appendNewElement(cars, 'a-gltf-model', {
		'src': '#car',
		'scale': '0.02 0.02 0.02',
		'alongpath': 'curve: #path; dur: 5000; loop: false; rotate: false;',
	});

	// CREATE CURVE POSITION POINTS IN JSON OBJECT AND LOOP CREATE IT

	// TESTING CIRCLE CREATION

	let items = 20;
	let x0 = 0;
	let z0 = 0;
	let r = 30;
	let positions = [];
	let rotations = []
	let prevPos;

	for (let i = 0; i < items; i++) {
		let x = x0 + r * Math.cos(2 * Math.PI * i / items);
		let z = z0 + r * Math.sin(2 * Math.PI * i / items);
		let position = x + ' 0 ' + z;

		let pRot = '0 ' + ((-360 / items) * i) + ' 0';
		let cRot = '0 ' + ((-360 / items) * (i + 1)) + ' 0';
		// positions.push(position);
		// rotations.push(rotation);
		helpers.appendNewElement(path, 'a-curve-point', {
			'position': position,
		});
	}



	// let i = 0;
	// let pPos;
	// let cPos;
	// let pRot;
	// let cRot;
	// let animActive = false;
	//
	// function addAnimation() {
	// 	setTimeout(function() {
	// 		if (i < positions.length) {
	// 			pPos = positions[i - 1];
	// 			cPos = positions[i];
	// 			pRot = rotations[i - 1];
	// 			cRot = rotations[i];
	// 			helpers.appendNewElement(car, 'a-animation', {
	// 				'id': 'carAnim-' + i,
	// 				'attribute': 'position',
	// 				'from': pPos,
	// 				'to': cPos,
	// 				'dur': '2000',
	// 				'ease': 'linear'
	// 			});
	//
	// helpers.appendNewElement(car, 'a-animation', {
	// 	'id': 'carAnimRotate-' + i,
	// 	'attribute': 'rotation',
	// 	'from': pRot,
	// 	'to': cRot,
	// 	'dur': '2000',
	// 	'ease': 'linear'
	// });
	//
	// 			let prevAnim = document.querySelector('#carAnim-' + (i - 1));
	// 			if (prevAnim) {
	// 				console.log('removed');
	// 				car.removeChild(prevAnim);
	// 			}
	//
	// 			let prevAnimRotate = document.querySelector('#carAnimRotate-' + (i - 1));
	// 			if (prevAnimRotate) {
	// 				console.log('removed rotate');
	// 				car.removeChild(prevAnimRotate);
	// 			}
	// 			i++;
	// 			if (i == positions.length) {
	// 				i = 0;
	// 			}
	// 			addAnimation();
	// 		}
	//
	// 	}, 2000);
	// }
	//
	// addAnimation();


	setTimeout(function() {
		sceneElement.removeChild(cars);
		sceneElement.emit('carsEnd', true);
	}, 10000);
}
