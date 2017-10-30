'use strict';

/*global document*/

// Modules
const intro = require('./modules/intro');
const lampsModule = require('./modules/lamps');
const ledModule = require('./modules/led');
const animations = require('./animations');
const helpers = require('./helpers');

// Data
const ajlamps = require('./data/ajlamps');
const ajsounds = require('./data/ajsounds');

// Global Elements
const sceneElement = document.querySelector('a-scene');
const assetsElement = document.querySelector('a-assets');

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

sceneElement.addEventListener('startScene', function() {
	startScene()
});

function startScene() {

	lampsModule.create(activeLampId);
	helpers.playSound(ajsounds.intro_1);

	const ledEl = ledModule.create(activeLampId);
	const ledPlaneEl = ledEl.getChildren().find(el => el.id === 'led-plane');

	const lampNextEvent = document.querySelector('#lampNextEvent');
	const lampPrevEvent = document.querySelector('#lampPrevEvent');

	helpers.appendNewElement(ledPlaneEl, 'a-animation', {
		'id': 'ledPlaneScaleAnim',
		'attribute': 'radius',
		'from': '5',
		'to': '5.2',
		'dur': '750',
		'repeat': 'indefinite',
		'direction': 'alternate',
		'ease': 'ease-in-out',
	});

	ledPlaneEl
		.addEventListener('click', function() {
			if (!ledActive) {
				lampsModule.remove();
				animations.sky.darken();
				animations.ledImpact.show();
				animations.ledImpactHours.create(step, ledActive);
				setTimeout(function() {
					helpers.playSound(ajsounds.steps[step - 1]);
					setTimeout(function() {
						helpers.playSound(ajsounds.calculate_instruction);
					}, 5000);
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
						helpers.playSound(ajsounds.steps[step - 1]);
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
					let goToNext = false;

					// Adds value to object
					if (step == 1 && value > 0) {
						calcValues.daylightHours = value;
						goToNext = true;
					} else if (step == 2 && value <= calcValues.daylightHours) {
						calcValues.dimmedHours = value;
						goToNext = true;
					}

					if (goToNext)  {
						helpers.playSound(ajsounds.steps[step]);
						step++;
						setTimeout(function() {
							animations.ledImpactHours.steps(step, ledActive);
						}, 500);
					}

				} else if (step == 3) {
					let lamp = ajlamps[activeLampId];
					let value = parseInt(document.querySelector('#ledImpactInput3').getAttribute('value'));
					if (value > 0) {
						calcValues.lampAmount = value;
						savings = helpers.calculateSavings(calcValues, lamp);

						setTimeout(function() {
							animations.ledImpactHours.remove();
							animations.ledImpactStoryDelay.init(savings);
							setTimeout(function() {
								helpers.playSound(ajsounds.impact_intro);
							}, 1000);
						}, 500);
					}
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
			helpers.playSound(ajsounds.trees_counter);
			animations.ledImpactStory.counter.initTrees(savings);
		}, {
			passive: true
		});

	sceneElement
		.addEventListener('startTrees', function() {
			helpers.playSound(ajsounds.trees_intro);
			setTimeout(function() {
				animations.ledImpactStory.trees.animIn(savings);
			}, 6000);
		}, {
			passive: true
		});

	sceneElement
		.addEventListener('treesEnd', function() {
			setTimeout(function() {
				helpers.playSound(ajsounds.cars_counter);
				animations.ledImpactStory.cars.init();
				animations.ledImpactStory.counter.initCars(savings);
			}, 1000);
		}, {
			passive: true
		});


	sceneElement
		.addEventListener('startCars', function() {
			helpers.playSound(ajsounds.cars_intro);
			setTimeout(function() {
				animations.ledImpactStory.cars.animIn(savings);
			}, 3000);
		}, {
			passive: true
		});

	sceneElement
		.addEventListener('carsEnd', function() {
			helpers.playSound(ajsounds.cars_end);
			setTimeout(function() {
				helpers.playSound(ajsounds.trash_counter);
				animations.ledImpactStory.trash.init();
				animations.ledImpactStory.counter.initTrash(savings);
			}, 7000);
		}, {
			passive: true
		});

	sceneElement
		.addEventListener('startTrash', function() {
			helpers.playSound(ajsounds.trash_intro);
			setTimeout(function() {
				animations.ledImpactStory.trash.animIn(savings);
				setTimeout(function() {
					helpers.playSound(ajsounds.trash_lookup);
					setTimeout(function() {
						helpers.playSound(ajsounds.trash_end);
					}, 3000);
				}, 3000);
			}, 3000);
		}, {
			passive: true
		});

	sceneElement
		.addEventListener('trashEnd', function() {

		}, {
			passive: true
		});
}

assetsElement.addEventListener('loaded', function() {
	setTimeout(function() {
		intro.introduction();
	}, 500);
});
