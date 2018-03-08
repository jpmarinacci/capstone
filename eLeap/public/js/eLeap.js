/**
 * @authors: JP Marinacci
 */

var eLeap = eLeap || {};

define(['underscore', 'backbone'], function (_, Backbone) {
	'use strict';

	if (!eLeap.own && !eLeap.run) {
		eLeap.own = {};
		eLeap.run = {};
	}
	return eLeap;
});

if (typeof exports === 'undefined') {
	exports = eLeap;
}

