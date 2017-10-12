'use strict';

/*global document*/

const helpers = require('../../helpers');
const skyAnim = require('./skyAnim');

module.exports = {
	init,
};

function init(selectors){

	// DATA
	let daylightHoursData = [
		'How many ',
		'daylight hours',
		'will your lamps',
		'operate?',
	];

	let inputHoursData = [
		{
			'type': 'input',
			'value': '10'
		},
		{
			'type': 'input',
			'value': '100'
		},
		{
			'type': 'input',
			'value': '1000'
		},
		{
			'type': 'text',
			'value': '0'
		},
	];

	const ledImpactTextMixin = helpers.appendNewElement(selectors.assets ,'a-mixin', {
		'id': 'ledImpactTextMixin',
		'color': '#ffffff',
		'align': 'right',
		'baseline': 'bottom',
		'line-height': '80',
		'scale': '10 10',
		'rotation': '0 -43 0',
	});

	const ledImpactTextContainer = helpers.appendNewElement(selectors.scene, 'a-entity', {
		'id': 'ledImpactTextContainer',
		'position': '12.757 12.472 -14.793',
	});

	const ledImpactOverlay = helpers.appendNewElement(ledImpactTextContainer, 'a-plane', {
		'id': 'ledImpactOverlay',
		'position': '10.484 -5.947 8.680',
		'rotation': '0 -43 0',
		'color': '#000000',
		'width': '22',
		'height': '40',
		'opacity': '0.7',
	});

	const ledImpactOverlayAnim = helpers.appendNewElement(ledImpactOverlay, 'a-animation', {
		'attribute': 'opacity',
		'from': '0',
		'to': '0.2',
		'dur': '500',
		'ease': 'ease-out',
	});

	// Call to action buttons
	const ledImpactCtaContainer = helpers.appendNewElement(ledImpactTextContainer, 'a-entity', {
		'id': 'ledImpactCtaContainer',
		'position': '2.274 -16.275 1.236',
		'rotation': '0 -43 0'
	});

	//NEXT
	const ledImpactNextCtaWrapper = helpers.appendNewElement(ledImpactCtaContainer, 'a-entity', {
		'id': 'ledImpactNextCtaWrapper',
		'position': '7 0 0',
	});

	const ledImpactNextCta = helpers.appendNewElement(ledImpactNextCtaWrapper, 'a-text', {
		'id': 'ledImpactNextCta',
		'position': '0 0 0',
		'value': 'Next',
		'scale': '5.5 5.5',
		'align': 'center',
	});

	const ledImpactNextEvent = helpers.appendNewElement(ledImpactNextCtaWrapper, 'a-plane', {
		'id': 'ledImpactNextEvent',
		'position': '0 0 0',
		'width': '5',
		'height': '1',
		'opacity': '0',
	});

	ledImpactNextEvent.addEventListener('click', function(){
		skyAnim.lightenSky(selectors);
	});

	// PREVIOUS
	const ledImpactPrevCtaWrapper = helpers.appendNewElement(ledImpactCtaContainer, 'a-entity', {
		'id': 'ledImpactPrevCtaWrapper',
		'position': '-7 0 0',
	});

	const ledImpactPrevCta = helpers.appendNewElement(ledImpactPrevCtaWrapper, 'a-text', {
		'id': 'ledImpactPrevCta',
		'position': '0 0 0',
		'value': 'Previous',
		'scale': '5.5 5.5',
		'align': 'center',
	});

	const ledImpactPrevEvent = helpers.appendNewElement(ledImpactPrevCtaWrapper, 'a-plane', {
		'id': 'ledImpactPrevEvent',
		'position': '0 0 0',
		'width': '5',
		'height': '1',
		'opacity': '0',
	});

	ledImpactPrevEvent.addEventListener('click', function(){
		console.log('previous');
	});

	// Adding text
	daylightHoursData.forEach(function(element, index){
		let ledImpactText = helpers.appendNewElement(ledImpactTextContainer, 'a-text', {
			'id': 'ledImpactText' + index,
			'mixin': 'ledImpactTextMixin',
			'align': 'right',
			'position': '0 '+ (-index * 3) +' 0',
			'value': element,
		});
	});

	// INPUTS

	// Input container
	const ledImpactInputsContainer = helpers.appendNewElement(selectors.scene, 'a-entity', {
		'id': 'ledImpactInputsContainer',
		'position': '18.218 12.311 -10.623',
	});

	// Adding inputs via the data
	inputHoursData.forEach(function(element, index){

		// Total Input Wrapper
		let ledImpactInputWrapper = helpers.appendNewElement(ledImpactInputsContainer, 'a-entity', {
			'id': 'ledImpactInputWrapper' + index,
			'position': '0 '+ (-index * 3) +' 0',
		});

		if (element.type == 'input') {
			// Plus Input
			let ledImpactInputPlusCircle = helpers.appendNewElement(ledImpactInputWrapper, 'a-circle', {
				'id': 'ledImpactPlusCircle' + index,
				'position': '-1.903 0 -1.802',
				'rotation': '0 -43 0',
				'radius': '0.6',
				'opacity': '0.5',
			});

			let ledImpactInputPlus = helpers.appendNewElement(ledImpactInputPlusCircle, 'a-text', {
				'id': 'ledImpactInputPlus' + index,
				'position': '0 0 0',
				'scale': '4.5 4.5',
				'align': 'center',
				'value': '+',
			});

			let ledImpactInputPlusEvent = helpers.appendNewElement(ledImpactInputPlusCircle, 'a-circle', {
				'id': 'ledImpactPlusEvent' + index,
				'position': '0 0 0',
				'radius': '0.6',
				'opacity': '0',
			});

			ledImpactInputPlusEvent.addEventListener('click', function(e){
				let incrementVal;
				let curVal = parseInt(document.querySelector('#ledImpactInput3').getAttribute('value'));

				if (index == 0) {
					incrementVal = 10;
				} else if (index == 1) {
					incrementVal = 100;
				} else if (index == 2) {
					incrementVal = 1000;
				}

				if (curVal >= 0) {
					document.querySelector('#ledImpactInput3').setAttribute('value', curVal += incrementVal);
				}
			});

			// Minus Input
			let ledImpactInputMinusCircle = helpers.appendNewElement(ledImpactInputWrapper, 'a-circle', {
				'id': 'ledImpactMinusCircle' + index,
				'position': '-0.790 0 -0.801',
				'rotation': '0 -43 0',
				'radius': '0.6',
				'opacity': '0.5',
			});

			let ledImpactInputMinus = helpers.appendNewElement(ledImpactInputMinusCircle, 'a-text', {
				'id': 'ledImpactInputMinus' + index,
				'position': '0 0 0',
				'scale': '4.5 4.5',
				'align': 'center',
				'value': '-',
			});

			let ledImpactInputMinusEvent = helpers.appendNewElement(ledImpactInputMinusCircle, 'a-circle', {
				'id': 'ledImpactMinusEvent' + index,
				'position': '0 0 0',
				'radius': '0.6',
				'opacity': '0',
			});

			ledImpactInputMinusEvent.addEventListener('click', function(e){
				let decrementVal;
				let curVal = parseInt(document.querySelector('#ledImpactInput3').getAttribute('value'));

				if (index == 0) {
					decrementVal = 10;
				} else if (index == 1) {
					decrementVal = 100;
				} else if (index == 2) {
					decrementVal = 1000;
				}

				if ((curVal - decrementVal) >= 0) {
					document.querySelector('#ledImpactInput3').setAttribute('value', curVal -= decrementVal);
				}

			});
		}

		// Input Text
		let letImpactInput = helpers.appendNewElement(ledImpactInputWrapper, 'a-text', {
			'id': 'ledImpactInput' + index,
			'mixin': 'ledImpactTextMixin',
			'position': '0 0 0',
			'value': element.value,
		});
	});
}
