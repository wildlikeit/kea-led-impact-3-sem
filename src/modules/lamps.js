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

const lampElement = helpers.createElement('a-entity', {
	'id': 'lamp'
});

// LAMP INFO //
const lampInfoPlane = helpers.appendNewElement(lampElement, 'a-plane', {
	'id': 'lampInfoPlane',
	'position': '-17.812 5.7 -9.047',
	'rotation': '0 45 0',
	'color': '#0054a6',
	'width': '19',
	'height': '9',
});

// Call to action buttons
const lampCtaContainer = helpers
	.appendNewElement(lampElement, 'a-entity', {
		'id': 'lampCtaContainer',
		'position': '0.043 5 -14.6',
		'rotation': '0 0 0',
	});

//NEXT
const lampNextCtaWrapper = helpers
	.appendNewElement(lampCtaContainer, 'a-entity', {
		'id': 'ledImpactNextCtaWrapper',
		'position': '5.5 0 0',
	});

helpers
	.appendNewElement(lampNextCtaWrapper, 'a-text', {
		'id': 'lampNextCta',
		'position': '0.1 -0.8 0',
		'font': 'https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/opensans/OpenSans-Bold.json',
		'shader': 'msdf',
		'value': '>',
		'color': '#FFFFFF',
		'scale': '6 6',
		'align': 'center',
	});

const lampNextEvent = helpers
	.appendNewElement(lampNextCtaWrapper, 'a-circle', {
		'id': 'lampNextEvent',
		'position': '0.048 0.2 -0.045',
		'radius': '1',
		'color': '#ff6961',
		'opacity': '0.9',
	});

// Back
const lampPrevCtaWrapper = helpers
	.appendNewElement(lampCtaContainer, 'a-entity', {
		'id': 'lampPrevCtaWrapper',
		'position': '-5.5 0 0',
	});

helpers
	.appendNewElement(lampPrevCtaWrapper, 'a-text', {
		'id': 'lampPrevCta',
		'position': '0 -0.8 0',
		'font': 'https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/opensans/OpenSans-Bold.json',
		'shader': 'msdf',
		'value': '<',
		'color': '#FFFFFF',
		'scale': '6 6',
		'align': 'center',
	});

const lampPrevEvent = helpers
	.appendNewElement(lampPrevCtaWrapper, 'a-circle', {
		'id': 'lampPrevEvent',
		'position': '0.081 0.2 -0.075',
		'radius': '1',
		'color': '#ff6961',
		'opacity': '0.9',
	});


function setupLampData(id) {

	let lampText = document.querySelectorAll('.lamp-text');
	let lampName = document.querySelector('#lamp-name');
	let lampModel = document.querySelector('#lamp-model');

	if (lampText) {
		lampText.forEach(function(element) {
			element.parentNode.removeChild(element);
		});
	}

	if (lampName) {
		lampElement.removeChild(lampName);
	}

	if (lampModel) {
		lampElement.removeChild(lampModel);
	}

	let posY = 2.2;
	ajlamps[id].measurements.forEach(function(measurement, index) {
		let measurementText = helpers.appendNewElement(lampInfoPlane, 'a-text', {
			'id': 'measurement-' + [index + 1],
			'class': 'measurements lamp-text',
			'font': 'https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/opensans/OpenSans-Light.json',
			'shader': 'msdf',
			'mixin': 'lampInfoTextMixin',
			'opacity': '0',
			'position': '-6.827 ' + posY + ' 0.1',
			'value': measurement.measurement,
		});

		helpers.appendNewElement(measurementText, 'a-animation', {
			'id': 'measurement-' + [index + 1] + '-animation',
			'attribute': 'opacity',
			'from': '0',
			'to': '1',
			'dur': '500',
			'ease': 'ease-out',
		});

		let measurementValue = helpers.appendNewElement(lampInfoPlane, 'a-text', {
			'id': 'value-' + [index + 1],
			'class': 'values lamp-text',
			'font': 'https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/opensans/OpenSans-Bold.json',
			'shader': 'msdf',
			'mixin': 'lampInfoTextMixin',
			'opacity': '0',
			'position': '5.873 ' + posY + ' 0.1',
			'value': measurement.value,
		});

		helpers.appendNewElement(measurementValue, 'a-animation', {
			'id': 'value-' + [index + 1] + '-animation',
			'attribute': 'opacity',
			'from': '0',
			'to': '1',
			'dur': '500',
			'ease': 'ease-out',
		});

		posY = (posY - 1);
	});

	let lampNameText = helpers.appendNewElement(lampElement, 'a-text', {
		'id': 'lamp-name',
		'color': '#0054a6',
		'font': 'https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/breeserif/BreeSerif-Regular.json',
		'shader': 'msdf',
		'align': 'center',
		'baseline': 'bottom',
		'line-height': '60',
		'scale': '7 7',
		'position': '0 13 -15',
		'value': ajlamps[id].name,
	});

	helpers.appendNewElement(lampNameText, 'a-animation', {
		'id': 'lamp-name-animation',
		'attribute': 'opacity',
		'from': '0',
		'to': '1',
		'dur': '500',
		'ease': 'ease-out',
	});

	let lamp = helpers.appendNewElement(lampElement, 'a-gltf-model', {
		'id': 'lamp-model',
		'src': ajlamps[id].src,
		'position': '0 5 -15',
	});

	helpers.appendNewElement(lamp, 'a-animation', {
		'id': 'lamp-animation',
		'attribute': 'scale',
		'from': '0 0 0',
		'to': ajlamps[id].scale,
		'dur': '500',
		'ease': 'ease-out',
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
