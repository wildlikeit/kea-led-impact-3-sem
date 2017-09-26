'use strict';

/*global document*/

const helpers = require('./../../helpers');


module.exports = {
	init,
};

function init() {

	function displayLedImpact(selectors) {

		let ledImpactText;

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
			'position': '13.078 10.010 -12.879',
			'value': 'want to see the environmental',
		});
		ledImpactText.appendChild(ledImpactText1);

		const ledImpactText2 = helpers.createElement('a-text', {
			'id': 'ledImpactText1',
			'mixin': 'ledImpactTextMixin',
			'position': '13.273 7.106 -12.517',
			'value': 'impact you could have on the',
		});
		ledImpactText.appendChild(ledImpactText2);

		const ledImpactText3 = helpers.createElement('a-text', {
			'id': 'ledImpactText1',
			'mixin': 'ledImpactTextMixin',
			'position': '14.664 4.181 -11.367',
			'value': 'planet by choosing led?',
		});
		ledImpactText.appendChild(ledImpactText3);
	}
}
