/**
 * @authors: JP Marinacci, Belete Zegeye, Sunny Wu, Aren Kasner, Leo Sinanian
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'controllers/user', 'forms/signupForm'],
function (eLeap, $, _, Backbone, user, SignupForm) { 'use strict';
		
	eLeap.own.AccountSettingsPage = Backbone.View.extend({
		
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			
			this.person = user.person;
			this.signupForm = new SignupForm({
				el: this.$el,
				person: this.person
			});
			this.listenForEvents();
			this.renderPage();
		},
		
		listenForEvents: function() {
			this.stopListening();
			this.listenTo(this.person, 'sync change', this.renderPage);
		},
		
		renderPage: function() {
			this.$(".signupButton").text('Update');
			this.$(".signupEmail").val(this.person.get('email'));
			this.$(".signupName").val(this.person.get('personName'));
			this.$(".signupPhone").val(this.person.get('phone'));
		}
		
	});
	return eLeap.own.AccountSettingsPage;
});
