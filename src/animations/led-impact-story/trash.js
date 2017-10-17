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

	const trash = helpers.appendNewElement(sceneElement, 'a-entity',{
		'id': 'trash',
	});

	const item = helpers.appendNewElement(trash, 'a-gltf-model',{
		'src': '#car',
		'scale': '1 1 1',
	});


	setTimeout(function(){
		// sceneElement.removeChild(trash);
		// sceneElement.emit('trashEnd', true);
	}, 1000);
}
