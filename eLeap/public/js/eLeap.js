/**
 * @authors: JP Marinacci
 */

//declaring the global variable
var eLeap = eLeap || {};


define(['underscore', 'backbone'], function (_, Backbone) { 'use strict';
	
	//Charlie Calvert style own/run for class definitions/instances
	if (!eLeap.own && !eLeap.run) {
		eLeap.own = {};
		eLeap.run = {};
	}
	return eLeap;
});

if (typeof exports === 'undefined') {
	exports = eLeap;
}
