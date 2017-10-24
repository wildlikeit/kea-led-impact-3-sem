'use strict';

/*global document*/

// Modules
const lampsModule = require('./modules/lamps');
const ledModule = require('./modules/led');
const animations = require('./animations');
const helpers = require('./helpers');
const ajlamps = require('./data/ajlamps');

// Global Elements
const sceneElement = document.querySelector('a-scene');

// Global variables
let ledActive = false;
let step = 1;
let activeLampId = 0;

// Sounds
const sounds = [
	{
		'intro_1': document.querySelector('#intro_1'),
	},
	{
		'steps': [
			document.querySelector('#step_1'),
			document.querySelector('#step_2'),
			document.querySelector('#step_3'),
		],
	},
]



// Objects
let calcValues = {
	'daylightHours': 0,
	'dimmedHours': 0,
	'lampAmount': 0
};
let savings = {};

lampsModule.create(activeLampId);
sounds.intro_1.play();

const ledEl = ledModule.create(activeLampId);
const ledPlaneEl = ledEl.getChildren().find(el => el.id === 'led-plane');

introSound.play();

const lampNextEvent = document.querySelector('#lampNextEvent');
const lampPrevEvent = document.querySelector('#lampPrevEvent');

lampNextEvent
	.addEventListener('mouseenter', function(){
		if(activeLampId == (ajlamps.length - 1)){
			activeLampId = 0;
			lampsModule.setupLampData(activeLampId);
		} else {
			activeLampId++;
			lampsModule.setupLampData(activeLampId);
		}
	}, {passive: true});

lampPrevEvent
	.addEventListener('mouseenter', function(){
		if(activeLampId == 0){
			activeLampId = (ajlamps.length - 1);
			lampsModule.setupLampData(activeLampId);
		} else {
			activeLampId--;
			lampsModule.setupLampData(activeLampId);
		}
	}, {passive: true});

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
				lampsModule.create(activeLampId);
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
				let lamp = ajlamps[activeLampId];
				let value = parseInt(document.querySelector('#ledImpactInput3').getAttribute('value'));
				calcValues.lampAmount = value;
				savings = helpers.calculateSavings(calcValues, lamp);
				console.log(calcValues, savings);

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
		animations.ledImpactStory.counter.initTrees(savings);
	}, { passive: true });

sceneElement
	.addEventListener('startTrees', function() {
		console.log('trees start');
		setTimeout(function() {
			animations.ledImpactStory.trees.animIn(savings);
		}, 1000);
	}, { passive: true });

sceneElement
	.addEventListener('treesEnd', function() {
		console.log('trees end');
		setTimeout(function() {
			animations.ledImpactStory.cars.init();
			animations.ledImpactStory.counter.initCars(savings);
		}, 1000);
	}, { passive: true });

sceneElement
	.addEventListener('startCars', function() {
		console.log('cars start');
		setTimeout(function() {
			animations.ledImpactStory.cars.animIn(savings);
		}, 1000);
	}, { passive: true });

sceneElement
	.addEventListener('carsEnd', function() {
		console.log('cars end');
		setTimeout(function() {
			animations.ledImpactStory.trash.init();
			animations.ledImpactStory.counter.initTrash(savings);
		}, 1000);
	}, { passive: true });

sceneElement
		.addEventListener('startTrash', function() {
			console.log('trash start');
			setTimeout(function() {
				animations.ledImpactStory.trash.animIn(savings);
			}, 1000);
		}, { passive: true });
