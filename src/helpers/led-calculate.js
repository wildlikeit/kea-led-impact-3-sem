'use strict';

/*global document*/

module.exports = function(values, subject){

  let savings = {};

  function yearlyEffect(values, subject) {
			return (values.daylightHours * subject.normal) / 1000;
	}

  function yearlyLedEffect(values, subject) {
			return (((values.daylightHours - values.dimmedHours) * (subject.ledNormal)) + (values.dimmedHours * subject.ledDimmed)) / 1000;
	}

  savings.yearlyEffect = yearlyEffect(values, subject).toFixed(0);
  savings.yearlyLedEffect = yearlyLedEffect(values, subject).toFixed(0);
  savings.yearlySavingsPerLamp = ((savings.yearlyEffect - savings.yearlyLedEffect)).toFixed(0);
  savings.yearlySavings = savings.yearlySavingsPerLamp * values.lampAmount;
  savings.yearlySavingsPercent = ((savings.yearlyEffect - savings.yearlyLedEffect) / savings.yearlyEffect * 100).toFixed(0);

	return savings;
};
