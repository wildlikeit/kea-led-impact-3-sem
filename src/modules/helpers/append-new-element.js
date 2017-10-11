'use strict';

const createElement = require('./create-element');

module.exports = function(container, elementSelector, attributes){
	const newElement = createElement(elementSelector, attributes);
	container.appendChild(newElement);
	return newElement;
};
