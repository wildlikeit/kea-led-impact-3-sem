'use strict';
/*global document*/
module.exports = {
	hide,
};

function hide(selectors, helpers){
	const hide = helpers.createElement('a-animation', {
		'attribute': 'opacity',
		'from': '1',
		'to': '0',
		'dur': '400',
		'ease': 'ease-out',
	});
}
