/** 
 * @author: JP Marinacci
 */

define(['jquery', 'underscore', 'backbone', 'eLeap', 'controllers/notifications', 'controllers/restServer', 'models/person'],
	function ($, _, Backbone, eLeap, notifications, server, Person) { 'use strict';
	
	var thisUser = undefined;
	
	eLeap.own.User = Backbone.Model.extend({
		
		isLoggedIn: false,
		logInStatusChecked: false,
		
		initialize: function(options) {
			options = options || {};
			this.person = new Person();
		},
		
		login: function () {
			var loginSuccess = function(response) {
				response = response || {};
				if(response.loginStatus === 'valid') {
	    			thisUser.person.set(response.person);
	    			thisUser.clientLogin();
				} else {
					thisUser.trigger('user:loginInvalid');
					notifications.notifyUser("login credentials are invalid, did you sign up?");
				}
			};
			var loginError = function(error) {
				var errorMessage = error ? error.message ? error.message : error : "unknown";
				notifications.notifyUser("There was an error: "+ errorMessage);
			};
			var options = {};
			server.postRoute('/login', {
				email: this.person.get('email'),
				credential: this.person.get('credential')
			}, loginSuccess, loginError, options);
		},
		
		clientLogin: function() {
			this.isLoggedIn = true;
			this.trigger('user:loggedIn');
		},
		
		clientLogout: function() {
			this.isLoggedIn = false;
			this.trigger('user:loggedOut');
		},
		
		logout: function() {
			this.clientLogout();
			var logoutSuccess = function(response) {
				response = response || {};
			};
			var logoutError = function(error) {
				var errorMessage = error ? error.message ? error.message : error : "unknown";
				notifications.notifyUser("There was an error: "+ errorMessage);
			};
			server.postRoute('/logout', {}, logoutSuccess, logoutError);
		},
		
		fetchPerson: function() {
			var options = {
				success: function(person) {
					console.log(person);
				},
				error: function(error) {}
			};
			this.person.fetch({}, options);
		},
		
		checkLoginState: function() {
			if(this.logInStatusChecked) {
				return this.isLoggedIn;
			} else {
				return 'pending';
			}
		},
		
		getLoginStatus: function() {
			var isLoggedInSuccess = function(response) {
				thisUser.logInStatusChecked = true;
				response = response || {};
				if(response.isLoggedIn && response.personId) {
					thisUser.person.set('personId', response.personId, {silent:true});
					thisUser.fetchPerson();
				}
				thisUser.isLoggedIn = response.isLoggedIn;
				thisUser.trigger('isLoggedInCheck:returned');
			};
			var loginError = function(error) {
				console.log(error);
			};
			var options = {};
			server.postRoute('/isUserLoggedIn', {}, isLoggedInSuccess, loginError, options);
		}
	});
	
	function getUser() {
		thisUser = thisUser || (eLeap.run.user = new eLeap.own.User());
		return thisUser;
	}
	return getUser();
});

