'use strict';

/*global document*/

const lampsModule = require('./modules/lamps');
const ledModule = require('./modules/led');
const animations = require('./animations');
const helpers = require('./helpers');
const ajlamps = require('./data/ajlamps');

const sceneElement = document.querySelector('a-scene');

let ledActive = false;
let step = 1;

let calcValues = {
	'daylightHours': 0,
	'dimmedHours': 0,
	'lampAmount': 0
};
let lamp = ajlamps[0];
let savings = {};

lampsModule.create();
const ledEl = ledModule.create();
const ledPlaneEl = ledEl.getChildren().find(el => el.id === 'led-plane');


ledPlaneEl
	.addEventListener('click', function() {
		if (!ledActive) {
			lampsModule.remove();
			animations.sky.darken();
			animations.ledImpact.show();
			animations.ledImpactHours.create(step, ledActive);
		}
		ledActive = true;
	}, { passive: true });

sceneElement
	.addEventListener('ledImpactInit', function() {

		let ledImpactPrevEvent = document.querySelector('#ledImpactPrevEvent');
		let ledImpactNextEvent = document.querySelector('#ledImpactNextEvent');

		ledImpactPrevEvent.addEventListener('mouseenter', function() {

			helpers.appendNewElement(ledImpactPrevEvent, 'a-animation', {
				'id': 'prevOpacityIn',
				'attribute': 'opacity',
				'from': '0.9',
				'to': '1',
				'dur': '500',
				'ease': 'ease-out',
			});

			helpers.appendNewElement(ledImpactPrevEvent, 'a-animation', {
				'id': 'prevOpacityIn',
				'attribute': 'radius',
				'from': '2',
				'to': '2.25',
				'dur': '500',
				'ease': 'ease-out',
			});


			if (ledActive && step == 1){
				lampsModule.create();
				animations.sky.lighten();
				animations.ledImpact.hide();
				animations.ledImpactHours.remove();
				setTimeout( function(){ ledActive = false; }, 500);
			} else if (step > 1) {
				step--;
				animations.ledImpactHours.steps(step, ledActive);
			}
		}, { passive: true });

		ledImpactPrevEvent.addEventListener('mouseleave', function() {

			helpers.appendNewElement(ledImpactPrevEvent, 'a-animation', {
				'id': 'prevOpacityOut',
				'attribute': 'opacity',
				'from': '1',
				'to': '0.9',
				'dur': '500',
				'ease': 'ease-out',
			});

			helpers.appendNewElement(ledImpactPrevEvent, 'a-animation', {
				'id': 'prevRadiusOut',
				'attribute': 'radius',
				'from': '2.25',
				'to': '2',
				'dur': '500',
				'ease': 'ease-out',
			});

		}, {passive: true });

		ledImpactNextEvent.addEventListener('mouseenter', function() {

			helpers.appendNewElement(ledImpactNextEvent, 'a-animation', {
				'id': 'nextOpacityIn',
				'attribute': 'opacity',
				'from': '0.9',
				'to': '1',
				'dur': '500',
				'ease': 'ease-out',
			});

			helpers.appendNewElement(ledImpactNextEvent, 'a-animation', {
				'id': 'nextRadiusIn',
				'attribute': 'radius',
				'from': '2',
				'to': '2.25',
				'dur': '500',
				'ease': 'ease-out',
			});

			if (step < 3){
				let value = parseInt(document.querySelector('#ledImpactInput3').getAttribute('value'));

				if(step == 1){
					calcValues.daylightHours = value;
				} else if (step == 2) {
					calcValues.dimmedHours = value;
				}

				step++;
				setTimeout(function(){
					animations.ledImpactHours.steps(step, ledActive);
				}, 500);

			} else if (step == 3){
				let value = parseInt(document.querySelector('#ledImpactInput3').getAttribute('value'));
				calcValues.lampAmount = value;
				savings = helpers.calculateSavings(calcValues, lamp);

				setTimeout(function(){
					animations.ledImpactHours.remove();
					animations.ledImpactStoryDelay.init();
				}, 500)
			}

		}, { passive: true });

		ledImpactNextEvent.addEventListener('mouseleave', function(){

			helpers.appendNewElement(ledImpactNextEvent, 'a-animation', {
				'id': 'nextOpacityOut',
				'attribute': 'opacity',
				'from': '1',
				'to': '0.9',
				'dur': '500',
				'ease': 'ease-out',
			});

			helpers.appendNewElement(ledImpactNextEvent, 'a-animation', {
				'id': 'nextRadiusOut',
				'attribute': 'radius',
				'from': '2.25',
				'to': '2',
				'dur': '500',
				'ease': 'ease-out',
			});

		});
	}, { passive: true });

sceneElement
	.addEventListener('startLedImpactStory', function() {
		animations.ledImpactStory.counter.initTrees();
	}, { passive: true });

sceneElement
	.addEventListener('startTrees', function() {
		setTimeout(function() {
			animations.ledImpactStory.trees.animIn(savings);
		}, 1000);
	}, { passive: true });

sceneElement
	.addEventListener('treesEnd', function() {
		setTimeout(function() {
			animations.ledImpactStory.cars.init();
			animations.ledImpactStory.counter.initCars();
		}, 1000);
	}, { passive: true });

sceneElement
	.addEventListener('startCars', function() {
		setTimeout(function() {
			animations.ledImpactStory.cars.animIn();
		}, 1000);
	}, { passive: true });

sceneElement
	.addEventListener('carsEnd', function() {
		setTimeout(function() {
			animations.ledImpactStory.trash.init();
			animations.ledImpactStory.counter.initTrash();
		}, 1000);
	}, { passive: true });

sceneElement
		.addEventListener('startTrash', function() {
			setTimeout(function() {
				animations.ledImpactStory.trash.animIn();
			}, 1000);
		}, { passive: true });
