'use strict';

/*global document*/

const helpers = require('../helpers');
const ajlamps = require('../data/ajlamps');

module.exports = {
	create,
	remove,
	setupLampData,
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

// Call to action buttons
const lampCtaContainer = helpers
	.appendNewElement(lampElement, 'a-entity', {
		'id': 'lampCtaContainer',
		'position': '0.043 6 -14.6',
		'rotation': '0 0 0',
	});

//NEXT
const lampNextCtaWrapper = helpers
	.appendNewElement(lampCtaContainer, 'a-entity', {
		'id': 'ledImpactNextCtaWrapper',
		'position': '7 0 0',
	});

helpers
	.appendNewElement(lampNextCtaWrapper, 'a-text', {
		'id': 'lampNextCta',
		'position': '0 0 0',
		'value': '>',
		'color': '#FFFFFF',
		'scale': '8 8',
		'align': 'center',
	});

const lampNextEvent = helpers
	.appendNewElement(lampNextCtaWrapper, 'a-circle', {
		'id': 'lampNextEvent',
		'position': '0.048 0 -0.045',
		'radius': '1.7',
		'color': '#ff6961',
		'opacity': '0.9',
	});

// Back
const lampPrevCtaWrapper = helpers
	.appendNewElement(lampCtaContainer, 'a-entity', {
		'id': 'lampPrevCtaWrapper',
		'position': '-7 0 0',
	});

helpers
	.appendNewElement(lampPrevCtaWrapper, 'a-text', {
		'id': 'lampPrevCta',
		'position': '0 0 0',
		'value': '<',
		'color': '#FFFFFF',
		'scale': '8 8',
		'align': 'center',
	});

const lampPrevEvent = helpers
	.appendNewElement(lampPrevCtaWrapper, 'a-circle', {
		'id': 'lampPrevEvent',
		'position': '0.081 0 -0.075',
		'radius': '1.7',
		'color': '#ff6961',
		'opacity': '0.9',
	});


function setupLampData(id){

	let lampText = document.querySelectorAll('.lamp-text');
	let lampName = document.querySelector('#lamp-name');
	let lampModel = document.querySelector('#lamp-model');

	if (lampText) {
		lampText.forEach(function(element){
			element.parentNode.removeChild(element);
		});
	}

	if (lampName) {
		lampElement.removeChild(lampName);
	}

	if (lampModel) {
		lampElement.removeChild(lampModel);
	}

	let posY = 8;
	ajlamps[id].measurements.forEach(function(measurement, index) {
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

	helpers.appendNewElement(lampElement, 'a-text', {
		'id': 'lamp-name',
		'color': '#0054a6',
		'align': 'center',
		'baseline': 'bottom',
		'line-height': '60',
		'scale': '7 7',
		'position': '0 13 -15',
		'value': ajlamps[id].name,
	});

	const lamp = helpers.appendNewElement(lampElement, 'a-gltf-model',{
		'id': 'lamp-model',
		'src': ajlamps[id].src,
		'scale': ajlamps[id].scale,
		'position': '0 5 -15',
	});
}

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
		'scale': '4.5 4.5',
		'rotation': '0 -15 0',
	}];

	assets.forEach(asset => helpers.appendNewElement(assetsContainerElement, 'a-mixin', asset));
	assetsSetup = true;
}

function create(id) {
	// Only setup assets on first run
	if (!assetsSetup) {
		_setupAssets();
	}

	setupLampData(id);

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
