'use strict';

/*global document*/
const helpers = require('../../helpers');

module.exports = {
	init,
	animIn,
};

const sceneElement = document.querySelector('a-scene');
const sky = document.querySelector('a-sky');
const carCurvePaths = [{
		'z': '10',
	},
	{
		'z': '10',
	},
	{
		'z': '10',
	},
	{
		'z': '10',
	},
];
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

	const cars = helpers.appendNewElement(sceneElement, 'a-entity', {
		'id': 'cars',
	});
	const path = helpers.appendNewElement(cars, 'a-curve', {
		'id': 'path',
	});

	let carsToCreate = (((savings.yearlySavings * 1.222) / 40) * 10).toFixed(0);

	// CREATE CURVE POSITION POINTS IN JSON OBJECT AND LOOP CREATE IT
	carCurvePaths.forEach(function(cPath, index) {
		const theta = index * (2 * Math.PI);
		const x = cPath.z * Math.sin(theta);
		const y = 0;
		const z = cPath.z * Math.cos(theta);
		const curve = helpers.appendNewElement(path, 'a-curve-point', {
			'id': index,
			'position': x + ' ' + y + ' ' + z,
		});
	});

	const car = helpers.appendNewElement(cars, 'a-gltf-model', {
		'src': '#car',
		'scale': '0.02 0.02 0.02',
		'alongpath': 'curve: #path; dur: 10000; loop: true; rotate: true;',
	});


	setTimeout(function() {
		console.log('carsEnd');
		sceneElement.removeChild(cars);
		sceneElement.emit('carsEnd', true);
	}, 5000);
}
