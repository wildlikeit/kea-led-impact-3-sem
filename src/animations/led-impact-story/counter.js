'use strict';

/*global document*/

module.exports = {
	initTrees,
	initCars,
	initTrash,
};

const sceneElement = document.querySelector('a-scene');

function initTrees(){
	setTimeout(function(){
		let i = 0;
		let countTo = 10;
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

function initCars(){
	setTimeout(function(){
		let i = 0;
		let countTo = 10;
		function count(){
			setTimeout(function() {
				document.querySelector('#ledImpactFigure').setAttribute('value', i);
				i++;
				if (i <= countTo) {
					count();
				}
				if(i == countTo){
					setTimeout(function(){
						sceneElement.emit('startCars', true);
					}, 500);
				}
			}, 100 - (i*0.9));
		}
		count();
	}, 1000);
}

function initTrash(){
	setTimeout(function(){
		let i = 0;
		let countTo = 10;
		function count(){
			setTimeout(function() {
				document.querySelector('#ledImpactFigure').setAttribute('value', i);
				i++;
				if (i <= countTo) {
					count();
				}
				if(i == countTo){
					setTimeout(function(){
						sceneElement.emit('startTrash', true);
					}, 500);
				}
			}, 100 - (i*0.9));
		}
		count();
	}, 1000);
}
