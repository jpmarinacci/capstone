/**
 * @authors: JP Marinacci
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'utils', 'controllers/notifications', 'controllers/user',
		'models/collegeClass', 'collections/collegeClasses', 'collections/persons',
		'text!../../tmpl/pages/instructorSettingsPage.tmpl', 
		'text!../../tmpl/forms/classForm.tmpl', 'text!../../tmpl/items/student.tmpl'],
	function (eLeap, $, _, Backbone, utils, notifications, user, CollegeClass, CollegeClasses, Persons,
		pageTmpl, classFormTmpl, studentTmpl) { 'use strict';
	
	eLeap.own.InstructorSettingsPage = Backbone.View.extend({
		
		pageTmpl: _.template(pageTmpl),
		classFormTmpl: _.template(classFormTmpl),
		studentTmpl: _.template(studentTmpl),
		
		events: {
			'click .classFormSubmitBtn': 'commandSubmitClass',
			'change .classSelector': 'commandSelectClass',
			'click .addStudent': 'commandAddStudent',
			'click .submitStudent': 'commandSubmitStudent',
			'click .removeStudentBtn': 'commandRemoveStudent'
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
		
		fetchOwnedClasses: function() {
			if(user.person.classes.isFetched) {
				this.gotOwnedClasses();
			} else {
				user.person.classes.isFetchPending = true;
				user.person.classes.fetch({
					ownerId: user.person.get('personId'),
					reset: true,
					success: function() {
						user.person.classes.isFetched = true;
					},
					error: function(error) {
						console.log("oppForm - fetch classes error");
						console.log(error);
					}
				});
			}
		},
		
		getClasses: function() {
			user.person.classes = user.person.classes || new CollegeClasses();
			this.listenForClassesEvents();
			this.fetchOwnedClasses();
		},
		
		getStudents: function(collegeClass) {
			collegeClass.students = collegeClass.students || new Persons();
			if(collegeClass.students.isFetched) {
				this.renderStudents(collegeClass.students);
			} else if(!collegeClass.students.isFetchPending) {
				collegeClass.students.isFetchPending = true;
				var thisPage = this;
				collegeClass.students.fetch({
					classId: collegeClass.get('classId'),
					ownerId: user.person.get('personId'),
					success: function(response) {
						collegeClass.students.isFetched = true;
						collegeClass.students.isFetchPending = false;
						thisPage.renderStudents(collegeClass.students);
					},
					appError: function(response) {
						console.log("instructor settings - fetch students invalid: ");
						console.log(response);
					},
					error: function(error) {
						console.log("instructor settings - fetch students class error");
					},
					reset: true
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
		
		renderClassToForm: function(options) {
			options = options || {};
			if(options.collegeClass) {
				this.collegeClass =	options.collegeClass;
				this.$(".classNameInput").val(this.collegeClass.get('className'));
				this.$(".classTermInput").val(this.collegeClass.get('term'));
				this.$(".classSectionInput").val(this.collegeClass.get('section'));
				this.$(".classYearSelect").val(this.collegeClass.get('year'));
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
		
		renderStudents: function(students) {
			if(students && students.length) {
				this.$(".studentListSection").show();
				this.$(".studentsList").empty();
				var thisPage = this;
				students.each(function(student) {
					thisPage.renderStudent(student);
				});
			}
		},
		
		renderStudent: function(student) {
			this.$(".studentsList").append(this.studentTmpl({
				student: student
			}));
			/*if(student.get('personId')) {
				
				this.$(".studentsList").append("<li class='studentItem'>"+
				"<span class='studentEmail'>" + student.get('email') + "</span>" +
				"<span class=''><icon class='studentJoinedIcon fa fa-user-check'></span>" +
				"</li>");
			} else {
				this.$(".studentsList").append("<li class='studentItem'>"+
				"<span class='studentEmail'>" + student.get('email') + "</span></li>");
			}*/
		},
			
		commandSelectClass: function(event) {
			var options = {};
			this.$(".studentListSection").hide();
			this.$(".studentsList").empty();
			this.selectedClassId = Number(event.currentTarget.value);
			if(this.selectedClassId) {
				this.$(".studentsSection").show();
				options.collegeClass = user.person.classes.get(this.selectedClassId);
				this.getStudents(options.collegeClass);
			} else {
				this.$(".studentsSection").hide();
			}
			
			this.renderClassToForm(options);
		},
		
		gatherInput: function() {
			var classJson = {
				className: this.$(".classNameInput").val(),
				classType: this.$(".classTypeSelector").val(),
				term: this.$(".classTermInput").val(),
				section: this.$(".classSectionInput").val(),
				year: this.$(".classYearSelect").val(),
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
		},
		
		commandAddStudent: function() {
			this.newStudent = {};
			this.$(".studentInput").show();
		},
		
		commandSubmitStudent: function() {
			var emailInput = this.$(".studentEmailInput").val();
			if(utils.isValidEmail(emailInput)) {
				var selectedClass = user.person.classes.get(this.selectedClassId);
				var thisPage = this;
				selectedClass.addStudent({
					email: emailInput,
					classId: this.selectedClassId,
					ownerId: user.person.get('personId'),
					success: function(student) {
						selectedClass.students.add(student, {merge:true});
						thisPage.renderStudent(student);
					},
					appError: function(response) {
						response.message = response.message || response;
						notifications.notifyUser("student couldn't be added: " + response.message);
					},
					error: function(error) {
						notifications.notifyUser("an error occurred adding student");
						console.log(error);
					}
				});
				this.$(".studentEmailInput").attr('color','unset').empty();
			} else {
				this.$(".studentEmailInput").attr('color','red');
				notifications.notifyUser("email isn't valid");
			}
		},
		
		commandRemoveStudent: function(event) {
			var email = event.currentTarget.dataset.email;
			var selectedClass = user.person.classes.get(this.selectedClassId);
			var student = selectedClass.students.findWhere({'email': email});
			selectedClass.students.remove(student);
			var thisPage = this;
			student.destroy({
				success: function(response) {
					if(response) {
						console.log("student removed");
						thisPage.$(event.currentTarget.parent).remove();
					}
				},
				error: function() {
					notifications.notifyUser("an error occurred removing student");
					console.log(error);
				}
			});
			
		}
	});
	return eLeap.own.InstructorSettingsPage;
});

