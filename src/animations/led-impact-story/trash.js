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

function init(){
	sky.setAttribute('color', '#000000');
	ledImpactFigure = helpers.appendNewElement(sceneElement, 'a-text',{
		'id': 'ledImpactFigure',
		'color': '#ffffff',
		'position': '11.700 0 -24.485',
		'align': 'center',
		'baseline': 'bottom',
		'scale': '55 55',
		'rotation': '0 -34 0',
		'value': '0',
	});
}

function animIn() {
	sceneElement.removeChild(ledImpactFigure);
	sky.setAttribute('color', '#ffffff');

	const trash = helpers.appendNewElement(sceneElement, 'a-entity',{
		'id': 'trash',
	});

	let i = 0;
	let trashToCreate = 200;
	let cMin = -10;
	let cMax = 10;

	function createTrash() {
		let ranX = Math.floor(Math.random() * (cMax - cMin)) + cMin;
		let ranZ = Math.floor(Math.random() * (cMax - cMin)) + cMin;
		let ranY = Math.floor(Math.random() * (360 - 0)) + 0;
		let items = [
			{
				'type': 'a-box',
				'src': '#pizzaBox',
				'depth': '1',
				'height': '0.1',
				'width': '1',
				'rotation': '0 '+ ranY +' 0',
			},
			{
				'type': 'a-box',
				'src': '#plasticBag',
				'depth': '0.65',
				'height': '0.01',
				'width': '1',
				'rotation': '0 '+ ranY +' 0',
			},
			{
				'type': 'a-box',
				'src': '#cereal',
				'depth': '1',
				'height': '0.2',
				'width': '0.5',
				'rotation': '0 '+ ranY +' 0',
			},
			{
				'type': 'a-cylinder',
				'src': '#can',
				'height': '0.3',
				'radius': '0.1',
				'rotation': '0 '+ ranY +' 0',
				'child':
				{
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
				'rotation': '-90 '+ ranY +' 45',
			},
			{
				'type': 'a-box',
				'src': '#crisps',
				'depth': '0.05',
				'height': '0.75',
				'width': '0.45',
				'rotation': '0 '+ ranY +' 0',
			}];

		let ranItem = Math.floor(Math.random() * items.length);

		setTimeout(function(){
			if ((ranX < 1 && ranX > -1) || (ranZ < 1 && ranZ > -1)) {
			} else {
				const item = document.createElement(items[ranItem].type);
				for (const [key, value] of Object.entries(items[ranItem])) {
					if(key == 'type'){
					}else if (key == 'child'){
						const child = document.createElement(items[ranItem].child.type);
						for (const [key, value] of Object.entries(items[ranItem].child)) {
							if(key == 'type'){
							}else{
								child.setAttribute(key, value);
							}
						}
						item.appendChild(child);
					}else{
						item.setAttribute(key, value);
					}
				}
				trash.appendChild(item);
				const anim = helpers.appendNewElement(item, 'a-animation',{
					'attribute': 'position',
					'from': ranX + ' 1000 '+ ranZ,
					'to': ranX + ' 0 '+ ranZ,
					'dur': '7500',
					'ease': 'linear',
				});
				i++;
			}
			if (i <= trashToCreate) {
				createTrash();
			}else{
				sceneElement.removeChild(trash);
				sceneElement.emit('trashEnd', true);
			}
		}, 100);
	}
	createTrash();
}
