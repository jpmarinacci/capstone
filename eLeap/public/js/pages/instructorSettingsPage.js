/**
 * @authors: JP Marinacci
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'controllers/notifications', 'controllers/user',
		'models/collegeClass', 'collections/collegeClasses', 
		'text!../../tmpl/pages/instructorSettingsPage.tmpl', 'text!../../tmpl/forms/classForm.tmpl'],
	function (eLeap, $, _, Backbone, notifications, user, CollegeClass, CollegeClasses, pageTmpl, classFormTmpl) { 'use strict';
	
	eLeap.own.InstructorSettingsPage = Backbone.View.extend({
		
		pageTmpl: _.template(pageTmpl),
		classFormTmpl: _.template(classFormTmpl),
		
		events: {
			'click .classFormSubmitBtn': 'commandSubmitClass',
			'change .classSelector': 'commandSelectClass',
			'change .yearInput': 'isYearInputValid',
		},
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.commandDispatcher = options.commandDispatcher;
			this.renderFramework();
			this.listenForUserEvents();
			if(user && user.person && user.person.get('roleId')) {
				this.decideIsInstructor();
			}
		},
		
		renderFramework: function(){
			this.$el.html(this.pageTmpl());
			this.$(".instructorClassForm").html(this.classFormTmpl());
		},

		renderClassToForm: function(options) {
			options = options || {};
			if(options.collegeClass) {
				this.collegeClass =	options.collegeClass;
				this.$(".classNameInput").val(this.collegeClass.get('className'));
				this.$(".termInput").val(this.collegeClass.get('term'));
				this.$(".sectionInput").val(this.collegeClass.get('section'));
				this.$(".yearInput").val(this.collegeClass.get('year'));
				this.$(".estimatedClassSizeInput").val(this.collegeClass.get('estimatedClassSize'));
				this.$(".courseSummaryInput").val(this.collegeClass.get('courseSummary'));
			} else {
				if(this.collegeClass && this.collegeClass.get('classId')) {
					this.collegeClass =	new CollegeClass();
				} else {
					this.collegeClass = this.collegeClass || new CollegeClass();
				}
				this.$(".instructorClassForm").html(this.classFormTmpl());
			}
		},
		
		listenForUserEvents: function() {
			if(user && user.person) {
				this.stopListening(user.person);
				this.listenTo(user.person, 'sync change', this.decideIsInstructor);
			}
		},
		
		listenForClassesEvents: function() {
			if(user.person.classes) {
				this.stopListening(user.person.classes);
				this.listenTo(user.person.classes, 'reset', this.gotOwnedClasses);
			}
		},
		
		fetchOwnedClasses: function() {
			user.person.classes.fetch({
				ownerId: user.person.get('personId'),
				reset: true
			});
		},
		
		getClasses: function() {
			user.person.classes = new CollegeClasses();
			this.listenForClassesEvents();
			this.fetchOwnedClasses();
		},
		
		decideIsInstructor: function() {
			//handles refresh situation
			if(user.person.get('roleId') === 5) {
				if(this.commandDispatcher) {
					this.commandDispatcher.trigger('show:instructor');
				}
				this.getClasses();
			} else {
				require(['controllers/router',], function(router) {
					router.navigate('/dashboard', {trigger: true});
				});
			}
		},
			
		gotOwnedClasses: function() {
			if(user.person.classes.length) {
				this.renderClasses();
			}
		},
		
		renderClasses: function() {
			var thisPage = this;
			user.person.classes.sort();
			user.person.classes.each(function(collegeClass) {
				thisPage.$(".classSelector").append(
					"<option value=" + collegeClass.get('classId') + ">" +
						collegeClass.get('className') + 
						(collegeClass.get('term') ? " - " + collegeClass.get('term') : "") + " " +
						(collegeClass.get('section') || "") +
					"</option>");
			});
		},
			
		commandSelectClass: function(event) {
			var options = {};
			var classId = Number(event.currentTarget.value);
			if(classId) {
				options.collegeClass = user.person.classes.get(classId);
			}
			this.renderClassToForm(options);
		},
		
		isYearInputValid: function(event) {
			var yearInput = event.yearInput || event.currentTarget.value; 
			if(yearInput) {
				yearInput = Number(yearInput);
				if(!Number.isInteger(yearInput)) {
					this.$(".yearInputWarning").text("year must be a number");
					return false;
				} else {
					this.$(".yearInputWarning").text("");
					return true;
				}
			}
			return true;
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
			if(!this.isYearInputValid({yearInput: this.$(".yearInput").val()})) {
				notifications.notifyUser("year must be a valid integer");
				return;
			}
			if(!this.collegeClass) {
				this.collegeClass = new CollegeClass();
			}
			this.gatherInput();
			var isNewClass = this.collegeClass.get('classId') ? false: true;
			var options = {
				success: function(response) {
					if(isNewClass) {
						notifications.notifyUser("class created");	
					} else {
						notifications.notifyUser("class updated");
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

