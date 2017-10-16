'use strict';

/*global document*/

const lampsModule = require('./modules/lamps');
const ledModule = require('./modules/led');
const animations = require('./animations');

const sceneElement = document.querySelector('a-scene');

let ledActive = false;

let step = 1;
let calcValues = [];

lampsModule.create();
const ledEl = ledModule.create();
const ledPlaneEl = ledEl.getChildren().find(el => el.id === 'led-plane');


ledPlaneEl
	.addEventListener('click', function() {
		if (!ledActive) {
			lampsModule.remove();
			animations.sky.darken();
			animations.ledImpact.show();
			animations.ledImpactHours.create(step);
		}
		ledActive = true;
	}, { passive: true });

sceneElement
	.addEventListener('ledImpactInit', function() {

		let ledImpactPrevEvent = document.querySelector('#ledImpactPrevEvent');
		let ledImpactNextEvent = document.querySelector('#ledImpactNextEvent');

		ledImpactPrevEvent.addEventListener('click', function() {
			if (ledActive && step == 1){
				lampsModule.create();
				animations.sky.lighten();
				animations.ledImpact.hide();
				animations.ledImpactHours.remove();
				setTimeout( function(){ ledActive = false; }, 500);
			} else if (step > 1) {
				step--;
				animations.ledImpactHours.steps(step);
				console.log(`at step ${step}`);
			}
		}, { passive: true });

		ledImpactNextEvent.addEventListener('click', function(e) {
			if (step < 3){
				let value = parseInt(document.querySelector('#ledImpactInput3').getAttribute('value'));
				calcValues.push(value);
				step++;
				console.log(`at step ${step} with ${calcValues}`);
				setTimeout(function(){
					animations.ledImpactHours.steps(step);
				}, 500);

			} else if (step == 3){
				let value = parseInt(document.querySelector('#ledImpactInput3').getAttribute('value'));
				calcValues.push(value);
				console.log(`at step ${step} with ${calcValues}`);
				animations.ledImpactHours.remove();
				animations.ledImpactStoryDelay.init();
			}
		}, { passive: true });
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
