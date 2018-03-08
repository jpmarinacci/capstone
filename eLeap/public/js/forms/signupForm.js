/**
 * @author: JP Marinacci
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'controllers/user', 'controllers/notifications',
		'models/person', 'text!../../tmpl/forms/signupForm.tmpl'],
function (eLeap, $, _, Backbone, user, notifications, Person, signupFormTmpl) { 'use strict';
		
	eLeap.own.SignForm = Backbone.View.extend({
		
		formTmpl: _.template(signupFormTmpl),
		
		events: {
			'click .signupButton': 'createNewPerson'
		},
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.person = options.person || new Person();
			this.renderFramework();
		},
		
		renderFramework: function(){
			this.$el.html(this.formTmpl());
		},
		
		gatherInput: function() {
			var personJson = {
				email: this.$(".signupEmail").val(),
				personName: this.$(".signupName").val(),
				phone: this.$(".signupPhone").val(),
				roleId: Number(this.$(".signupRole").val())
			};
			/*var personJson = {
				email: "dude1@website.com",
				personName: "firstDude",
				phone: "555-555-5555",
				roleId: 1
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
