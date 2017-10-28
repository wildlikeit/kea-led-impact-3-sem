'use strict';

const helpers = require('../../helpers');

module.exports = {
	create
};

function create(daylightHoursData, container, step) {
	// Adding text
	daylightHoursData[step - 1].text.forEach(function(text, index) {
		helpers.appendNewElement(container, 'a-text', {
			'id': 'ledImpactText' + index,
			'class': 'ledImpactText',
			'mixin': 'ledImpactTextMixin',
			'scale': '8 8',
			'font': 'https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/opensans/OpenSans-Light.json',
			'shader': 'msdf',
			'align': 'right',
			'position': '0 ' + ((-index * 3) - 1.808) + ' 0',
			'value': text,
		});
		helpers.appendNewElement(document.querySelector('#ledImpactText' + index), 'a-animation', {
			'id': 'ledImpactTextAnim' + index,
			'attribute': 'opacity',
			'from': '0',
			'to': '1',
			'dur': '500',
			'ease': 'ease-out',
		});
	});
}
