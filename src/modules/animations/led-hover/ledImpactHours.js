'use strict';

/*global document*/

module.exports = {
	init,
};

function init(selectors, helpers){

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

	const ledImpactTextMixin = helpers.createElement('a-mixin', {
		'id': 'ledImpactTextMixin',
		'color': '#ffffff',
		'align': 'right',
		'baseline': 'bottom',
		'line-height': '80',
		'scale': '10 10',
		'rotation': '0 -43 0',
	});
	selectors.assets.appendChild(ledImpactTextMixin);

	const ledImpactTextContainer = helpers.createElement('a-entity', {
		'id': 'ledImpactTextContainer',
		'position': '12.757 12.472 -14.793',
	});
	selectors.scene.appendChild(ledImpactTextContainer);

	const ledImpactOverlay = helpers.createElement('a-plane', {
		'id': 'ledImpactOverlay',
		'position': '10.484 -5.947 8.680',
		'rotation': '0 -43 0',
		'color': '#000000',
		'width': '22',
		'height': '40',
		'opacity': '0.7',
	});

	const ledImpactOverlayAnim = helpers.createElement('a-animation', {
		'attribute': 'opacity',
		'from': '0',
		'to': '0.2',
		'dur': '500',
		'ease': 'ease-out',
	});

	ledImpactOverlay.appendChild(ledImpactOverlayAnim);
	ledImpactTextContainer.appendChild(ledImpactOverlay);

	// Call to action buttons
	const ledImpactCtaContainer = helpers.createElement('a-entity', {
		'id': 'ledImpactCtaContainer',
		'position': '2.274 -16.275 1.236',
		'rotation': '0 -43 0'
	});
	ledImpactTextContainer.appendChild(ledImpactCtaContainer);

	//NEXT
	const ledImpactNextCtaWrapper = helpers.createElement('a-entity', {
		'id': 'ledImpactNextCta',
		'position': '7 0 0',
	});
	ledImpactCtaContainer.appendChild(ledImpactNextCtaWrapper);

	const ledImpactNextCta = helpers.createElement('a-text', {
		'id': 'ledImpactNextCta',
		'position': '0 0 0',
		'value': 'Next',
		'scale': '5.5 5.5',
		'align': 'center',
	});
	ledImpactNextCtaWrapper.appendChild(ledImpactNextCta);

	const ledImpactNextEvent = helpers.createElement('a-plane', {
		'id': 'ledImpactNextEvent',
		'position': '0 0 0',
		'width': '5',
		'height': '1',
		'opacity': '0',
	});

	ledImpactNextEvent.addEventListener('click', function(){
		console.log('next');
	});
	ledImpactNextCtaWrapper.appendChild(ledImpactNextEvent);


	// PREVIOUS
	const ledImpactPrevCtaWrapper = helpers.createElement('a-entity', {
		'id': 'ledImpactPrevCta',
		'position': '-7 0 0',
	});
	ledImpactCtaContainer.appendChild(ledImpactPrevCtaWrapper);

	const ledImpactPrevCta = helpers.createElement('a-text', {
		'id': 'ledImpactPrevCta',

		'position': '0 0 0',
		'value': 'Previous',
		'scale': '5.5 5.5',
		'align': 'center',
	});
	ledImpactPrevCtaWrapper.appendChild(ledImpactPrevCta);

	const ledImpactPrevEvent = helpers.createElement('a-plane', {
		'id': 'ledImpactPrevEvent',
		'position': '0 0 0',
		'width': '5',
		'height': '1',
		'opacity': '0',
	});

	ledImpactPrevEvent.addEventListener('click', function(){
		document.querySelector('#ledImpactTextContainer').remove();
	});
	ledImpactPrevCtaWrapper.appendChild(ledImpactPrevEvent);

	// Adding text
	for (let i = 0; i < daylightHoursData.length; i++){
		let ledImpactText = helpers.createElement('a-text', {
			'id': 'ledImpactText' + i,
			'mixin': 'ledImpactTextMixin',
			'align': 'right',
			'position': '0 '+ -i*3 +' 0',
			'value': daylightHoursData[i],
		});
		ledImpactTextContainer.appendChild(ledImpactText);
	}

	// INPUTS

	// Input container
	const ledImpactInputsContainer = helpers.createElement('a-entity', {
		'id': 'ledImpactInputsContainer',
		'position': '18.218 12.311 -10.623',
	});
	selectors.scene.appendChild(ledImpactInputsContainer);



	// Adding inputs via the data
	for (let i = 0; i < inputHoursData.length; i++){

		// Total Input Wrapper
		let ledImpactInputWrapper = helpers.createElement('a-entity', {
			'id': 'ledImpactInputWrapper' + i,
			'position': '0 '+ -i*3 +' 0',
		});
		ledImpactInputsContainer.appendChild(ledImpactInputWrapper);

		if (inputHoursData[i].type == 'input') {
			// Plus Input
			let ledImpactInputPlusCircle = helpers.createElement('a-circle', {
				'id': 'ledImpactPlusCircle' + i,
				'position': '-1.903 0 -1.802',
				'rotation': '0 -43 0',
				'radius': '0.6',
				'opacity': '0.5',
			});
			ledImpactInputWrapper.appendChild(ledImpactInputPlusCircle);

			let ledImpactInputPlus = helpers.createElement('a-text', {
				'id': 'ledImpactInputPlus' + i,
				'position': '0 0 0',
				'scale': '4.5 4.5',
				'align': 'center',
				'value': '+',
			});
			ledImpactInputPlusCircle.appendChild(ledImpactInputPlus);

			let ledImpactInputPlusEvent = helpers.createElement('a-circle', {
				'id': 'ledImpactPlusEvent' + i,
				'position': '0 0 0',
				'radius': '0.6',
				'opacity': '0',
			});
			ledImpactInputPlusEvent.addEventListener('click', function(e){
				let incrementVal;
				let curVal = parseInt(document.querySelector('#ledImpactInput3').getAttribute('value'));

				if (i == 0) {
					incrementVal = 10;
				} else if (i == 1) {
					incrementVal = 100;
				} else if (i == 2) {
					incrementVal = 1000;
				}

				if (curVal >= 0) {
					document.querySelector('#ledImpactInput3').setAttribute('value', curVal += incrementVal);
				}
			});
			ledImpactInputPlusCircle.appendChild(ledImpactInputPlusEvent);

			// Minus Input
			let ledImpactInputMinusCircle = helpers.createElement('a-circle', {
				'id': 'ledImpactMinusCircle' + i,
				'position': '-0.790 0 -0.801',
				'rotation': '0 -43 0',
				'radius': '0.6',
				'opacity': '0.5',
			});
			ledImpactInputWrapper.appendChild(ledImpactInputMinusCircle);

			let ledImpactInputMinus = helpers.createElement('a-text', {
				'id': 'ledImpactInputMinus' + i,
				'position': '0 0 0',
				'scale': '4.5 4.5',
				'align': 'center',
				'value': '-',
			});
			ledImpactInputMinusCircle.appendChild(ledImpactInputMinus);

			let ledImpactInputMinusEvent = helpers.createElement('a-circle', {
				'id': 'ledImpactMinusEvent' + i,
				'position': '0 0 0',
				'radius': '0.6',
				'opacity': '0',
			});

			ledImpactInputMinusEvent.addEventListener('click', function(e){
				let decrementVal;
				let curVal = parseInt(document.querySelector('#ledImpactInput3').getAttribute('value'));

				if (i == 0) {
					decrementVal = 10;
				} else if (i == 1) {
					decrementVal = 100;
				} else if (i == 2) {
					decrementVal = 1000;
				}

				if ((curVal - decrementVal) >= 0) {
					document.querySelector('#ledImpactInput3').setAttribute('value', curVal -= decrementVal);
				}

			});
			ledImpactInputMinusCircle.appendChild(ledImpactInputMinusEvent);
		}

		// Input Text
		let letImpactInput = helpers.createElement('a-text', {
			'id': 'ledImpactInput' + i,
			'mixin': 'ledImpactTextMixin',
			'position': '0 0 0',
			'value': inputHoursData[i].value,
		});
		ledImpactInputWrapper.appendChild(letImpactInput);
	}
}
