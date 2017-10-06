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
	document.querySelector('#led-text').setAttribute('position', '0 0 0');
	document.querySelector('#led-sub-text').setAttribute('position', '0 0 0');

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

	setTimeout(ledImpactDelay, 500);

	function ledImpactDelay() {
		const ledImpactTextMixin = helpers.createElement('a-mixin', {
			'id': 'ledImpactTextMixin',
			'color': '#ffffff',
			'align': 'center',
			'baseline': 'bottom',
			'line-height': '80',
			'scale': '8 8',
			'rotation': '0 -43 0',
		});
		selectors.assets.appendChild(ledImpactTextMixin);

		ledImpactText = helpers.createElement('a-entity', {
			'id': 'ledImpactText',
			'position': '-6.067 5.107 -8.522',
		});
		selectors.scene.appendChild(ledImpactText);

		const ledImpactText1 = helpers.createElement('a-text', {
			'id': 'ledImpactText1',
			'mixin': 'ledImpactTextMixin',
			'position': '13.078 9.010 -12.879',
			'value': 'want to see the environmental',
		});
		ledImpactText.appendChild(ledImpactText1);

		const ledImpactText2 = helpers.createElement('a-text', {
			'id': 'ledImpactText1',
			'mixin': 'ledImpactTextMixin',
			'position': '13.273 6.106 -12.517',
			'value': 'impact you could have on the',
		});
		ledImpactText.appendChild(ledImpactText2);

		const ledImpactText3 = helpers.createElement('a-text', {
			'id': 'ledImpactText1',
			'mixin': 'ledImpactTextMixin',
			'position': '14.664 3.181 -11.367',
			'value': 'planet by choosing led?',
		});
		ledImpactText.appendChild(ledImpactText3);

		setTimeout(ledImpactYesNoTextDelay, 1000);

		function ledImpactYesNoTextDelay() {
			const ledImpactYesText = helpers.createElement('a-text', {
				'id': 'ledImpactYesText',
				'mixin': 'ledImpactTextMixin',
				'position': '13.201 -6.33 -12.737',
				'value': 'YES',
				'scale': '25 25',
			});
			ledImpactText.appendChild(ledImpactYesText);

			const ledImpactYesPlane = helpers.createElement('a-plane', {
				'id': 'ledImpactYesPlane',
				'position': '17.117 -6.330 -8.851',
				'rotation': '0 -43 0',
				'width': '10',
				'height': '5',
				'opacity': '0',
			});
			ledImpactText.appendChild(ledImpactYesPlane);

			const ledImpactNoText = helpers.createElement('a-text', {
				'id': 'ledImpactNoText',
				'mixin': 'ledImpactTextMixin',
				'position': '24.236 -7.05 -2.356',
				'value': 'NO',
				'opacity': '0.35',
				'scale': '15 15',
			});
			ledImpactText.appendChild(ledImpactNoText);

			const ledImpactNoPlane = helpers.createElement('a-plane', {
				'id': 'ledImpactNoPlane',
				'position': '26.127 -7.105 -0.475',
				'rotation': '0 -43 0',
				'width': '6',
				'height': '4',
				'opacity': '0',
			});
			ledImpactText.appendChild(ledImpactNoPlane);

			ledImpactYesPlane.addEventListener('click', function startLedImpact() {
				selectors.sky.removeChild(document.querySelector('#skyAnim'));
				selectors.scene.removeChild(document.querySelector('#led'));
				selectors.scene.removeChild(document.querySelector('#lamp'));
				ledImpactText.removeChild(ledImpactText1);
				ledImpactText.removeChild(ledImpactText2);
				ledImpactText.removeChild(ledImpactText3);
				ledImpactText.removeChild(ledImpactYesPlane);
				ledImpactText.removeChild(ledImpactNoText);
				ledImpactText.removeChild(ledImpactNoPlane);

				const ledImpactYesTextScale = helpers.createElement('a-animation', {
					'attribute': 'scale',
					'from': '25 25 0',
					'to': '55 55 0',
					'dur': '1000',
					'ease': 'ease-out',
				});
				ledImpactYesText.appendChild(ledImpactYesTextScale);

				const ledImpactYesTextRotate = helpers.createElement('a-animation', {
					'attribute': 'rotation',
					'from': '0 -43 0',
					'to': '0 -34 0',
					'dur': '1000',
					'ease': 'ease-out',
				});
				ledImpactYesText.appendChild(ledImpactYesTextRotate);

				const ledImpactYesTextPosition = helpers.createElement('a-animation', {
					'attribute': 'position',
					'from': '13.201 -6.33 -12.737',
					'to': '16.235 4 -21.652',
					'dur': '1000',
					'ease': 'ease-out',
				});
				ledImpactYesText.appendChild(ledImpactYesTextPosition);

				setTimeout(hide, 1350);
				function hide(){
					const ledImpactYLetter = helpers.createElement('a-text', {
						'id': 'ledImpactYLetter',
						'mixin': 'ledImpactTextMixin',
						'position': '16.235 4 -21.602',
						'value': 'Y',
						'scale': '55 55',
						'rotation': '0 -34 0',
					});
					ledImpactText.appendChild(ledImpactYLetter);

					const hide = helpers.createElement('a-animation', {
						'attribute': 'opacity',
						'from': '1',
						'to': '0',
						'dur': '750',
						'ease': 'ease-out',
					});
					ledImpactYesText.appendChild(hide);

					const changeColor = helpers.createElement('a-animation', {
						'attribute': 'color',
						'from': '#ffffff',
						'to': '#058442',
						'dur': '750',
						'ease': 'ease-out',
					});
					ledImpactYLetter.appendChild(changeColor);

					setTimeout(remove, 750);
					function remove(){
						ledImpactText.removeChild(ledImpactYesText);
					}
				}

				this.emit('startLedImpactStory', true);
			});

			ledImpactNoPlane.addEventListener('click', function backToLamp() {
				hide();
			});
		}
	}
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

		selectors.scene.removeChild(ledImpactText);
	}
}
