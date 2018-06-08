/** 
 * @author: JP Marinacci
 */

define(['jquery', 'underscore', 'backbone', 'eLeap'],
	function ($, _, Backbone, eLeap) { 'use strict';
	
	var thisNotifications = undefined;
	
	eLeap.own.Notifications = Backbone.View.extend({
		
		el: "#notificationsArea",
		
		events: {
			'click .closeNotifications': 'close'
		},
		
		initialize: function (options) {
			this.options = _.extend({}, options);
		},
		
		notifyUser: function(message, options) {
			options = options || {};
			options.displayTime = options.displayTime || 8000;
			options.fadeTime = options.fadeTime || 1000;
			
			this.$("#notificationMessage").html(message).show();
			
			setTimeout(function(){
				thisNotifications.fadeOutMessage(options.fadeTime);			
			}, options.displayTime);
			this.$("#notifications").css('display','inline-block');
		},
		
		fadeOutMessage: function(time) {
			this.$("#notifications").fadeOut(time);
		},
		
		close: function() {
			this.$("#notifications").css({'display': 'none'});
		}
	});
	
	function getNotifications() {
		thisNotifications = thisNotifications || (eLeap.run.notifications = new eLeap.own.Notifications());
		return thisNotifications;
	}
	return getNotifications();
});
