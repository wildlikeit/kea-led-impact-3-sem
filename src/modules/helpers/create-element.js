'use strict';

/*global document*/

module.exports = function(elementSelector, attributes){
	var element = document.createElement(elementSelector);

	if (attributes) {
		if (typeof attributes !== 'object') {
			throw new Error('Attributes must be an object');
		}

		Object
			.keys(attributes)
			.forEach((key) => element.setAttribute(key, attributes[key]));
	}

	return element;
};
