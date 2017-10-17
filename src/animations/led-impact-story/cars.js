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

function init(){
	sky.setAttribute('color', '#000000');
	ledImpactFigure = helpers.appendNewElement(sceneElement, 'a-text',{
		'id': 'ledImpactFigure',
		'color': '#ffffff',
		'position': '11.700 0 -24.485',
		'align': 'center',
		'baseline': 'bottom',
		'scale': '55 55',
		'rotation': '0 -34 0',
		'value': '0',
	});
}

function animIn() {
	sceneElement.removeChild(ledImpactFigure);
	sky.setAttribute('color', '#ffffff');

	const cars = helpers.appendNewElement(sceneElement, 'a-entity',{
		'id': 'cars',
	});
	const path = helpers.appendNewElement(cars, 'a-curve',{
		'id': 'path',
	});

	// CREATE CURVE POSITION POINTS IN JSON OBJECT AND LOOP CREATE IT
	const curve1 = helpers.appendNewElement(path, 'a-curve-point', {
		'id': '1',
		'position': '0 0 -100',
	});
	const curve2 = helpers.appendNewElement(path, 'a-curve-point', {
		'id': '2',
		'position': '0 0 0',
	});

	const car = helpers.appendNewElement(cars, 'a-gltf-model',{
		'src': '#car',
		'scale': '0.02 0.02 0.02',
		'alongpath': 'curve: #path; dur: 10000; loop: false; rotate: false;',
	});

	setTimeout(function(){
		sceneElement.removeChild(cars);
		sceneElement.emit('carsEnd', true);
	}, 1000);
}
