/**
 * @authors: JP Marinacci
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */


define(['eLeap', 'jquery', 'underscore', 'backbone'],
function (eLeap, $, _, Backbone) { 'use strict';

	var thisUtils = undefined;
	
	eLeap.own.Utils = Backbone.View.extend({
		
		initialize: function () {},
		
		dateTimeToDisplay: function(dateTime) {
			if(dateTime) {
				var dateObj = new Date(dateTime);
				var dateDisplay = this.formatDateDisplay(dateObj);
				var timeDisplay = this.formatTimeDisplay(dateObj);
				return dateDisplay + ', ' +  timeDisplay;
			}
		},
		
		formatDateDisplay: function(dateObj) {
			if(dateObj) {
				var monthNames = [
					"January", "February", "March",
					"April", "May", "June", "July",
					"August", "September", "October",
					"November", "December"
				];
				var day = dateObj.getDate();
				var monthIndex = dateObj.getMonth();
				var year = dateObj.getFullYear();
				
				return monthNames[monthIndex] + ' ' + day + ' ' + year;
			}
		},
		
		formatTimeDisplay: function(dateObj) {
			if(dateObj) {
				var hours = dateObj.getHours();
				var suffix = (hours >= 12) ? 'pm' : 'am';
				hours = ((hours + 11) % 12 + 1);
				var min = dateObj.getMinutes();
				var convertTime = hours + ':' + min + suffix;
				return convertTime;
			}
		}
	});
	
	function singleton() {
		thisUtils = thisUtils || (eLeap.run.utils = new eLeap.own.Utils());
		return thisUtils;
	}
	return singleton();
});

