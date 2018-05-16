/**
 * @author: JP Marinacci
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['jquery', 'underscore', 'backbone', 'eLeap', 'controllers/user', 'controllers/cache', 'controllers/router', 'controllers/notifications',
		'models/person', 'text!../../tmpl/forms/signupForm.tmpl'],
function ( $, _, Backbone, eLeap, user, cache, router, notifications, Person, signupFormTmpl) { 'use strict';
		
	eLeap.own.SignForm = Backbone.View.extend({
		
		formTmpl: _.template(signupFormTmpl),
		
		events: {
			'click .signupButton': 'createNewPerson'
		},
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.person = options.person || new Person();
			this.renderFramework();
			this.listenForEvents();
			cache.fetchRoles();
		},
		
		renderFramework: function(){
			this.$el.html(this.formTmpl());
		},
		
		listenForEvents: function() {
			if(cache.roles) {
				this.listenTo(cache.roles, 'reset', this.renderRoles);
			}
		},
		
		renderRoles: function(roles) {
			//render roles
			var thisForm = this;
			cache.roles.each(function(role) {
				if(role.get("roleId") !== 7) {
					thisForm.$(".selectRoles").append("<option value='"+role.get("roleId")+"'>"+role.get("roleName")+"</option>");
				}
			});
		},
		
		gatherInput: function() {
			var email = this.$(".signupEmail").val();
			//validate inputs
			//if(validate.isValid(email));
			var personJson = {
				email: email,
				personName: this.$(".signupName").val(),
				phone: this.$(".signupPhone").val(),
				roleId: Number(this.$(".selectRoles").val()),
				password: this.$(".signupPassword").val()
			};
			this.person.set(personJson);
		},
		
		createNewPerson: function() {
			notifications.notifyUser("Person created");
			this.gatherInput();
			var options = {
				success: function(person) {
					user.person.set(person);
					notifications.notifyUser("Person created");
					router.lastRoute = '/dashboard';
					user.clientLogin();
				},
				error: function() {
					notifications.notifyUser("error -- Person creation failed");
				}
			};
			this.person.save({}, options);
		}
	});
	return eLeap.own.SignForm;
});
