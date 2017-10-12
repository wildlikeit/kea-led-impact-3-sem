'use strict';

/*global document*/

const lampsModule = require('./modules/lamps');
const ledModule = require('./modules/led');
const animations = require('./animations');

const sceneElement = document.querySelector('a-scene');

lampsModule.create();
const ledEl = ledModule.create();
const ledPlaneEl = ledEl.getChildren().find(el => el.id === 'led-plane');

ledPlaneEl
	.addEventListener('mouseenter', function() {
		lampsModule.remove();
		animations.sky.darken();
		animations.ledImpact.show();
		animations.ledImpactHours.create();
	}, { passive: true });

ledPlaneEl
	.addEventListener('mouseleave', function() {
		lampsModule.create();
		animations.sky.lighten();
		animations.ledImpact.hide();
	}, { passive: true });

sceneElement
	.addEventListener('startLedImpactStory', function() {
		animations.ledImpactStory.counter.init();
	}, { passive: true });

sceneElement
	.addEventListener('startTrees', function() {
		setTimeout(function() {
			animations.ledImpactStory.trees.animIn();
		}, 1000);
	}, { passive: true });
