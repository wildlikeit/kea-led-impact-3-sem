'use strict';

/*global document*/
const helpers = require('../../helpers');

module.exports = {
	animIn,
};

const sceneElement = document.querySelector('a-scene');
const sky = document.querySelector('a-sky');
const camera = document.querySelector('a-camera');

const ajsounds = require('../../data/ajsounds');

function animIn(savings) {
	sky.setAttribute('color', '#ffffff');
	sceneElement.removeChild(document.querySelector('#ledImpactText'));
	sceneElement.setAttribute('rain', '');

	setTimeout(function() {
		let i = 0;
		let treesToCreate = ((savings.yearlySavings * 1.222) / 48);
		// calculates amount of acres from trees, in case treesToCreate get overwritten below
		let acresToCreate = ((treesToCreate / 400).toFixed(0));
		treesToCreate = 1;
		if (treesToCreate > 100) {
			// Override in case too many trees need to be created and it will break the browser
			treesToCreate = 100;
		}

		// Trees container
		const trees = helpers.appendNewElement(sceneElement, 'a-entity', {
			'id': 'trees',
		});

		// Create tree function
		function createTree() {
			// Makes sure trees spawn in a certain radius around the camera
			let cMin = -350;
			let cMax = 350;
			let ranX = Math.floor(Math.random() * (cMax - cMin)) + cMin;
			let ranZ = Math.floor(Math.random() * (cMax - cMin)) + cMin;


			setTimeout(function() {
				// Makes sure trees spawn in a certain radius around the camera
				if ((ranX < 5 && ranX > -5) || (ranZ < 10 && ranZ > 0)) {} else {
					const tree = helpers.appendNewElement(trees, 'a-gltf-model', {
						'src': '#tree',
						'position': ranX + ' -5 ' + ranZ,
						'rotation': '0 ' + ranX + ' 0',
					});

					i++;

				}
				if (i <= treesToCreate) {
					createTree();
				} else {
					ajsounds.trees_above_intro.play();
					const cameraUpAnim = helpers.appendNewElement(camera, 'a-animation', {
						'attribute': 'position',
						'from': '0 2 5',
						'to': '0 1000 5',
						'dur': '3000',
						'delay': '4000',
						'ease': 'ease-in-out',
					});
					sceneElement.removeAttribute('rain');
					setTimeout(function() {
						let countTo = acresToCreate;
						let split = Math.floor(Math.sqrt(countTo));
						let forestPos = -(split * 250) / 2;
						let posZ = 0;
						let posX = 0;

						ajsounds.trees_above_1.play();
						setTimeout(function() {
							if (countTo > 10) {
								ajsounds.acres[9].play();
							} else {
								ajsounds.acres[countTo - 1].play();
							}
						}, 1500);

						setTimeout(function() {
							ajsounds.trees_end.play();
						}, 5000);

						sceneElement.removeChild(trees);
						const forests = helpers.appendNewElement(sceneElement, 'a-entity', {
							'id': 'forests',
						});
						const forest = helpers.appendNewElement(forests, 'a-plane', {
							'id': 'forest',
							'width': '700',
							'height': '700',
							'rotation': '-90 0 0',
							'position': '0 550 0',
							'src': '#forest',
						});

						setTimeout(function() {

							forests.removeChild(forest);
							forests.setAttribute('position', (forestPos + 100) + ' 0 ' + (forestPos - 150));
							for (var i = 0; i < countTo; i++) {
								if (i % split == 0) {
									posZ += 250;
									posX = 0;
								} else {
									posX += 250;
								}
								const miniForest = helpers.appendNewElement(forests, 'a-plane', {
									'id': 'miniForest',
									'width': '250',
									'height': '250',
									'rotation': '-90 0 0',
									'position': posX + ' 550 ' + posZ,
									'src': '#forest',
								});
							}
							setTimeout(function() {
								sceneElement.removeChild(forests);
								camera.setAttribute('position', '0 2 0');
								sceneElement.emit('treesEnd', true);
							}, 7500);

						}, 2000);

					}, 7500);
				}
			}, 350);
		}
		createTree();
	}, 2000);
}
