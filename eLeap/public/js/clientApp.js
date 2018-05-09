/**
 * @authors: JP Marinacci, Belete Zegeye, Sunny Wu, Aren Kasner, Leo Sinanian
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */


define(['eLeap', 'jquery', 'underscore', 'backbone', 'controllers/router', 'controllers/user'],
function (eLeap, $, _, Backbone, router, user) { 'use strict';
	
	eLeap.own.ClientApp = Backbone.View.extend({
		
		initialize: function () {
			//start the app
			Backbone.history.start({ pushState: true });
		},
		
		startApp: function(){

			//console.log(user.isUserLoggedIn());

			if(user.isUserLoggedIn()) {
				router.successfulLogin();
			} else {
				router.logout();
			};
		}
	});
	return eLeap.own.ClientApp;
});
