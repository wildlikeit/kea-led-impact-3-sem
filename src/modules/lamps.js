'use strict';

/*global document*/

const helpers = require('../helpers');
const ajlamps = require('../data/ajlamps');

module.exports = {
	create,
	remove
};

let assetsSetup = false;
const lampElement = helpers.createElement('a-entity', { 'id': 'lamp' });

// LAMP INFO //
helpers.appendNewElement(lampElement, 'a-plane', {
	'id': 'lampInfo-plane',
	'position': '-22 5.7 -12',
	'rotation': '0 15 0',
	'color': '#0054a6',
	'width': '19',
	'height': '9',
});

helpers.appendNewElement(lampElement, 'a-text', {
	'id': 'lamp-name',
	'color': '#0054a6',
	'align': 'left',
	'baseline': 'bottom',
	'line-height': '60',
	'scale': '7 7',
	'position': '-10 13 -15',
	'value': ajlamps[0].name,
});

let posY = 8;
ajlamps[0].measurements.forEach(function(measurement, index) {
	helpers.appendNewElement(lampElement, 'a-text', {
		'id': 'measurement-' + [index + 1],
		'class': 'measurements lamp-text',
		'mixin': 'lampInfoTextMixin',
		'position': '-28 ' + posY + ' -9',
		'value': measurement.measurement,
	});

	helpers.appendNewElement(lampElement, 'a-text', {
		'id': 'value-' + [index + 1],
		'class': 'values lamp-text',
		'mixin': 'lampInfoTextMixin',
		'position': '-15 ' + posY + ' -12.8',
		'value': measurement.value,
	});

	posY = (posY - 1);
});

function _setupAssets() {
	const assetsContainerElement = document.querySelector('a-assets');

	const assets = [{
		'id': 'lampInfoTextMixin',
		'color': '#ffffff',
		'align': 'left',
		'baseline': 'bottom',
		'line-height': '60',
		'scale': '3 3 0',
		'rotation': '0 15 0',
	}, {
		'id': 'ledTextMixin',
		'color': '#ffffff',
		'align': 'center',
		'baseline': 'bottom',
		'line-height': '80',
		'scale': '6 6',
		'rotation': '0 -15 0',
	}];

	assets.forEach(asset => helpers.appendNewElement(assetsContainerElement, 'a-mixin', asset));
	assetsSetup = true;
}

function create() {
	// Only setup assets on first run
	if (!assetsSetup) {
		_setupAssets();
	}

	const sceneContainerElement = document.querySelector('a-scene');
	sceneContainerElement.appendChild(lampElement);

	return lampElement;
}

function remove() {
	const lampElement = document.querySelector('#lamp');
	const sceneContainerElement = document.querySelector('a-scene');

	if (lampElement) {
		sceneContainerElement.removeChild(lampElement);
	}
}
