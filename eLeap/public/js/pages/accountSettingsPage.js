/**
 * @authors: JP Marinacci
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'controllers/user', 'collections/collegeClasses', 'forms/signupForm',
	'text!../../tmpl/pages/accountSettingsPage.tmpl', 'text!../../tmpl/items/collegeClassItem.tmpl'],
	function (eLeap, $, _, Backbone, user, CollegeClasses, SignupForm, pageTmpl, classItemTmpl) { 'use strict';
		
	eLeap.own.AccountSettingsPage = Backbone.View.extend({
		
		pageTmpl: _.template(pageTmpl),
		classItemTmpl: _.template(classItemTmpl),
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			
			this.renderFramework();
			
			this.signupForm = new SignupForm({
				el: this.$(".signupForm"),
				person: user.person
			});
			
			this.isStudent = user.person.get('roleId') === 2;
			if(user && user.person) {
				if(this.isStudent) {
					if(!user.person.classes) {
						user.person.classes = new CollegeClasses();
					}
				}
			}
			this.listenForEvents();
			if(this.isStudent) {
				user.fetchClasses({studentId: user.person.get('personId')} );
			}
		},
		
		renderFramework: function() {
			this.$el.html(this.pageTmpl());
			this.$(".signupButton").text('Update');
		},
		
		listenForEvents: function() {
			this.stopListening();
			this.listenTo(user.person, 'sync change', this.renderPage);
			if(user && user.person && user.person.classes) {
				this.listenTo(user.person.classes, 'reset', this.gotClasses);
			}
		},
		
		gotClasses: function() {
			this.renderClasses();
		},
		
		renderClasses: function() {
			this.$(".studentClasses").show();
			this.$(".studentClassList").empty();
			var thisPage = this;
			user.person.classes.each(function(collegClass) {
				thisPage.$(".studentClassList").append(thisPage.classItemTmpl({
					collegeClass: collegClass.toJSON()
				}));
			});
		},
		
		remove: function() {
			if(this.signupForm) {
				this.signupForm.remove();
			}
			this.$el.remove();
			this.stopListening();
			return this;
		}
	});
	return eLeap.own.AccountSettingsPage;
});

