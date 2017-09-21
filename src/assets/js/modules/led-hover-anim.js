'use strict';

var sky = document.querySelector('a-sky');
var ledText = document.querySelectorAll('.led-text');
var lampText = document.querySelectorAll('.lamp-text');
var ledEnterSkyAnim;
var ledLeaveSkyAnim;
var ledEnterTextAnim;
var ledLeaveTextAnim;
var ledAnimActive = false;

document.querySelector('#led-plane').addEventListener('mouseenter', function ledEnter (evnt) {
	this.emit('led-enter');

	ledEnterSkyAnim = document.createElement('a-animation');
	ledEnterSkyAnim.setAttribute('attribute', 'material.color');
	ledEnterSkyAnim.setAttribute('from', '#ffffff');
	ledEnterSkyAnim.setAttribute('to', '#000000');
	ledEnterSkyAnim.setAttribute('dur', '500');
	ledEnterSkyAnim.setAttribute('ease', 'ease-out');

	if (ledAnimActive){
		sky.removeChild(ledLeaveSkyAnim);
		ledAnimActive = true;
	}else{
		ledAnimActive = false;
	}

	for (var i = 0; i < ledText.length; i++) {
		ledEnterTextAnim = document.createElement('a-animation');
		ledEnterTextAnim.setAttribute('attribute', 'text.opacity');
		ledEnterTextAnim.setAttribute('from', '1');
		ledEnterTextAnim.setAttribute('to', '0');
		ledEnterTextAnim.setAttribute('dur', '500');
		ledEnterTextAnim.setAttribute('ease', 'ease-out');
		ledText[i].appendChild(ledEnterTextAnim);
	}

	for (var i = 0; i < lampText.length; i++) {
		ledEnterTextAnim = document.createElement('a-animation');
		ledEnterTextAnim.setAttribute('attribute', 'text.opacity');
		ledEnterTextAnim.setAttribute('from', '1');
		ledEnterTextAnim.setAttribute('to', '0');
		ledEnterTextAnim.setAttribute('dur', '500');
		ledEnterTextAnim.setAttribute('ease', 'ease-out');
		lampText[i].appendChild(ledEnterTextAnim);
	}

	sky.appendChild(ledEnterSkyAnim);
});

document.querySelector('#led-plane').addEventListener('mouseleave', function ledLeave (evnt) {
	this.emit('led-leave');
	ledLeaveSkyAnim = document.createElement('a-animation');
	ledLeaveSkyAnim.setAttribute('attribute', 'material.color');
	ledLeaveSkyAnim.setAttribute('from', '#000000');
	ledLeaveSkyAnim.setAttribute('to', '#ffffff');
	ledLeaveSkyAnim.setAttribute('dur', '500');
	ledLeaveSkyAnim.setAttribute('ease', 'ease-out');

	for (var i = 0; i < ledText.length; i++) {
		ledLeaveTextAnim = document.createElement('a-animation');
		ledLeaveTextAnim.setAttribute('attribute', 'text.opacity');
		ledLeaveTextAnim.setAttribute('from', '0');
		ledLeaveTextAnim.setAttribute('to', '1');
		ledLeaveTextAnim.setAttribute('dur', '500');
		ledLeaveTextAnim.setAttribute('ease', 'ease-out');
		// ledText[i].removeChild(ledEnterTextAnim);
		ledText[i].appendChild(ledLeaveTextAnim);
	}

	for (var i = 0; i < lampText.length; i++) {
		ledLeaveTextAnim = document.createElement('a-animation');
		ledLeaveTextAnim.setAttribute('attribute', 'text.opacity');
		ledLeaveTextAnim.setAttribute('from', '0');
		ledLeaveTextAnim.setAttribute('to', '1');
		ledLeaveTextAnim.setAttribute('dur', '500');
		ledLeaveTextAnim.setAttribute('ease', 'ease-out');
		// lampText[i].removeChild(ledEnterTextAnim);
		lampText[i].appendChild(ledLeaveTextAnim);
	}

	sky.removeChild(ledEnterSkyAnim);
	sky.appendChild(ledLeaveSkyAnim);
});
