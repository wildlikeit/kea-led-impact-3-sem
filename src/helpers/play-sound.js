'use strict';

/*global document*/

module.exports = function(sound) {
	if (activeSound) {
		source.stop(0);
	}
	getSoundData(sound);
	source.start(0);
	activeSound = true;
}

let audioCtx = new(window.AudioContext || window.webkitAudioContext)();
let source;
let activeSound;

function getSoundData(sound) {
	source = audioCtx.createBufferSource();
	let request = new XMLHttpRequest();
	request.open('GET', sound, true);
	request.responseType = 'arraybuffer';
	request.onload = function() {
		audioCtx.decodeAudioData(request.response, function(buffer) {
				source.buffer = buffer;
				source.connect(audioCtx.destination);
			},
			function(e) {
				console.log("Error with decoding audio data" + e.err);
			});
	}
	request.send();
}
