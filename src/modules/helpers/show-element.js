'use strict';
/*global document*/
module.exports = {
	show,
};

function show(selectors, helpers){
	const show = helpers.createElement('a-animation', {
		'attribute': 'opacity',
		'from': '0',
		'to': '1',
		'dur': '400',
		'ease': 'ease-out',
	});
}
