'use strict';

/*global document*/
const helpers = require('../../helpers');

module.exports = {
	animIn,
};

const sceneElement = document.querySelector('a-scene');
const sky = document.querySelector('a-sky');
const camera = document.querySelector('a-camera');

function animIn() {

	sky.setAttribute('color', '#ffffff');
	sky.setAttribute('src','#field360');
	sceneElement.removeChild(document.querySelector('#ledImpactText'));
	const floor = helpers.appendNewElement(sceneElement, 'a-circle',{
		'id':'forest-floor',
		'src': '#forestFloor',
		'repeat': '1000 1000',
		'segments':'256',
		'radius':'3500',
		'rotation': '-90 0 0',
	});

	setTimeout(function() {
		let i = 0;
		let treesToCreate = 20;
		const trees = helpers.appendNewElement(sceneElement, 'a-entity',{
			'id': 'trees',
		});

		function createTree() {
			let xMin = -1750;
			let xMax = 1750;
			let zMin = -1750;
			let zMax = 1750;
			let ranX = Math.floor(Math.random() * (xMax - xMin)) + xMin;
			let ranZ = Math.floor(Math.random() * (zMax - zMin)) + zMin;

			setTimeout(function() {
				const tree = helpers.createElement('a-gltf-model', {
					'src': '#tree',
					'scale': '0.5 0.5 0.5',
					'position': ranX + ' -5 ' + ranZ,
				});
				trees.appendChild(tree);
				i++;
				if (i <= treesToCreate) {
					createTree();
				}

				if (i == treesToCreate) {
					setTimeout(function() {
						const cameraUpAnim = helpers.appendNewElement(camera, 'a-animation', {
							'attribute':'position',
							'from':'0 2 5',
							'to':'0 300 5',
							'dur':'3000',
							'ease':'ease-in-out',
						});

						setTimeout(function(){
							sceneElement.removeChild(floor);
							sceneElement.removeChild(trees);
							sky.setAttribute('src', '');
							sceneElement.emit('endTrees', true);
						},5000);

					}, 5000);
				}

			}, 350 - (i));
		}
		createTree();
	}, 2000);
}
