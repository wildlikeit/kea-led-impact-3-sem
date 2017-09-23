'use strict';

module.exports = function(document) {
	return {
		scene: document.querySelector('a-scene'),
		assets: document.querySelector('a-assets'),
		sky: document.querySelector('a-sky'),
		ledText: document.querySelectorAll('.led-text'),
		lampText: document.querySelectorAll('.lamp-text'),
	};
};
