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

	// CREATE CURVE POSITION POINTS IN JSON OBJECT AND LOOP CREATE IT
	let j = 100;

	for (let i = 0; i <= 100; i++) {
		const curve = helpers.appendNewElement(path, 'a-curve-point', {
			'position': i + ' 0 ' + j,
		});
		j--;
	}

	const car = helpers.appendNewElement(cars, 'a-gltf-model', {
		'src': '#car',
		'scale': '0.02 0.02 0.02',
		'alongpath': 'curve: #path; dur: 10000; loop: true; rotate: false;',
	});


	setTimeout(function() {
		sceneElement.removeChild(cars);
		sceneElement.emit('carsEnd', true);
	}, 10000);
}
