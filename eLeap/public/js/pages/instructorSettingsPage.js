/**
 * @authors: JP Marinacci
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'controllers/notifications', 'controllers/router', 'controllers/user',
	'models/collegeClass', 'text!../../tmpl/pages/instructorSettingsPage.tmpl', 'text!../../tmpl/forms/classForm.tmpl'],
function (eLeap, $, _, Backbone, notifications, router, user, CollegeClass, pageTmpl, classFormTmpl) { 'use strict';
		
	eLeap.own.InstructorSettingsPage = Backbone.View.extend({
		
		pageTmpl: _.template(pageTmpl),
		classFormTmpl: _.template(classFormTmpl),
		
		events: {
			'click .classFormSubmitBtn': 'commandSubmitClass'
		},
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.commandDispatcher = options.commandDispatcher;
			this.renderFramework();
			this.listenForEvents();
			if(user && user.person && user.person.get('roleId')) {
				this.decideIsInstructor();
			}
		},
		
		renderFramework: function(){
			this.$el.html(this.pageTmpl());
			this.renderClassForm();
		},
		
		renderClassForm: function(options) {
			options = options || {};
			this.collegeClass = options.collegeClass ? options.collegeClass : new CollegeClass();
			this.$(".instructorClassForm").html(this.classFormTmpl());
		},
		
		listenForEvents: function() {
			this.stopListening();
			if(user && user.person) {
				this.listenTo(user.person, 'sync change', this.decideIsInstructor);
			}
		},
		
		decideIsInstructor: function() {
			//handles refresh situation
			if(user.person.get('roleId') === 5) {
				if(this.commandDispatcher) {
					this.commandDispatcher.trigger('show:instructor');
				}
			} else {
				router.navigate('/dashboard', {trigger: true});
			}
		},
		
		gatherInput: function() {
			var classJson = {
				className: this.$(".classNameInput").val(),
				term: this.$(".termInput").val(),
				section: this.$(".sectionInput").val(),
				year: this.$(".yearInput").val(),
				estimatedClassSize: this.$(".estimatedClassSizeInput").val(),
				courseSummary: this.$(".courseSummaryInput").val()
			};
			this.collegeClass.set(classJson);
		},
		
		commandSubmitClass: function() {
			if(this.$(".classNameInput").val() === "") {
				notifications.notifyUser("class name is required");
				this.$(".classNameWarning").html("class name is required");
				return;
			}
			this.gatherInput();
			var thisPage = this;
			var options = {
				success: function(response) {
					if(thisPage.collegeClass && thisPage.collegeClass.get('classId')) {
						notifications.notifyUser("class updated");	
					} else {
						notifications.notifyUser("class created");	
					}
				},
				appError: function(response) {
					console.log("instructor settings - submit class error");
					console.log(response);
					notifications.notifyUser("error occurred submitting class");
				},
				error: function(error) {
					console.log("instructor settings - submit class error");
					console.log(error);
					notifications.notifyUser("error occurred submitting class");
				},
				wait: true,
				ownerId: user.person.get('personId')
			};
			this.collegeClass.save({}, options);
		}
	});
	return eLeap.own.InstructorSettingsPage;
});

