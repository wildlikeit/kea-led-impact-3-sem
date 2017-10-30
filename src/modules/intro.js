

/*global document*/
const helpers = require('./../helpers');
const sceneElement = document.querySelector('a-scene');

module.exports = {
	introduction,
};

function introduction() {
	const introTextContainer = helpers.appendNewElement(sceneElement, 'a-entity', {
		'id': 'introTextContainer',
		'position': '0 4.75 -13',
	});

	const introText = helpers.appendNewElement(introTextContainer, 'a-text', {
		'id': 'introText',
		'value': 'Best used with the sound on',
		'font': 'https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/opensans/OpenSans-Light.json',
		'shader': 'msdf',
		'position': '0 0 0',
		'opacity': '0',
		'scale': '8 8',
		'color': '#000000',
		'align': 'center'
	});

	helpers.appendNewElement(introText, 'a-animation', {
		'attribute': 'opacity',
		'from': '0',
		'to': '1',
		'dur': '1000',
		'delay': '1000'
	});

	const introStartPlane = helpers.appendNewElement(introTextContainer, 'a-plane', {
		'id': 'introStartPlane',
		'position': '0 -4 0',
		'color': '#ff6961',
		'opacity': '0',
		'width': '5.6',
		'height': '1.9',
	});

	const introStartPlaneEvent = helpers.appendNewElement(introTextContainer, 'a-plane', {
		'id': 'introStartPlaneEvent',
		'position': '0 -4 0.2',
		'opacity': '0',
		'width': '5.6',
		'height': '1.9',
	});

	const introStartText = helpers.appendNewElement(introStartPlane, 'a-text', {
		'id': 'introStartText',
		'value': 'ENTER',
		'color': '#ffffff',
		'font': 'https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/opensans/OpenSans-Bold.json',
		'shader': 'msdf',
		'position': '0 -0.9 0.1',
		'opacity': '0',
		'scale': '5 5',
		'align': 'center',
	});

	helpers.appendNewElement(introStartPlane, 'a-animation', {
		'attribute': 'opacity',
		'from': '0',
		'to': '1',
		'dur': '1000',
		'delay': '2000'
	});

	helpers.appendNewElement(introStartText, 'a-animation', {
		'attribute': 'opacity',
		'from': '0',
		'to': '1',
		'dur': '1000',
		'delay': '2000'
	});

	introStartPlaneEvent.addEventListener('mouseenter', function() {
		let planeCover = helpers.appendNewElement(sceneElement, 'a-plane', {
			'id': 'planeCover',
			'color': '#ffffff',
			'opacity': '0',
			'width': '30',
			'height': '30',
			'position': '0 0 -2'
		});

		helpers.appendNewElement(planeCover, 'a-animation', {
			'attribute': 'opacity',
			'from': '0',
			'to': '1',
			'dur': '1000',
		});

		setTimeout(function() {
			helpers.appendNewElement(planeCover, 'a-animation', {
				'attribute': 'opacity',
				'from': '1',
				'to': '0',
				'dur': '1000',
				'delay': '500',
			});

			setTimeout(function() {
				sceneElement.removeChild(planeCover);
			}, 1500);

			sceneElement.removeChild(introTextContainer);
			sceneElement.emit('startScene');
		}, 1000);
	}, {
		passive: true
	});
}
