'use strict';

module.exports = function(document) {
	return {
		document: document,
		scene: document.queryselector('a-scene'),
		assets: document.querySelector('a-assets'),
	};
};
