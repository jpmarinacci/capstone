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
			//thisController = this;
			var loginSuccess = function(response) {
				/*if(response) {
					
				}*/
				console.log(response);
				//thisController.person.set(response.person);
				//thisController.trigger('user:loggedIn');
			};
			var loginError = function(error) {
				
			};
			var options = {};
			server.postRoute('/login', {
				userEmail: this.person.get('email'),
				userPassword: this.person.get('password')
			}, loginSuccess, loginError, options);
			
			//this.getPerson();
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
		
		isLoggedInSuccess: function() {
			console.log("user.js isLoggedInSuccess BEFORE call:" + this.isLoggedIn);
            var thisController = this;
			var isLoggedInSuccess = function(response) {
				thisController.isLoggedIn = response.isLoggedIn;
				thisController.trigger('isLoggedInCheck:returned');
                console.log("user.js isLoggedInSuccess AFTER call:" + thisController.isLoggedIn);
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

