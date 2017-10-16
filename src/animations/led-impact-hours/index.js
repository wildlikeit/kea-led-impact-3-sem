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
	remove,
	steps,
};

let assetsSetup = false;
let emitSetup = false;

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
		{
			'text': [
				'How many',
				'hours will',
				'each lamp',
				'operate per year?',
			],
		},
		{
			'text': [
				'How many',
				'of those hours',
				'are nighttime?',
			],
		},
		{
			'text': [
				'How many ',
				'lamps will',
				'you operate?',
			],
		}
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

// Input container
const ledImpactInputsContainer = helpers.createElement('a-entity', {
	'id': 'ledImpactInputsContainer',
	'position': '19.049 12.311 -9.762',
});

function create(step) {
	// Only setup assets on first run
	if (!assetsSetup) {
		_setupAssets();
	}
	// call step 1
	steps(step);
}

// STEPS
function steps(step){
	if (step == 1){
		const sceneContainerElement = document.querySelector('a-scene');
		sceneContainerElement.appendChild(ledImpactTextContainer);
		sceneContainerElement.appendChild(ledImpactInputsContainer);
		inputs.create(inputHoursData, ledImpactInputsContainer);
		if (!emitSetup) {
			sceneContainerElement.emit('ledImpactInit');
			emitSetup = true;
		}
	} else if (step > 1) {

		const ledImpactTextContainer = document.querySelector('#ledImpactTextContainer');
		let impactTexts = document.querySelectorAll('.ledImpactText');

		impactTexts.forEach(function(element){
			element.parentNode.removeChild(element);
		});

		document.querySelector('#ledImpactInput3').setAttribute('value', '0');
	}

	daylightHoursText.create(daylightHoursData, ledImpactTextContainer, step);
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