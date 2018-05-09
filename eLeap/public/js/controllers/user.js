/** 
 * @author: JP Marinacci
 */

define(['jquery', 'underscore', 'backbone', 'eLeap', 'controllers/restServer', 'models/person'],
	function ($, _, Backbone, eLeap, server, Person) { 'use strict';
	
	var thisUser = undefined;
	
	eLeap.own.User = Backbone.Model.extend({
		
		isLoggedIn: false,
		
		initialize: function(options) {
			options = options || {};
			this.person = new Person();
		},
		
		login: function () {
			var loginSuccess = function(response) {
				//console.log(response);
			};
			var loginError = function(error) {};
			var options = {};
			server.postRoute('/login', {}, loginSuccess, loginError, options);
			this.getPerson();
			this.clientLogin();
		},
		
		clientLogin: function() {
			this.isLoggedIn = true;
			this.trigger('user:loggedIn');
		},
		
		logout: function() {
			this.isLoggedIn = false;
		},
		
		getPerson: function() {
			this.listenToOnce(this.person, 'sync', this.gotPerson);
			var options = {
				success: function(person) {
					console.log(person);
				},
				error: function(error) {}
			};
			this.person.fetch({}, options);
		},
		
		isUserLoggedIn: function() {
			var thisController = this;
			var loginSuccess = function(response) {
				console.log("isLoggedIn:" +response.isLoggedIn);
				thisController.isLoggedIn = response.isLoggedIn;
			};
			var loginError = function(error) {
				console.log(error);
			};
			var options = {};
			server.postRoute('/isUserLoggedIn', {}, loginSuccess, loginError, options);
			
			//return this.isLoggedIn;
		}
	});
	
	function getUser() {
		thisUser = thisUser || (eLeap.run.user = new eLeap.own.User());
		return thisUser;
	}
	return getUser();
});

