/**
 * @authors: JP Marinacci
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */


define(['eLeap', 'jquery', 'underscore', 'backbone'],
function (eLeap, $, _, Backbone) { 'use strict';

	var thisUtils = undefined;
	var timeFormat;
	
	eLeap.own.Utils = Backbone.View.extend({
		
		initialize: function () {
		},
		
		dateTimeToDisplay: function(dateTime) {
			var dateObj = new Date(dateTime);
			//var dateDisplay = this.convertDateDisplay(dateObj);
			var dateDisplay = this.formatDate(dateObj);
			return dateDisplay;
		},

        formatDate: function (date) {
			var monthNames = [
				"January", "February", "March",
				"April", "May", "June", "July",
				"August", "September", "October",
				"November", "December"
			];

			var day = date.getDate();
			var monthIndex = date.getMonth();
			var year = date.getFullYear();
			var hour = date.getHours();
			var min = date.getMinutes();

			return monthNames[monthIndex] + ' ' + day + ' ' + year + ',' + hour + ':' + min;
    	},
		
		// convertDateDisplay: function(dateObj) {
		// 	return (dateObj);
		// },
		//
		// convertTimeDisplay: function(dateObj) {
		// 	return dateObj;
		// }
	});
	
	function singleton() {
		thisUtils = thisUtils || (eLeap.run.utils = new eLeap.own.Utils());
		return thisUtils;
	}
	return singleton();
});

