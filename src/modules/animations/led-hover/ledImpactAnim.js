'use strict';

/*global document*/

module.exports = {
	show,
	hide,
};

let ledPlaneAnimActive = false;
let ledEnterPlaneScaleAnim;
let ledEnterPlaneRotateAnim;
let ledEnterPlaneColorAnim;
let ledLeavePlaneScaleAnim;
let ledLeavePlaneRotateAnim;
let ledLeavePlaneColorAnim;
let ledImpactText;

let ledPlaneScaleAnim = document.createElement('a-animation');
ledPlaneScaleAnim.setAttribute('id', 'ledPlaneScaleAnim');
ledPlaneScaleAnim.setAttribute('attribute', 'radius');
ledPlaneScaleAnim.setAttribute('from', '5');
ledPlaneScaleAnim.setAttribute('to', '5.2');
ledPlaneScaleAnim.setAttribute('dur', '1000');
ledPlaneScaleAnim.setAttribute('repeat', 'indefinite');
ledPlaneScaleAnim.setAttribute('direction', 'alternate');
ledPlaneScaleAnim.setAttribute('ease', 'ease-in-out');
let ledPlaneScaleAnimActive = true;

function show(selectors, helpers) {
	document.querySelector('#led-text').setAttribute('opacity', '0');
	document.querySelector('#led-sub-text').setAttribute('opacity', '0');
	document.querySelector('#led-text').setAttribute('position', '0 0 -30');
	document.querySelector('#led-sub-text').setAttribute('position', '0 0 -30');

	if (ledPlaneScaleAnimActive) {
		document.querySelector('#led-plane').removeChild(document.querySelector('#ledPlaneScaleAnim'));
		ledPlaneScaleAnimActive = false;
	} else {
		document.querySelector('#led-plane').removeChild(ledPlaneScaleAnim);
	}

	ledEnterPlaneScaleAnim = helpers.createElement('a-animation', {
		'attribute': 'radius',
		'from': '5',
		'to': '20',
		'dur': '500',
		'ease': 'ease-out',
	});

	ledEnterPlaneRotateAnim = helpers.createElement('a-animation', {
		'attribute': 'rotation',
		'from': '0 -15 0',
		'to': '0 -43 0',
		'dur': '500',
		'ease': 'ease-out',
	});

	ledEnterPlaneColorAnim = helpers.createElement('a-animation', {
		'attribute': 'color',
		'from': '#0054a6',
		'to': '#19b77e',
		'dur': '500',
		'ease': 'ease-out',
	});

	if (ledPlaneAnimActive) {
		document.querySelector('#led-plane').removeChild(ledLeavePlaneScaleAnim);
		document.querySelector('#led-plane').removeChild(ledLeavePlaneRotateAnim);
		document.querySelector('#led-plane').removeChild(ledLeavePlaneColorAnim);
	} else {
		ledPlaneAnimActive = true;
	}

	document.querySelector('#led-plane').appendChild(ledEnterPlaneScaleAnim);
	document.querySelector('#led-plane').appendChild(ledEnterPlaneRotateAnim);
	document.querySelector('#led-plane').appendChild(ledEnterPlaneColorAnim);

	// setTimeout(ledImpactStoryDelay, 500);
	setTimeout(ledImpactHours, 500);



	function ledImpactHours(){

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
			console.log('prev');
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

	// function ledImpactStoryDelay() {
	// 	const ledImpactTextMixin = helpers.createElement('a-mixin', {
	// 		'id': 'ledImpactTextMixin',
	// 		'color': '#ffffff',
	// 		'align': 'center',
	// 		'baseline': 'bottom',
	// 		'line-height': '80',
	// 		'scale': '8 8',
	// 		'rotation': '0 -43 0',
	// 	});
	// 	selectors.assets.appendChild(ledImpactTextMixin);
	//
	// 	ledImpactText = helpers.createElement('a-entity', {
	// 		'id': 'ledImpactText',
	// 		'position': '-6.067 5.107 -8.522',
	// 	});
	// 	selectors.scene.appendChild(ledImpactText);
	//
	// 	const ledImpactText1 = helpers.createElement('a-text', {
	// 		'id': 'ledImpactText1',
	// 		'mixin': 'ledImpactTextMixin',
	// 		'position': '13.078 9.010 -12.879',
	// 		'value': 'want to see the environmental',
	// 	});
	// 	ledImpactText.appendChild(ledImpactText1);
	//
	// 	const ledImpactText2 = helpers.createElement('a-text', {
	// 		'id': 'ledImpactText1',
	// 		'mixin': 'ledImpactTextMixin',
	// 		'position': '13.273 6.106 -12.517',
	// 		'value': 'impact you could have on the',
	// 	});
	// 	ledImpactText.appendChild(ledImpactText2);
	//
	// 	const ledImpactText3 = helpers.createElement('a-text', {
	// 		'id': 'ledImpactText1',
	// 		'mixin': 'ledImpactTextMixin',
	// 		'position': '14.664 3.181 -11.367',
	// 		'value': 'planet by choosing led?',
	// 	});
	// 	ledImpactText.appendChild(ledImpactText3);
	//
	// 	setTimeout(ledImpactYesNoTextDelay, 1000);
	//
	// 	function ledImpactYesNoTextDelay() {
	// 		const ledImpactYesText = helpers.createElement('a-text', {
	// 			'id': 'ledImpactYesText',
	// 			'mixin': 'ledImpactTextMixin',
	// 			'position': '13.201 -6.33 -12.737',
	// 			'value': 'YES',
	// 			'scale': '25 25',
	// 		});
	// 		ledImpactText.appendChild(ledImpactYesText);
	//
	// 		const ledImpactYesPlane = helpers.createElement('a-plane', {
	// 			'id': 'ledImpactYesPlane',
	// 			'position': '17.117 -6.330 -8.851',
	// 			'rotation': '0 -43 0',
	// 			'width': '10',
	// 			'height': '5',
	// 			'opacity': '0',
	// 		});
	// 		ledImpactText.appendChild(ledImpactYesPlane);
	//
	// 		const ledImpactNoText = helpers.createElement('a-text', {
	// 			'id': 'ledImpactNoText',
	// 			'mixin': 'ledImpactTextMixin',
	// 			'position': '24.236 -7.05 -2.356',
	// 			'value': 'NO',
	// 			'opacity': '0.35',
	// 			'scale': '15 15',
	// 		});
	// 		ledImpactText.appendChild(ledImpactNoText);
	//
	// 		const ledImpactNoPlane = helpers.createElement('a-plane', {
	// 			'id': 'ledImpactNoPlane',
	// 			'position': '26.127 -7.105 -0.475',
	// 			'rotation': '0 -43 0',
	// 			'width': '6',
	// 			'height': '4',
	// 			'opacity': '0',
	// 		});
	// 		ledImpactText.appendChild(ledImpactNoPlane);
	//
	// 		ledImpactYesPlane.addEventListener('click', function startLedImpact() {
	// 			selectors.sky.removeChild(document.querySelector('#skyAnim'));
	// 			selectors.scene.removeChild(document.querySelector('#led'));
	// 			selectors.scene.removeChild(document.querySelector('#lamp'));
	// 			ledImpactText.removeChild(ledImpactText1);
	// 			ledImpactText.removeChild(ledImpactText2);
	// 			ledImpactText.removeChild(ledImpactText3);
	// 			ledImpactText.removeChild(ledImpactYesPlane);
	// 			ledImpactText.removeChild(ledImpactNoText);
	// 			ledImpactText.removeChild(ledImpactNoPlane);
	//
	// 			const ledImpactYesTextScale = helpers.createElement('a-animation', {
	// 				'attribute': 'scale',
	// 				'from': '25 25 0',
	// 				'to': '55 55 0',
	// 				'dur': '1000',
	// 				'ease': 'ease-out',
	// 			});
	// 			ledImpactYesText.appendChild(ledImpactYesTextScale);
	//
	// 			const ledImpactYesTextRotate = helpers.createElement('a-animation', {
	// 				'attribute': 'rotation',
	// 				'from': '0 -43 0',
	// 				'to': '0 -34 0',
	// 				'dur': '1000',
	// 				'ease': 'ease-out',
	// 			});
	// 			ledImpactYesText.appendChild(ledImpactYesTextRotate);
	//
	// 			const ledImpactYesTextPosition = helpers.createElement('a-animation', {
	// 				'attribute': 'position',
	// 				'from': '13.201 -6.33 -12.737',
	// 				'to': '16.235 4 -21.652',
	// 				'dur': '1000',
	// 				'ease': 'ease-out',
	// 			});
	// 			ledImpactYesText.appendChild(ledImpactYesTextPosition);
	//
	// 			setTimeout(hideYesText, 1350);
	// 			function hideYesText(){
	// 				const ledImpactFigure = helpers.createElement('a-text', {
	// 					'id': 'ledImpactFigure',
	// 					'mixin': 'ledImpactTextMixin',
	// 					'position': '22.235 4 -14.602',
	// 					'align': 'center',
	// 					'value': '0',
	// 					'scale': '55 55',
	// 					'rotation': '0 -34 0',
	// 				});
	// 				ledImpactText.appendChild(ledImpactFigure);
	// 				ledImpactText.removeChild(ledImpactYesText);
	// 				selectors.scene.emit('startLedImpactStory', true);
	// 			}
	// 		});
	//
	// 		ledImpactNoPlane.addEventListener('click', function backToLamp() {
	// 			hide();
	// 		});
	// 	}
	// }
}

function hide(selectors, helpers) {
	setTimeout(ledHideDelay, 50);

	function ledHideDelay() {
		document.querySelector('#led-text').setAttribute('opacity', '1');
		document.querySelector('#led-sub-text').setAttribute('opacity', '1');
		document.querySelector('#led-text').setAttribute('position', '12.1 7.482 -13.748');
		document.querySelector('#led-sub-text').setAttribute('position', '11.8 5.759 -13.748');
		document.querySelector('#led-plane').appendChild(ledPlaneScaleAnim);

		ledLeavePlaneScaleAnim = helpers.createElement('a-animation', {
			'attribute': 'radius',
			'from': '20',
			'to': '5',
			'dur': '400',
			'ease': 'ease-out',
		});

		ledLeavePlaneRotateAnim = helpers.createElement('a-animation', {
			'attribute': 'rotation',
			'from': '0 -43 0',
			'to': '0 -15 0',
			'dur': '500',
			'ease': 'ease-out',
		});

		ledLeavePlaneColorAnim = helpers.createElement('a-animation', {
			'attribute': 'color',
			'from': '#19b77e',
			'to': '#0054a6',
			'dur': '500',
			'ease': 'ease-out',
		});

		document.querySelector('#led-plane').removeChild(ledEnterPlaneScaleAnim);
		document.querySelector('#led-plane').removeChild(ledEnterPlaneRotateAnim);
		document.querySelector('#led-plane').removeChild(ledEnterPlaneColorAnim);

		document.querySelector('#led-plane').appendChild(ledLeavePlaneScaleAnim);
		document.querySelector('#led-plane').appendChild(ledLeavePlaneRotateAnim);
		document.querySelector('#led-plane').appendChild(ledLeavePlaneColorAnim);

		// selectors.scene.removeChild(ledImpactText);
	}
}
