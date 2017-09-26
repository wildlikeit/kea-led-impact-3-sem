'use strict';

module.exports = {
	displayLedImpact,
	hideLedImpact,
};

// let ledPlaneAnimActive = false;
// let ledEnterPlaneScaleAnim;
// let ledEnterPlaneRotateAnim;
// let ledEnterPlaneColorAnim;
// let ledLeavePlaneScaleAnim;
// let ledLeavePlaneRotateAnim;
// let ledLeavePlaneColorAnim;

let ledImpactText;

function displayLedImpact(selectors, helpers) {

	// led.removeChild(ledTextEl);
	// led.removeChild(ledSubTextEl);
	// ledPlaneEl.removeChild(ledPlaneScaleAnim);
	//
	// ledEnterPlaneScaleAnim = helpers.createElement('a-animation', {
	// 	'attribute': 'radius',
	// 	'from': '5',
	// 	'to': '16',
	// 	'dur': '500',
	// 	'ease': 'ease-out',
	// });
	//
	// ledEnterPlaneRotateAnim = helpers.createElement('a-animation', {
	// 	'attribute': 'rotation',
	// 	'from': '0 -15 0',
	// 	'to': '0 -43 0',
	// 	'dur': '500',
	// 	'ease': 'ease-out',
	// });
	//
	// ledEnterPlaneColorAnim = helpers.createElement('a-animation', {
	// 	'attribute': 'color',
	// 	'from': '#0054a6',
	// 	'to': '#19b77e',
	// 	'dur': '500',
	// 	'ease': 'ease-out',
	// });
	//
	// if (ledPlaneAnimActive) {
	//
	// 	ledPlaneEl.removeChild(ledLeavePlaneScaleAnim);
	// 	ledPlaneEl.removeChild(ledLeavePlaneRotateAnim);
	// 	ledPlaneEl.removeChild(ledLeavePlaneColorAnim);
	//
	// } else {
	//
	// 	ledPlaneAnimActive = true;
	//
	// }
	//
	// ledPlaneEl.appendChild(ledEnterPlaneScaleAnim);
	// ledPlaneEl.appendChild(ledEnterPlaneRotateAnim);
	// ledPlaneEl.appendChild(ledEnterPlaneColorAnim);




	const ledImpactTextMixin = helpers.createElement('a-mixin', {
		'id': 'ledImpactTextMixin',
		'color': '#ffffff',
		'align': 'center',
		'baseline': 'bottom',
		'line-height': '80',
		'scale': '8 8',
		'rotation': '0 -43 0',
	});

	ledImpactText = helpers.createElement('a-entity', {
		'id': 'ledImpactText',
		'position': '-6.067 5.107 -8.522',
	});

	const ledImpactText1 = helpers.createElement('a-text', {
		'id': 'ledImpactText1',
		'mixin': 'ledImpactTextMixin',
		'position': '13.078 10.010 -12.879',
		'value': 'want to see the environmental',
	});

	const ledImpactText2 = helpers.createElement('a-text', {
		'id': 'ledImpactText1',
		'mixin': 'ledImpactTextMixin',
		'position': '13.273 7.106 -12.517',
		'value': 'impact you could have on the',
	});

	const ledImpactText3 = helpers.createElement('a-text', {
		'id': 'ledImpactText1',
		'mixin': 'ledImpactTextMixin',
		'position': '14.664 4.181 -11.367',
		'value': 'planet by choosing led?',
	});

	selectors.assets.appendChild(ledImpactTextMixin);
	selectors.scene.appendChild(ledImpactText);
	ledImpactText.appendChild(ledImpactText1);
	ledImpactText.appendChild(ledImpactText2);
	ledImpactText.appendChild(ledImpactText3);
}

function hideLedImpact(selectors) {

	// led.appendChild(ledTextEl);
	// led.appendChild(ledSubTextEl);
	// ledPlaneEl.appendChild(ledPlaneScaleAnim);
	//
	// ledLeavePlaneScaleAnim = helpers.createElement('a-animation', {
	// 	'attribute': 'radius',
	// 	'from': '16',
	// 	'to': '5',
	// 	'dur': '400',
	// 	'ease': 'ease-out',
	// });
	//
	// ledLeavePlaneRotateAnim = helpers.createElement('a-animation', {
	// 	'attribute': 'rotation',
	// 	'from': '0 -43 0',
	// 	'to': '0 -15 0',
	// 	'dur': '500',
	// 	'ease': 'ease-out',
	// });
	//
	// ledLeavePlaneColorAnim = helpers.createElement('a-animation', {
	// 	'attribute': 'color',
	// 	'from': '#19b77e',
	// 	'to': '#0054a6',
	// 	'dur': '500',
	// 	'ease': 'ease-out',
	// });
	//
	// ledPlaneEl.appendChild(ledLeavePlaneScaleAnim);
	// ledPlaneEl.appendChild(ledLeavePlaneRotateAnim);
	// ledPlaneEl.appendChild(ledLeavePlaneColorAnim);
	//
	// ledPlaneEl.removeChild(ledEnterPlaneScaleAnim);
	// ledPlaneEl.removeChild(ledEnterPlaneRotateAnim);
	// ledPlaneEl.removeChild(ledEnterPlaneColorAnim);

	selectors.scene.removeChild(ledImpactText);
}
