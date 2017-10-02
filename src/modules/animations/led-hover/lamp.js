'use strict';

module.exports = {
	hideLamp,
	displayLamp,
};

function hideLamp (selectors){
	console.log(selectors.scene);
	console.log(selectors.lamp);
	selectors.scene.removeChild(selectors.lamp);
}

function displayLamp(selectors){
	selectors.scene.appendChild(selectors.lamp);
}
