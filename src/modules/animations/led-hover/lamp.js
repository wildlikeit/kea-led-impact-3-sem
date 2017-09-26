'use strict';

module.exports = {
	hideLamp,
	displayLamp,
};

function hideLamp (selectors){
	selectors.scene.removeChild(selectors.lamp);
}

function displayLamp(selectors){
	selectors.scene.appendChild(selectors.lamp);
}
