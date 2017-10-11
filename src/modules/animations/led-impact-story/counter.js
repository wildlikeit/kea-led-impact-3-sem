'use strict';
/*global document*/
module.exports = {
	init,
};

function init(selectors){
	let countTo = 50000;
	function count(i){
		setTimeout(function() { document.querySelector('#ledImpactFigure').setAttribute('value', i); }, 100 - (i*0.1));
	}

	for (var i = 0; i <= countTo; i++){
		count(i);
	}
}
