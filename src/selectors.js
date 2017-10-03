'use strict';

module.exports = function(document) {
	return {
		scene: document.querySelector('a-scene'),
		assets: document.querySelector('a-assets'),
		sky: document.querySelector('a-sky'),
		ledText: document.querySelectorAll('.led-text'),
		lampText: document.querySelectorAll('.lamp-text'),
		lamp: document.querySelector('#lamp'),
		led: document.querySelector('#led'),
		ledText2: document.querySelector('#led-text'),
		ledPlane: document.querySelector('#led-plane'),
	};
};
