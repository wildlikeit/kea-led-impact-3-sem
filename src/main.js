'use strict';

/*global document*/

// Modules
const lampsModule = require('./modules/lamps');
const ledModule = require('./modules/led');
const animations = require('./animations');
const helpers = require('./helpers');

// Data
const ajlamps = require('./data/ajlamps');
const ajsounds = require('./data/ajsounds');

// Global Elements
const sceneElement = document.querySelector('a-scene');

// Global variables
let ledActive = false;
let step = 1;
let activeLampId = 0;

// Objects
let calcValues = {
	'daylightHours': 0,
	'dimmedHours': 0,
	'lampAmount': 0
};
let savings = {};

lampsModule.create(activeLampId);
ajsounds.intro_1.play();

const ledEl = ledModule.create(activeLampId);
const ledPlaneEl = ledEl.getChildren().find(el => el.id === 'led-plane');

const lampNextEvent = document.querySelector('#lampNextEvent');
const lampPrevEvent = document.querySelector('#lampPrevEvent');

// Add event listener after sound 1 has ended
// ajsounds.intro_1.addEventListener('ended', function(){
// 	ajsounds.intro_1.currentTime = 0;
// 	ledPlaneEl
// 		.addEventListener('click', function() {
// 			if (!ledActive) {
// 				lampsModule.remove();
// 				animations.sky.darken();
// 				animations.ledImpact.show();
// 				animations.ledImpactHours.create(step, ledActive);
// 				setTimeout( function(){
// 					ajsounds.steps[step - 1].play()
// 				}, 300);
// 			}
// 			ledActive = true;
// 		}, { passive: true });
//
// }, {passive: true});

ledPlaneEl
	.addEventListener('click', function() {
		if (!ledActive) {
			lampsModule.remove();
			animations.sky.darken();
			animations.ledImpact.show();
			animations.ledImpactHours.create(step, ledActive);
			setTimeout(function() {
				ajsounds.steps[step - 1].play()
			}, 300);
		}
		ledActive = true;
	}, {
		passive: true
	});

lampNextEvent
	.addEventListener('mouseenter', function() {
		if (activeLampId == (ajlamps.length - 1)) {
			activeLampId = 0;
			lampsModule.setupLampData(activeLampId);
		} else {
			activeLampId++;
			lampsModule.setupLampData(activeLampId);
		}
	}, {
		passive: true
	});

lampPrevEvent
	.addEventListener('mouseenter', function() {
		if (activeLampId == 0) {
			activeLampId = (ajlamps.length - 1);
			lampsModule.setupLampData(activeLampId);
		} else {
			activeLampId--;
			lampsModule.setupLampData(activeLampId);
		}
	}, {
		passive: true
	});



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


			if (ledActive && step == 1) {
				lampsModule.create(activeLampId);
				animations.sky.lighten();
				animations.ledImpact.hide();
				animations.ledImpactHours.remove();
				setTimeout(function() {
					ledActive = false;
				}, 500);
			} else if (step > 1) {
				step--;

				setTimeout(function() {
					ajsounds.steps[step - 1].play()
				}, 300);
				animations.ledImpactHours.steps(step, ledActive);
			}
		}, {
			passive: true
		});

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

		}, {
			passive: true
		});

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

			if (step < 3) {
				let value = parseInt(document.querySelector('#ledImpactInput3').getAttribute('value'));

				if (step == 1) {
					calcValues.daylightHours = value;
				} else if (step == 2) {
					calcValues.dimmedHours = value;
				}
				ajsounds.steps[step].play();
				step++;
				setTimeout(function() {
					animations.ledImpactHours.steps(step, ledActive);
				}, 500);

			} else if (step == 3) {
				let lamp = ajlamps[activeLampId];
				let value = parseInt(document.querySelector('#ledImpactInput3').getAttribute('value'));
				calcValues.lampAmount = value;
				savings = helpers.calculateSavings(calcValues, lamp);

				setTimeout(function() {
					animations.ledImpactHours.remove();
					animations.ledImpactStoryDelay.init(savings);
					setTimeout(function() {
						ajsounds.impact_intro.play();
					}, 1000);
				}, 500)
			}

		}, {
			passive: true
		});

		ledImpactNextEvent.addEventListener('mouseleave', function() {

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
	}, {
		passive: true
	});

sceneElement
	.addEventListener('startLedImpactStory', function() {
		ajsounds.trees_counter.play();
		animations.ledImpactStory.counter.initTrees(savings);
	}, {
		passive: true
	});

sceneElement
	.addEventListener('startTrees', function() {
		ajsounds.trees_intro.play();
		setTimeout(function() {
			animations.ledImpactStory.trees.animIn(savings);
		}, 6000);
	}, {
		passive: true
	});

sceneElement
	.addEventListener('treesEnd', function() {
		setTimeout(function() {
			ajsounds.cars_counter.play();
			animations.ledImpactStory.cars.init();
			animations.ledImpactStory.counter.initCars(savings);
		}, 1000);
	}, {
		passive: true
	});


sceneElement
	.addEventListener('startCars', function() {
		setTimeout(function() {
			animations.ledImpactStory.cars.animIn(savings);
			setTimeout(function() {
				ajsounds.cars_intro.play();
			}, 2000);
		}, 1000);
	}, {
		passive: true
	});

sceneElement
	.addEventListener('carsEnd', function() {
		ajsounds.cars_end.play();
		setTimeout(function() {
			ajsounds.trash_counter.play();
			animations.ledImpactStory.trash.init();
			animations.ledImpactStory.counter.initTrash(savings);
		}, 7000);
	}, {
		passive: true
	});

sceneElement
	.addEventListener('startTrash', function() {
		ajsounds.trash_intro.play();
		setTimeout(function() {
			animations.ledImpactStory.trash.animIn(savings);
			setTimeout(function() {
				ajsounds.trash_end.play();
			}, 3000);
		}, 3000);
	}, {
		passive: true
	});

sceneElement
	.addEventListener('trashEnd', function() {
		ajsounds.outro.play();
		setTimeout(function() {
			ajsounds.payoff.play();
			setTimeout(function() {
				helpers.appendNewElement(sky, 'a-animation', {
					'attribute': 'color',
					'from': '#FFFFFF',
					'to': '#000000',
					'dur': '500',
					'ease': 'ease-out',
				}, 2500);
			}, );
		}, 10500);
	}, {
		passive: true
	});
