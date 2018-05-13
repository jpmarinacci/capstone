/**
 * @authors: JP Marinacci
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */


define(['eLeap', 'jquery', 'underscore', 'backbone'],
function (eLeap, $, _, Backbone) { 'use strict';

	var thisUtils = undefined;
	
	eLeap.own.Utils = Backbone.View.extend({
		
		initialize: function () {
		},
		
		dateTimeToDisplay: function(dateTime) {
			var dateObj = new Date(dateTime);
			var dateDisplay = this.convertDateDisplay(dateObj);
			var timeDisplay = this.convertTimeDisplay(dateObj);
			return dateDisplay;
		},
		
		convertDateDisplay: function(dateObj) {
			return dateObj;
		},
		
		convertTimeDisplay: function(dateObj) {
			return dateObj;
		}
	});
	
	function singleton() {
		thisUtils = thisUtils || (eLeap.run.utils = new eLeap.own.Utils());
		return thisUtils;
	}
	return singleton();
});

