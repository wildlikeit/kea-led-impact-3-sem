'use strict';

/*global document*/

module.exports = {
	initTrees,
	initCars,
	initTrash,
};
const sceneElement = document.querySelector('a-scene');

function initTrees(savings) {
	setTimeout(function() {
		let i = 0;
		// let countTo = 1; // TESTING
		let countTo = ((savings.yearlySavings * 1.222) / 48).toFixed(0);

		function count() {
			setTimeout(function() {
				document.querySelector('#ledImpactFigure').setAttribute('value', i);
				i++;
				if (i <= countTo) {
					count();
				} else {
					setTimeout(function() {
						sceneElement.emit('startTrees', true);
					}, 500);
				}
			}, 0.001);
		}
		count();
	}, 11250);
}

function initCars(savings) {
	setTimeout(function() {
		let i = 0;
		// let countTo = 1; // TESTING
		let countTo = ((savings.yearlySavings * 1.222) / 8000).toFixed(0);

		function count() {
			setTimeout(function() {
				document.querySelector('#ledImpactFigure').setAttribute('value', i);
				i++;
				if (i <= countTo) {
					count();
				} else {
					setTimeout(function() {
						sceneElement.emit('startCars', true);
					}, 500);
				}
			}, 250);
		}
		count();
	}, 13500);
}

function initTrash(savings) {
	setTimeout(function() {
		let i = 0;
		// let countTo = 1; TESTING
		let countTo = (((savings.yearlySavings * 1.222) / 40) * 10);

		function count() {
			setTimeout(function() {
				document.querySelector('#ledImpactFigure').setAttribute('value', i);
				i++;
				if (i <= countTo) {
					count();
				} else {
					setTimeout(function() {
						sceneElement.emit('startTrash', true);
					}, 500);
				}
			}, 0.0000001);
		}
		count();
	}, 6750);
}
