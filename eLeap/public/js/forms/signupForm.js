/**
 * @author: JP Marinacci
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['jquery', 'underscore', 'backbone', 'eLeap', 'controllers/user', 'controllers/cache', 'controllers/notifications',
		'models/person', 'text!../../tmpl/forms/signupForm.tmpl'],
function ( $, _, Backbone, eLeap, user, cache, notifications, Person, signupFormTmpl) { 'use strict';
		
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
					thisForm.$(".selectRoles").append("<option value='"+role.get("roleIddb")+"'>"+role.get("roleName")+"</option>");
				}
			});
		},
		
		gatherInput: function() {
			var email = this.$(".signupEmail").val();
			//validate inputs
			//if(validate.isValid(email));
			//var Number(this.$(".selectRoles").val())
			var personJson = {
				email: email,
				personName: this.$(".signupName").val(),
				phone: this.$(".signupPhone").val(),
				roleId:1 
			};
			/*var personJson = {
				email: "kajayr@yahoo.com",
				personName: "Leo",
				phone: "425-444-0923",
				roleId: 2
			};*/
			this.person.set(personJson);
		},
		
		createNewPerson: function() {
			notifications.notifyUser("Person created");
			this.gatherInput();
			var options = {
				success: function() {
					notifications.notifyUser("Person created");
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
