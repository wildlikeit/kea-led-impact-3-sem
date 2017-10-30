'use strict';

/*global document*/

const helpers = require('../helpers');
const ledImpactStoryDelay = require('./led-impact-story-delay');

module.exports = {
	show,
	hide,
};

let ledPlaneScaleAnimActive = true;
let ledPlaneAnimActive = false;
let ledEnterPlaneScaleAnim;
let ledEnterPlaneRotateAnim;
let ledEnterPlaneColorAnim;
let ledLeavePlaneScaleAnim;
let ledLeavePlaneRotateAnim;
let ledLeavePlaneColorAnim;
let ledImpactText;

let ledPlaneScaleAnim = helpers.createElement('a-animation', {
	'id': 'ledPlaneScaleAnim',
	'attribute': 'radius',
	'from': '5',
	'to': '5.2',
	'dur': '750',
	'repeat': 'indefinite',
	'direction': 'alternate',
	'ease': 'ease-in-out',
});

function show() {
	const ledTextEl = document.querySelector('#led-text');
	const ledSubTextEl = document.querySelector('#led-sub-text');
	const ledPlaneEl = document.querySelector('#led-plane');

	ledTextEl.setAttribute('opacity', '0');
	ledTextEl.setAttribute('position', '0 0 -30');

	ledSubTextEl.setAttribute('opacity', '0');
	ledSubTextEl.setAttribute('position', '0 0 -30');

	if (ledPlaneScaleAnimActive) {
		ledPlaneEl.removeChild(document.querySelector('#ledPlaneScaleAnim'));
		ledPlaneScaleAnimActive = false;
	} else {
		ledPlaneEl.removeChild(ledPlaneScaleAnim);
	}

	ledEnterPlaneScaleAnim = helpers.createElement('a-animation', {
		'attribute': 'radius',
		'from': '5',
		'to': '16',
		'dur': '500',
		'ease': 'ease-out',
	});

	ledEnterPlaneRotateAnim = helpers.createElement('a-animation', {
		'attribute': 'rotation',
		'from': '0 -55 0',
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
		ledPlaneEl.removeChild(ledLeavePlaneScaleAnim);
		ledPlaneEl.removeChild(ledLeavePlaneRotateAnim);
		ledPlaneEl.removeChild(ledLeavePlaneColorAnim);
	} else {
		ledPlaneAnimActive = true;
	}

	ledPlaneEl.appendChild(ledEnterPlaneScaleAnim);
	ledPlaneEl.appendChild(ledEnterPlaneRotateAnim);
	ledPlaneEl.appendChild(ledEnterPlaneColorAnim);

}

function hide() {
	setTimeout(ledHideDelay, 50);

	function ledHideDelay() {
		const ledTextEl = document.querySelector('#led-text');
		const ledSubTextEl = document.querySelector('#led-sub-text');
		const ledPlaneEl = document.querySelector('#led-plane');

		ledTextEl.setAttribute('opacity', '1');
		ledTextEl.setAttribute('position', '12.1 7.482 -13.748');

		ledSubTextEl.setAttribute('opacity', '1');
		ledSubTextEl.setAttribute('position', '11.8 5.759 -13.748');
		ledPlaneEl.appendChild(ledPlaneScaleAnim);

		ledLeavePlaneScaleAnim = helpers.createElement('a-animation', {
			'attribute': 'radius',
			'from': '16',
			'to': '5',
			'dur': '400',
			'ease': 'ease-out',
		});

		ledLeavePlaneRotateAnim = helpers.createElement('a-animation', {
			'attribute': 'rotation',
			'from': '0 -43 0',
			'to': '0 -55 0',
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

		ledPlaneEl.removeChild(ledEnterPlaneScaleAnim);
		ledPlaneEl.removeChild(ledEnterPlaneRotateAnim);
		ledPlaneEl.removeChild(ledEnterPlaneColorAnim);

		ledPlaneEl.appendChild(ledLeavePlaneScaleAnim);
		ledPlaneEl.appendChild(ledLeavePlaneRotateAnim);
		ledPlaneEl.appendChild(ledLeavePlaneColorAnim);
	}
}
