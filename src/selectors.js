'use strict';

module.exports = function(document) {
	return {
		document: document,
		scene: document.querySelector('a-scene'),
		assets: document.querySelector('a-assets'),
	};
};
