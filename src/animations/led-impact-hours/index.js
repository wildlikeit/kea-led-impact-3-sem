'use strict';

/*global document*/

const helpers = require('../../helpers');
const animations = require('../../animations');
const inputs = require('./inputs');
const daylightHoursText = require('./daylight-hours-text');
const lampsModule = require('../../modules/lamps');
const sky = require('../sky');
const ledImpact = require('../led-impact');

// DATA
const daylightHoursData = require('../../data/daylightHoursData');
const inputHoursData = require('../../data/inputHoursData');

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


const ledImpactTextContainer = helpers
	.createElement('a-entity', {
		'id': 'ledImpactTextContainer',
		'position': '12.757 12.472 -12.311',
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
		'rotation': '0 -43 0',
	});

//NEXT
const ledImpactNextCtaWrapper = helpers
	.appendNewElement(ledImpactCtaContainer, 'a-entity', {
		'id': 'ledImpactNextCtaWrapper',
		'position': '5 0 0',
	});

helpers
	.appendNewElement(ledImpactNextCtaWrapper, 'a-text', {
		'id': 'ledImpactNextCta',
		'position': '0 0 0',
		'value': '>',
		'color': '#FFFFFF',
		'scale': '10 10',
		'align': 'center',
	});

const ledImpactNextEvent = helpers
	.appendNewElement(ledImpactNextCtaWrapper, 'a-circle', {
		'id': 'ledImpactNextEvent',
		'position': '0.048 0 -0.045',
		'radius': '2',
		'color': '#ff6961',
		'opacity': '0.9',
	});

// Back
const ledImpactPrevCtaWrapper = helpers
	.appendNewElement(ledImpactCtaContainer, 'a-entity', {
		'id': 'ledImpactPrevCtaWrapper',
		'position': '-5 0 0',
	});

helpers
	.appendNewElement(ledImpactPrevCtaWrapper, 'a-text', {
		'id': 'ledImpactPrevCta',
		'position': '0 0 0',
		'value': '<',
		'color': '#FFFFFF',
		'scale': '10 10',
		'align': 'center',
	});

const ledImpactPrevEvent = helpers
	.appendNewElement(ledImpactPrevCtaWrapper, 'a-circle', {
		'id': 'ledImpactPrevEvent',
		'position': '0.081 0 -0.075',
		'radius': '2',
		'color': '#ff6961',
		'opacity': '0.9',
	});

// Step text
const ledImpactStepText = helpers
	.appendNewElement(ledImpactTextContainer, 'a-text', {
		'id': 'ledImpactStepText',
		'position': '2.307 3.192  1.306',
		'rotation': '0 -43 0',
		'font': 'https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/opensans/OpenSans-Bold.json',
		'shader': 'msdf',
		'align': 'center',
		'value': 'STEP 1',
		'color': '#FFFFFF',
		'scale': '15 15',
	});

// Input container
const ledImpactInputsContainer = helpers.createElement('a-entity', {
	'id': 'ledImpactInputsContainer',
	'position': '19.177 12.311 -7.052',
});

function create(step, ledActive) {
	// Only setup assets on first run
	if (!assetsSetup) {
		_setupAssets();
	}
	// call step 1
	steps(step, ledActive);
}

// STEPS
function steps(step, ledActive) {
	if (step == 1 && !ledActive) {
		const sceneContainerElement = document.querySelector('a-scene');
		sceneContainerElement.appendChild(ledImpactTextContainer);
		sceneContainerElement.appendChild(ledImpactInputsContainer);
		inputs.create(inputHoursData, ledImpactInputsContainer);
		if (!emitSetup) {
			sceneContainerElement.emit('ledImpactInit');
			emitSetup = true;
		}
	} else if (step > 1) {
		document.querySelector('#ledImpactInput3').setAttribute('value', '0');
	}

	const ledImpactTextContainerElement = document.querySelector('#ledImpactTextContainer');
	let impactTexts = document.querySelectorAll('.ledImpactText');

	if (impactTexts) {
		impactTexts.forEach(function(element, index) {
			let childAnimation = document.querySelector('#ledImpactTextAnim' + index);
			element.removeChild(childAnimation);
			element.parentNode.removeChild(element);
		});
	}

	const ledImpactStepText = document.querySelector('#ledImpactStepText');
	ledImpactStepText.setAttribute('value', 'STEP ' + step);

	daylightHoursText.create(daylightHoursData, ledImpactTextContainerElement, step);
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
