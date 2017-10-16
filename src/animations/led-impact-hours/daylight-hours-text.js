'use strict';

const helpers = require('../../helpers');

module.exports = {
	create
};

function create(daylightHoursData, container, step) {
	// Adding text
	daylightHoursData[step-1].text.forEach(function(text, index) {
		helpers.appendNewElement(container, 'a-text', {
			'id': 'ledImpactText' + index,
			'class': 'ledImpactText',
			'mixin': 'ledImpactTextMixin',
			'align': 'right',
			'position': '0 ' + (-index * 3) + ' 0',
			'value': text,
		});
	});
}
