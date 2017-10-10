'use strict';

/*global document*/

module.exports = {
	animIn,
};

function animIn(selectors, helpers) {

	selectors.sky.setAttribute('color', '#ffffff');
	selectors.sky.setAttribute('src','#field360');
	selectors.scene.removeChild(document.querySelector('#ledImpactText'));
	const floor = helpers.createElement('a-circle',{
		'id':'forest-floor',
		'src': '#forestFloor',
		'repeat': '1000 1000',
		'segments':'256',
		'radius':'3500',
		'rotation': '-90 0 0',
	});
	selectors.scene.appendChild(floor);

	setTimeout(function() {
		let i = 0;
		let treesToCreate = 20;
		const trees = helpers.createElement('a-entity',{
			'id': 'trees',
		});
		selectors.scene.appendChild(trees);

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
						const cameraUpAnim = helpers.createElement('a-animation', {
							'attribute':'position',
							'from':'0 2 5',
							'to':'0 300 5',
							'dur':'3000',
							'ease':'ease-in-out',
						});
						selectors.camera.appendChild(cameraUpAnim);

						setTimeout(function(){
							selectors.scene.removeChild(floor);
							selectors.scene.removeChild(trees);
							selectors.sky.setAttribute('src', '');
							selectors.scene.emit('endTrees', true);
						},5000);

					}, 5000);
				}

			}, 350 - (i));
		}
		createTree();
	}, 2000);
}
