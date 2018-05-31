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
			this.listenForLoginEvents();
		},
		
		listenForLoginEvents: function() {
			this.listenToOnce(user, 'isLoggedInCheck:returned', this.routeAfterLoginCheck);
		},
		
		startApp: function() {
			user.getLoginStatus();
		},
		
		routeAfterLoginCheck: function() {
			if(user.isLoggedIn) {
				router.successfulLogin();
				if(router.pageToDeploy) {
					router.pageToDeploy.call(router);
				}
			} else {
				router.showLoggedOut();
			};
		}
	});
	return eLeap.own.ClientApp;
});

