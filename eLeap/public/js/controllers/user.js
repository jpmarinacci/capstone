/** 
 * @author: JP Marinacci
 */


define(['jquery', 'underscore', 'backbone', 'eLeap', 'controllers/restServer', 'models/person'],
	function ($, _, Backbone, eLeap, server, Person) { 'use strict';
	
	var thisUser = undefined;
	
	eLeap.own.User = Backbone.Model.extend({
		
		isLoggedIn: true,
		
		initialize: function(options) {
			options = options || {};
			this.person = new Person();
		},
		
		login: function () {
			this.loginGetPerson();
			this.isLoggedIn = true;
			this.trigger('user:loggedIn');
		},
		
		logout: function() {
			this.isLoggedIn = false;
		},
		
		loginGetPerson: function() {
			this.listenToOnce(this.person, 'sync', this.gotPerson);
			var options = {
				success: function(person) {
					console.log(person);
				},
				error: function(error) {
					//error out
				}
			};
			this.person.fetch({}, options);
		},
		
		isUserLoggedIn: function() {
			var loginSucces = function(personId) {
				thisUser.isLoggedIn = true;
				
				thisUser.listenToOnce(thisUser.person, 'sync', thisUser.gotPerson);
				thisUser.person.fetch();
				
			};
			var loginError = function(error) {
				
			};
			/*server.postRoute('/isUserLoggedIn', {}, loginSucces, loginError, options);*/
			
			//temp user login 
			//thisUser.trigger('user:loggedIn');
			
			return this.isLoggedIn;
		},
		
		gotPerson: function(person) {
			//thisUser.person.set(person.toJSON());
		}
	});
	
	function getUser() {
		thisUser = thisUser || (eLeap.run.user = new eLeap.own.User());
		return thisUser;
	}
	return getUser();
});


