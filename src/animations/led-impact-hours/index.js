'use strict';

/*global document*/

const helpers = require('../../helpers');
const animations = require('../../animations');
const inputs = require('./inputs');
const daylightHoursText = require('./daylight-hours-text');
const lampsModule = require('../../modules/lamps');
const sky = require('../sky');
const ledImpact = require('../led-impact');

module.exports = {
	create,
	remove
};

let assetsSetup = false;

function _setupAssets() {
	const assetsContainerElement = document.querySelector('a-assets');

	const assets = [{
		'id': 'ledImpactTextMixin',
		'color': '#ffffff',
		'align': 'right',
		'baseline': 'bottom',
		'line-height': '80',
		'scale': '10 10',
		'rotation': '0 -43 0',
	}];

	assets.forEach(asset => helpers.appendNewElement(assetsContainerElement, 'a-mixin', asset));
	assetsSetup = true;
}

// DATA
const daylightHoursData = [
	'How many ',
	'daylight hours',
	'will your lamps',
	'operate?',
];

const inputHoursData = [
	{ 'type': 'input', 'value': 10 },
	{ 'type': 'input', 'value': 100 },
	{ 'type': 'input', 'value': 1000 },
	{ 'type': 'text', 'value': 0 },
];

const ledImpactTextContainer = helpers
	.createElement('a-entity', {
		'id': 'ledImpactTextContainer',
		'position': '12.757 12.472 -14.793',
	});

const ledImpactOverlay = helpers
	.appendNewElement(ledImpactTextContainer, 'a-plane', {
		'id': 'ledImpactOverlay',
		'position': '10.484 -5.947 8.680',
		'rotation': '0 -43 0',
		'color': '#000000',
		'width': '22',
		'height': '40',
		'opacity': '0.7',
	});

helpers
	.appendNewElement(ledImpactOverlay, 'a-animation', {
		'attribute': 'opacity',
		'from': '0',
		'to': '0.2',
		'dur': '500',
		'ease': 'ease-out',
	});

// Call to action buttons
const ledImpactCtaContainer = helpers
	.appendNewElement(ledImpactTextContainer, 'a-entity', {
		'id': 'ledImpactCtaContainer',
		'position': '2.274 -16.275 1.236',
		'rotation': '0 -43 0'
	});

//NEXT
const ledImpactNextCtaWrapper = helpers
	.appendNewElement(ledImpactCtaContainer, 'a-entity', {
		'id': 'ledImpactNextCtaWrapper',
		'position': '7 0 0',
	});

helpers
	.appendNewElement(ledImpactNextCtaWrapper, 'a-text', {
		'id': 'ledImpactNextCta',
		'position': '0 0 0',
		'value': 'NEXT',
		'color': '#ff6961',
		'scale': '10 10',
		'align': 'center',
	});

const ledImpactNextEvent = helpers
	.appendNewElement(ledImpactNextCtaWrapper, 'a-plane', {
		'id': 'ledImpactNextEvent',
		'position': '0 0 0',
		'width': '5',
		'height': '1',
		'opacity': '0',
	});

// Back
const ledImpactPrevCtaWrapper = helpers
	.appendNewElement(ledImpactCtaContainer, 'a-entity', {
		'id': 'ledImpactPrevCtaWrapper',
		'position': '-7 0 0',
	});

helpers
	.appendNewElement(ledImpactPrevCtaWrapper, 'a-text', {
		'id': 'ledImpactPrevCta',
		'position': '0 0 0',
		'value': 'BACK',
		'color': '#ff6961',
		'scale': '10 10',
		'align': 'center',
	});

const ledImpactPrevEvent = helpers
	.appendNewElement(ledImpactPrevCtaWrapper, 'a-plane', {
		'id': 'ledImpactPrevEvent',
		'position': '0 0 0',
		'width': '5',
		'height': '1',
		'opacity': '0',
	});


daylightHoursText.create(daylightHoursData, ledImpactTextContainer);

// Input container
const ledImpactInputsContainer = helpers.createElement('a-entity', {
	'id': 'ledImpactInputsContainer',
	'position': '19.049 12.311 -9.762',
});

// INPUTS
inputs.create(inputHoursData, ledImpactInputsContainer);

function create() {
	// Only setup assets on first run
	if (!assetsSetup) {
		_setupAssets();
	}

	const sceneContainerElement = document.querySelector('a-scene');
	sceneContainerElement.appendChild(ledImpactTextContainer);
	sceneContainerElement.appendChild(ledImpactInputsContainer);
	sceneContainerElement.emit('ledImpactInit');
}

function remove() {
	const sceneContainerElement = document.querySelector('a-scene');
	const ledImpactTextContainer = document.querySelector('#ledImpactTextContainer');
	const ledImpactInputsContainer = document.querySelector('#ledImpactInputsContainer');

	if (ledImpactTextContainer) {
		sceneContainerElement.removeChild(ledImpactTextContainer);
	}
	if (ledImpactInputsContainer) {
		sceneContainerElement.removeChild(ledImpactInputsContainer);
	}

}
