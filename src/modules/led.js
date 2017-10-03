'use strict';

module.exports = {
	init,
};

function init(selectors, helpers) {

	// LAMP SAVINGS LED//

	const led = helpers.createElement('a-entity', {
		'id': 'led',
	});
	selectors.scene.appendChild(led);

	let ledPlaneEl = helpers.createElement('a-circle', {
		'id': 'led-plane',
		'color': '#0054a6',
		'rotation': '0 -15 0',
		'segments': '128',
		'radius': '5',
		'position': '15.5  6.5 -13.5',
	});
	led.appendChild(ledPlaneEl);

	const ledPlaneScaleAnim = helpers.createElement('a-animation', {
		'id': 'ledPlaneScaleAnim',
		'attribute': 'radius',
		'from': '5',
		'to': '5.2',
		'dur': '1000',
		'repeat': 'indefinite',
		'direction': 'alternate',
		'ease': 'ease-in-out',
	});
	ledPlaneEl.appendChild(ledPlaneScaleAnim);

	let ledTextEl = helpers.createElement('a-text', {
		'id': 'led-text',
		'mixin': 'ledTextMixin',
		'position': '12.1 7.482 -13.748',
		'value': 'SAVE 70%',
	});
	led.appendChild(ledTextEl);

	let ledSubTextEl = helpers.createElement('a-text', {
		'id': 'led-sub-text',
		'mixin': 'ledTextMixin',
		'position': '11.8 5.759 -13.748',
		'value': 'USING LED',
	});
	led.appendChild(ledSubTextEl);

}
