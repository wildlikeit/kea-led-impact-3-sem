'use strict';

/*global document*/

module.exports = {
	init,
};

const sceneElement = document.querySelector('a-scene');

function init(savings){
	setTimeout(function(){
		let i = 0;
		let countTo = ((savings.yearlySavings * 1.222) / 48);
		function count(){
			setTimeout(function() {
				document.querySelector('#ledImpactFigure').setAttribute('value', i);
				i++;
				if (i <= countTo) {
					count();
				}
				if(i == countTo){
					setTimeout(function(){
						sceneElement.emit('startTrees', true);
					}, 500);
				}
			}, 100 - (i*0.9));
		}
		count();
	}, 1000);
}
