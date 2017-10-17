'use strict';

module.exports = [
  {
    'parent': selectors.assets,
  	'elementType': 'a-mixin',
  	'properties': {
        'id': 'lampInfoTextMixin',
    		'color': '#ffffff',
    		'align': 'left',
    		'baseline': 'bottom',
    		'line-height': '60',
    		'scale': '3 3 0',
    		'rotation': '0 15 0',
    },
  },
  {
    'parent': selectors.assets,
  	'elementType': 'a-mixin',
  	'properties': {
      'id': 'ledTextMixin',
      'color': '#ffffff',
      'align': 'center',
      'baseline': 'bottom',
      'line-height': '80',
      'scale': '6 6',
      'rotation': '0 -15 0',
    },
  },
  {
    'parent': selectors.scene,
  	'elementType': 'a-entity',
  	'properties': {
      'id': 'lamp',
    },
  },
  {
    'parent': selectors.scene,
  	'elementType': 'a-entity',
  	'properties': {
      'id': 'lamp',
    },
  },
  {
    'parent': selectors.scene,
  	'elementType': 'a-plane',
  	'properties': {
      'id': 'lampInfo-plane',
  		'position': '-22 5.7 -12',
  		'rotation': '0 15 0',
  		'color': '#0054a6',
  		'width': '19',
  		'height': '9',
    },
  },
  {
    'parent': selectors.scene,
  	'elementType': 'a-entity',
  	'properties': {
      'id': 'lamp',
    },
  },
}];
