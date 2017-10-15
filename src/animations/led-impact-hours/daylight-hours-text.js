'use strict';

const helpers = require('../../helpers');

module.exports = {
	create
};

function create(daylightHoursData, container) {
	// Adding text
	daylightHoursData.forEach(function(element, index) {
		helpers.appendNewElement(container, 'a-text', {
			'id': 'ledImpactText' + index,
			'mixin': 'ledImpactTextMixin',
			'align': 'right',
			'position': '0 ' + (-index * 3) + ' 0',
			'value': element,
		});
	});
}
