'use strict';

/*global document*/
const helpers = require('../../helpers');

module.exports = {
	init,
	animIn,
};

const sceneElement = document.querySelector('a-scene');
const sky = document.querySelector('a-sky');
let ledImpactFigure;
let floor;
let walls;
const numWalls = 4;

function init() {
	ledImpactFigure = helpers.appendNewElement(sceneElement, 'a-text', {
		'id': 'ledImpactFigure',
		'color': '#000000',
		'position': '11.700 0 -24.485',
		'align': 'center',
		'baseline': 'bottom',
		'scale': '55 55',
		'rotation': '0 -34 0',
		'value': '0',
	});
	floor = helpers.appendNewElement(sceneElement, 'a-box', {
		'id': 'floor',
		'width': '100',
		'depth': '100',
		'height': '10',
		'position': '0 -10 0',
		'static-body': '',
		'color': 'black',
		'opacity': '0.5',
	});
}

function animIn(savings) {
	sceneElement.removeChild(ledImpactFigure);

	const trash = helpers.appendNewElement(sceneElement, 'a-entity', {
		'id': 'trash',
	});

	let i = 0;
	// let trashToCreate = 50; // TESTING
	let trashToCreate = (((savings.yearlySavings * 1.222) / 40)).toFixed(0);
	if (trashToCreate > 50) {
		trashToCreate = 50; // In case trash to create is too high.
	}
	//
	const cMin = -20;
	const cMax = 20;
	const rainHeight = 50; // Height that it rains from

	function createTrash() {
		let ranX = Math.floor(Math.random() * (cMax - cMin)) + cMin;
		let ranZ = Math.floor(Math.random() * (cMax - cMin)) + cMin;
		let ranY = Math.floor(Math.random() * (360 - 0)) + 0;
		let items = [{
				'type': 'a-box',
				'src': '#pizzaBox',
				'depth': '1',
				'height': '0.1',
				'width': '1',
				'rotation': '0 ' + ranY + ' 0',
				'position': ranX + ' ' + rainHeight + ' ' + ranZ,
				'dynamic-body': 'shape: box',

			},
			{
				'type': 'a-box',
				'src': '#plasticBag',
				'depth': '0.65',
				'height': '0.01',
				'width': '1',
				'rotation': '0 ' + ranY + ' 0',
				'position': ranX + ' ' + rainHeight + ' ' + ranZ,
				'dynamic-body': 'shape: box',
			},
			{
				'type': 'a-box',
				'src': '#cereal',
				'depth': '1',
				'height': '0.2',
				'width': '0.5',
				'rotation': '0 ' + ranY + ' 0',
				'position': ranX + ' ' + rainHeight + ' ' + ranZ,
				'dynamic-body': 'shape: box',
			},
			{
				'type': 'a-cylinder',
				'src': '#can',
				'height': '0.3',
				'radius': '0.1',
				'rotation': '0 ' + ranY + ' 0',
				'position': ranX + ' ' + rainHeight + ' ' + ranZ,
				'dynamic-body': 'shape: cylinder',
				'child': {
					'type': 'a-circle',
					'radius': '0.1',
					'src': '#canTop',
					'position': '-0.002 0.158 0.007',
					'rotation': '-90 0 0',
				},
			},
			{
				'type': 'a-cylinder',
				'src': '#plasticBottle',
				'height': '0.4',
				'radius': '0.1',
				'rotation': '-90 ' + ranY + ' 45',
				'position': ranX + ' ' + rainHeight + ' ' + ranZ,
				'dynamic-body': 'shape: cylinder',
			},
			{
				'type': 'a-box',
				'src': '#crisps',
				'depth': '0.05',
				'height': '0.75',
				'width': '0.45',
				'rotation': '0 ' + ranY + ' 0',
				'position': ranX + ' ' + rainHeight + ' ' + ranZ,
				'dynamic-body': 'shape: box',
			},
			{
				'type': 'a-cylinder',
				'src': '#tubeChips',
				'height': '0.7',
				'radius': '0.14',
				'rotation': '-90 ' + ranY + ' 0',
				'position': ranX + ' ' + rainHeight + ' ' + ranZ,
				'dynamic-body': 'shape: cylinder',
			},
			{
				'type': 'a-box',
				'src': '#cookies',
				'depth': '0.3',
				'height': '0.075',
				'width': '0.45',
				'rotation': '0 ' + ranY + ' 0',
				'position': ranX + ' ' + rainHeight + ' ' + ranZ,
				'dynamic-body': 'shape: box',
			}
		];

		let ranItem = Math.floor(Math.random() * items.length);

		setTimeout(function() {
			if ((ranX < 1 && ranX > -1) || (ranZ < 1 && ranZ > -1)) {} else {
				const item = document.createElement(items[ranItem].type);
				for (const [key, value] of Object.entries(items[ranItem])) {
					if (key == 'type') {} else if (key == 'child') {
						const child = document.createElement(items[ranItem].child.type);
						for (const [key, value] of Object.entries(items[ranItem].child)) {
							if (key == 'type') {} else {
								child.setAttribute(key, value);
							}
						}
						item.appendChild(child);
					} else {
						item.setAttribute(key, value);
					}
				}
				trash.appendChild(item);
				// const anim = helpers.appendNewElement(item, 'a-animation',{
				// 	'attribute': 'position',
				// 	'from': ranX + ' 1000 '+ ranZ,
				// 	'to': ranX + ' 20 '+ ranZ,
				// 	'dur': '5000',
				// 	'ease': 'linear',
				// });
				i++;
			}
			if (i <= trashToCreate) {
				createTrash();
			} else {
				sceneElement.removeChild(trash);
				sceneElement.removeChild(floor);
				sceneElement.emit('trashEnd', true);
			}
		}, 100);
	}
	createTrash();
}
