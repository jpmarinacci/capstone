/**
 * @author: JP Marinacci
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'datetimepicker', 'utils', 'controllers/cache', 'controllers/user',
		'controllers/notifications', 'controllers/router','collections/collegeClasses', 'models/opportunity',
		'text!../../tmpl/forms/opportunityForm.tmpl'],
	function (eLeap, $, _, Backbone, datetimepicker, utils, cache, user, notifications, router, CollegeClasses, Opportunity, 
		 opportunityFormTmpl) { 'use strict';
		 
	eLeap.own.OpportunityForm = Backbone.View.extend({
		
		formTmpl: _.template(opportunityFormTmpl),
		
		events: {
			'change .oppFormTitle': 'commandChangeTitle',
			'dp.change .oppFormStartDateTime': 'commandChangeStartDateTime',
			'dp.change .oppFormEndDateTime': 'commandChangeEndDateTime',
			'dp.change .oppFormApplicationDueDate': 'commandChangeApplicationDueDate',
			'change .oppFormYear': 'commandChangeYear',
			'chage .oppFormDonation': 'commandChangeDonation',
			'change .oppFormClassSize': 'commandChangeClassSize',
			'change .oppFormHours': 'commandChangeHours',
			'change .oppFormMinReqPersons': 'commandChangeMinReqPersons',
			'change .oppFormNumTeams': 'commandChangeNumTeams',
			'change .oppFormPayAmount': 'commandChangePayAmount',
			'change .oppFormTeamSize': 'commandChangeTeamSize',
			'change .oppFormTotalSeats': 'commandChangeTotalSeats',
			
			'click .oppFormIsClass': 'toggleClassSection',
			'click .oppFormIsTeams': 'toggleTeamsSection',
			'click .oppFormOppType': 'toggleTypeSection',
			'click .saveOppBtn': 'commandSaveOpportunity',
			'click .deleteOppBtn': 'commandDeleteOpportunity'
		},
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.commandDispatcher = options.commandDispatcher;
			this.opportunity = options.opportunity || new Opportunity();
			this.editingOpp = new Opportunity(this.opportunity.toJSON());
			this.editingOpp.set({
				applicationDueDate: this.opportunity.get('applicationDueDate') ? new Date(this.opportunity.get('applicationDueDate')) : null,
				createDate: this.opportunity.get('createDate') ? new Date(this.opportunity.get('createDate')) : null,
				endDateTime: this.opportunity.get('endDateTime') ? new Date(this.opportunity.get('endDateTime')) : null,
				lastModified: this.opportunity.get('lastModified') ? new Date(this.opportunity.get('lastModified')) : null,
				startDateTime: this.opportunity.get('startDateTime') ? new Date(this.opportunity.get('startDateTime')) : null,
				timePeriodEndDate: this.opportunity.get('timePeriodEndDate') ? new Date(this.opportunity.get('timePeriodEndDate')) : null,
				timePeriodStartDate: this.opportunity.get('timePeriodEndDate') ? new Date(this.opportunity.get('timePeriodEndDate')) : null
			});
			
			this.renderFramework();
			if(options.opportunity) {
				this.renderOpportunityToForm();
			}
			if(user.person.get('roleId') === 5) {
				this.getClasses();
			}
		},
		
		renderFramework: function(){
			this.$el.html(this.formTmpl());
			var roleId = user.person.get('roleId'); 
			if(roleId === 5 || roleId === 7) {
				this.$(".oppFormClassSection").show();
				this.$(".oppFormIsClassCheckboxSection").show();
			} else {
				this.$(".oppFormClassSection").hide();
				this.$(".oppFormNonClassSection").show();
				this.$(".oppFormIsClass").prop('checked', false).attr('checked', false);
				this.$(".oppFormIsClassCheckboxSection").hide();
			}
			
			this.$(".oppFormStartDateTime").datetimepicker({
				 icons: {
                    time: "fa fa-clock",
                    date: "fa fa-calendar",
                    up: "fa fa-arrow-up",
                    down: "fa fa-arrow-down",
                    previous: "glyphicon glyphicon-chevron-left",
                    next: "glyphicon glyphicon-chevron-right"
                }
			});
			
			this.$(".oppFormEndDateTime").datetimepicker({
				 icons: {
                    time: "fa fa-clock",
                    date: "fa fa-calendar",
                    up: "fa fa-arrow-up",
                    down: "fa fa-arrow-down",
                    previous: "glyphicon glyphicon-chevron-left",
                    next: "glyphicon glyphicon-chevron-right"
                }
			});
			this.$(".oppFormApplicationDueDate").datetimepicker({
				 icons: {
                    time: "fa fa-clock",
                    date: "fa fa-calendar",
                    up: "fa fa-arrow-up",
                    down: "fa fa-arrow-down",
                    previous: "glyphicon glyphicon-chevron-left",
                    next: "glyphicon glyphicon-chevron-right"
                }
			});
		},
		
		listenForClassesEvents: function() {
			if(user.person.classes) {
				this.stopListening(user.person.classes);
				this.listenTo(user.person.classes, 'reset', this.gotOwnedClasses);
			}
		},

		getClasses: function() {
			user.person.classes = user.person.classes || new CollegeClasses();
			this.listenForClassesEvents();
			if(user.person.classes.isFetched) {
				this.gotOwnedClasses();
			} else {
				user.fetchClasses({ownerId: user.person.get('personId')});
			}
		},
				
		gotOwnedClasses: function() {
			if(user.person.classes.length) {
				this.renderClasses();
			}
		},
		
		renderClasses: function() {
			this.$(".oppFormClassSelector").empty();
			var thisForm = this;
			user.person.classes.sort().each(function(collegeClass) {
				thisForm.$(".oppFormClassSelector").append(
					"<option value=" + collegeClass.get('classId') + ">" +
						collegeClass.get('className') + 
						(collegeClass.get('term') ? " - " + collegeClass.get('term') : "") + " " +
						(collegeClass.get('section') || "") +
					"</option>");
			});
		},
		
		toggleClassSection: function() {
			this.$(".oppFormClassSection").toggle();
			this.$(".oppFormNonClassSection").toggle();
		},
		
		toggleTeamsSection: function() {
			this.$(".oppFormTeamsSection").toggle();
		},
		
		toggleTypeSection: function(event, options) {
			options = options || {};
			var type = options.type || event.currentTarget.value;
			this.$(".oppTypeSection").hide();
			
			switch(type) {
				case 'service':
					this.$(".oppFormServiceSection").show();
					break;
				case 'volunteer':
					this.$(".oppFormVolunteerSection").show();
					break;
				case 'project':
					this.$(".oppFormProjectSection").show();
					break;
				case 'gig':
					this.$(".oppFormGigDeliverableSharedSection").show();
					break;
				case 'deliverable':
					this.$(".oppFormDeliverableSection").show();
					this.$(".oppFormGigDeliverableSharedSection").show();
					break;
				case 'other':
					this.$(".oppFormOtherSection").show();
					this.$(".oppFormGigDeliverableSharedSection .oppFormTextInput").val("");
					break;
				default:
					break;
			}
		},
		
		isRequired: function(stringInput) {
			if(stringInput !== "") {
				return true;
			} else {
				return false;
			}
		},
		
		isValidIntegerInput: function(intInput) {
			var intToCheck = Number(intInput);
			if(Number.isInteger(intToCheck)) {
				return true;
			} else {
				return false;
			}
		},
		
		commandChangeTitle: function(event) {
			var inputValue = this.$(".oppFormTitle").val();
			if(this.isRequired(inputValue)) {
				this.$(".oppFormTitleWarning").empty();
				return;
			} else {
				this.$(".oppFormTitleWarning").html("title is required");
				return;
			}
		},
		
		commandChangeStartDateTime: function() {
			this.isStartDatePicked = true;
			this.$(".oppFormStartDateTimeWarning").empty();
		},
		
		commandChangeEndDateTime: function() {
			this.isEndDatePicked = true;
			this.$(".oppFormEndDateTimeWarning").empty();
		},
		
		commandChangeApplicationDueDate: function() {
			this.isAppDueDatePicked = true;
		},
		
		commandChangeYear: function(event) {
			var inputValue = this.$(".oppFormYear").val();
			if(inputValue) {
				if(inputValue && this.isValidIntegerInput(inputValue)) {
					this.$(".oppFormYearWarning").empty();
					return;
				} else {
					this.$(".oppFormYearWarning").html("year must be a valid integer");
					return;
				}
			}
			return;
		},
		
		commandChangeDonation: function() {
			var inputValue = this.$(".oppFormDonation").val();
			if(inputValue) {
				if(inputValue && this.isValidIntegerInput(inputValue)) {
					this.$(".oppFormDonationWarning").empty();
					return;
				} else {
					this.$(".oppFormDonationWarning").html("donation must be a valid integer");
					return;
				}
			}
			return;
		},
		
		commandChangeClassSize: function(event) {
			var inputValue = this.$(".oppFormClassSize").val();
			if(inputValue) {
				if(inputValue && this.isValidIntegerInput(inputValue)) {
					this.$(".oppFormClassSizeWarning").empty();
					return;
				} else {
					this.$(".oppFormClassSizeWarning").html("class size must be a valid integer");
					return;
				}
			}
			return;
		},
		
		commandChangeHours: function(event) {
			var inputValue = this.$(".oppFormHours").val();
			if(inputValue) {
				if(inputValue && this.isValidIntegerInput(inputValue)) {
					this.$(".oppFormHoursWarning").empty();
					return;
				} else {
					this.$(".oppFormHoursWarning").html("hours must be a valid integer");
					return;
				}
			}
			return;
		},
				
		commandChangeMinReqPersons: function() {
			var inputValue = this.$(".oppFormMinReqPersons").val();
			if(inputValue) {
				if(inputValue && this.isValidIntegerInput(inputValue)) {
					this.$(".oppFormMinReqPersonsWarning").empty();
					return;
				} else {
					this.$(".oppFormMinReqPersonsWarning").html("minimum persons required must be a valid integer");
					return;
				}
			}
			return;
		},
		
		commandChangeNumTeams: function() {
			var inputValue = this.$(".oppFormNumTeams").val();
			if(inputValue) {
				if(inputValue && this.isValidIntegerInput(inputValue)) {
					this.$(".oppFormNumTeamsWarning").empty();
					return;
				} else {
					this.$(".oppFormNumTeamsWarning").html("number of teams must be a valid integer");
					return;
				}
			}
			return;
		},
		
		commandChangePayAmount: function() {
			var inputValue = this.$(".oppFormPayAmount").val();
			if(inputValue) {
				if(inputValue && this.isValidIntegerInput(inputValue)) {
					this.$(".oppFormPayAmountWarning").empty();
					return;
				} else {
					this.$(".oppFormPayAmountWarning").html("pay amount must be a valid integer");
					return;
				}
			}
			return;
		},
		
		commandChangeTeamSize: function() {
			var inputValue = this.$(".oppFormTeamSize").val();
			if(inputValue) {
				if(inputValue && this.isValidIntegerInput(inputValue)) {
					this.$(".oppFormTeamSizeWarning").empty();
					return;
				} else {
					this.$(".oppFormTeamSizeWarning").html("team size must be a valid integer");
					return;
				}
			}
			return;
		},
		
		commandChangeTotalSeats: function(event) {
			var inputValue = this.$(".oppFormTotalSeats").val();
			if(inputValue) {
				if(inputValue && this.isValidIntegerInput(inputValue)) {
					this.$(".oppFormTotalSeatsWarning").empty();
					return;
				} else {
					this.$(".oppFormTotalSeatsWarning").html("total seats must be a valid integer");
					return;
				}
			}
			return;
		},
		
		renderOpportunityToForm: function() {
			this.toggleTypeSection({}, {"type": (this.opportunity.get('opportunityType') || "service")});
			this.$(".oppFormAgencyCommitment").val(this.opportunity.get('agencyCommitment'));
			this.$(".oppFormApplicationDueDate").val(utils.dateTimeToDisplay(this.opportunity.get('applicationDueDate')));
			this.$(".oppFormClassName").val(this.opportunity.get('className'));
			this.$(".oppFormCourseSummary").val(this.opportunity.get('courseSummary'));
			if(this.opportunity.get('opportunityType') === 'deliverable') {
				this.$(".oppFormDeliverables").val(this.opportunity.get('deliverables'));
			} else {
				this.$(".oppFormProjectDeliverables").val(this.opportunity.get('deliverables'));
			}
			this.$(".oppFormDescription").val(this.opportunity.get('description'));
			this.$(".oppFormDonation").val(this.opportunity.get('donation'));
			this.$(".oppFormEndDateTime").val(utils.dateTimeToDisplay(this.opportunity.get('endDateTime')));
			this.$(".oppFormEndDateTime").datetimepicker({
			    date: this.opportunity.get('endDateTime')
			});
			this.$(".oppFormExamples").val(this.opportunity.get('examples'));
			this.$(".oppFormHours").val(this.opportunity.get('hoursRequired'));
			if(this.opportunity.get('isClass')) {
				this.$(".oppFormIsClass").attr("checked", "checked");
			}
			if(this.opportunity.get('isRequiredForClass')) {
				this.$(".oppFormIsRequiredForClass").attr("checked", "checked");
			}
			if(this.opportunity.get('isPaid')) {
				this.$(".oppFormIsPaid").attr("checked", "checked");
			}
			if(this.opportunity.get('isTeams')) {
				this.$(".oppFormIsTeams").attr("checked", "checked");
			}
			if(this.opportunity.get('isVirtual')) {
				this.$(".oppFormIsVirtual").attr("checked", "checked");
			}
			this.$(".oppFormAddress").val(this.opportunity.get('location'));
			this.$(".oppFormMinReqPersons").val(this.opportunity.get('minimumPersonsRequired'));
			this.$(".oppFormNotAllowed").val(this.opportunity.get('notAllowed'));
			this.$(".oppFormNumTeams").val(this.opportunity.get('numTeams'));
			this.$(".oppFormOnboarding").val(this.opportunity.get('onBoarding'));
			this.$(".oppFormPayAmount").val(this.opportunity.get('payAmount'));
			var prefAgencyType = this.opportunity.get('preferredAgencyType');
			if(prefAgencyType) {
				if(this.opportunity.get('type') === 'service') {
					this.$(".oppFormPrefAgencyType").val(prefAgencyType);
				} else if(this.opportunity.get('type') === 'project') {
					this.$(".oppFormAgencyType").val(prefAgencyType);
				}
			}
			this.$(".oppFormPrefServiceWork").val(this.opportunity.get('preferredServiceWorkType'));
			this.$(".oppFormRequirements").val(this.opportunity.get('requirements'));
			this.$(".oppFormStartDateTime").val(utils.dateTimeToDisplay(this.opportunity.get('startDateTime')));
			this.$(".oppFormStartDateTime").datetimepicker({
			    date: this.opportunity.get('startDateTime')
			});
		    this.$(".oppFormGivenSupport").val(this.opportunity.get('supportDescription'));
			this.$(".oppFormSupportPref").val(this.opportunity.get('supportPreference'));
			this.$(".oppFormTeamSize").val(this.opportunity.get('teamSize'));
			this.$(".oppFormTitle").val(this.opportunity.get('title'));
			this.$(".oppFormTotalSeats").val(this.opportunity.get('totalSeats'));
			
			if(user.person.get('roleId')=== 7 || this.opportunity.get('ownerId') === user.person.get('personId')) {
				this.$(".deleteOppBtn").show();	
			}
			this.$(".oppFormHeader").text("Edit Opportunity");
			//render classId to selector
		},
		
		gatherInput: function() {
			var startDateTime, endDateTime, applicationDueDate;
			if(this.isStartDatePicked) {
				startDateTime = new Date(this.$(".oppFormStartDateTime").val());	
			}
			if(this.isEndDatePicked) {
				endDateTime = new Date(this.$(".oppFormEndDateTime").val());	
			}
			if(this.isAppDueDatePicked) {
				applicationDueDate = new Date(this.$(".oppFormApplicationDueDate").val());
			}
			var isClass = this.$(".oppFormIsClass:checked").val() ? true: false;
			var oppType = this.$(".oppFormOppType[name='oppFormOppType']:checked").val();
			var oppJson = {
				applicationDueDate: applicationDueDate ? applicationDueDate : this.editingOpp.get('applicationDueDate'),
				courseSummary: this.$(".oppFormCourseSummary").val(),
				deliverables: this.$(".oppFormDeliverables").val(),
				description: this.$(".oppFormDescription").val(),
				endDateTime: endDateTime ? endDateTime : this.editingOpp.get('endDateTime'),
				hoursRequired: this.$(".oppFormHours").val(),
				isClass: isClass,
				isRequiredForClass: this.$(".oppFormIsRequiredForClass:checked").val() ? true: false,
				isServiceLearning: oppType === 'service' ? true: false,
				isTeams: this.$(".oppFormIsTeams:checked").val() ? true: false,
				location: this.$(".oppFormAddress").val(),
				minimumPersonsRequired: Number(this.$(".oppFormMinReqPersons").val()),
				numTeams: this.$(".oppFormNumTeams").val(),
				onBoarding: this.$(".oppFormOnboarding").val(),
				opportunityType: oppType,
				ownerId: user.person.get('personId'),
				startDateTime: startDateTime ? startDateTime : this.editingOpp.get('startDateTime'),
				supportPreference: this.$(".oppFormSupportPref").val(),
				teamSize: this.$(".oppFormTeamSize").val(),
				title: this.$(".oppFormTitle").val(),
				totalSeats: Number(this.$(".oppFormTotalSeats").val())
			};
			if(isClass) {
				oppJson.classId = Number(this.$(".oppFormClassSelector").val());
				oppJson.status = 'for class';
			} 
			switch(oppType) {
				case 'project':
					oppJson.deliverables = this.$(".oppFormProjectDeliverables").val();
					oppJson.notAllowed = this.$(".oppFormNotAllowed").val();
					oppJson.agencyCommitment = this.$(".oppFormAgencyCommitment").val();
					oppJson.preferredAgencyType = this.$(".oppFormAgencyType").val();
					break;
				case 'service':
					oppJson.preferredAgencyType = this.$(".oppFormPrefAgencyType").val();
					oppJson.preferredServiceWorkType = this.$(".oppFormPrefServiceWork").val();
					break;
				case 'volunteer':
					oppJson.donation = Number(this.$(".oppFormDonation").val());
					break;
				case 'gig':
					oppJson.isPaid = this.$(".oppFormIsPaid:checked").val() ? true: false,
					oppJson.payAmount = Number(this.$(".oppFormPayAmount").val());
					break;
				case 'deliverable':
					oppJson.deliverables =  this.$(".oppFormDeliverables").val();
					oppJson.isVirtual = this.$(".oppFormIsVirtual:checked").val() ? true: false;
					oppJson.supportDescription = this.$(".oppFormGivenSupport").val();
					oppJson.requirements = this.$(".oppFormRequirements").val();
					oppJson.isPaid = this.$(".oppFormIsPaid:checked").val() ? true: false,
					oppJson.payAmount = Number(this.$(".oppFormPayAmount").val());
					break;
				case 'other':
					oppJson.examples = this.$(".oppFormExamples").val();
					break;
				default:
					break;
			}
			this.editingOpp.set(oppJson);
		},
		
		renderResults: function(opportunity) {
			/* used for early stage development*/
			var thisForm = this;
			this.$(".oppFormResults").show();
			this.$(".oppFormResults .resultsList").empty();
			_.each(opportunity.attributes, function(item, index, items) {
				thisForm.$(".oppFormResults .resultsList").append("<li>"+index+": "+ item +"</li>");
			});
			
			setTimeout(function() {
				thisForm.$(".oppFormResults").fadeOut(1000);			
			}, 10000);
		},
		
		commandSaveOpportunity: function() {
			this.gatherInput();
			var thisForm = this;
			var options = {
				success: function(opportunity) {
					var message;
					if(thisForm.options.opportunity) {
						message = "opportunity updated";
					} else {
						message = "opportunity created";
					}
					notifications.notifyUser(message);
					
					if(!thisForm.options.opportunity && opportunity && opportunity.get('opportunityId')) {
						thisForm.commandDispatcher.trigger('show:owned');
						router.navigate('opportunity/'+ opportunity.get('opportunityId'), {trigger: true});	
					}
					/* used for early stage development*/
					//thisForm.renderResults(thisForm.opportunity);
				},
				error: function(error) {
					notifications.notifyUser("error -- opportunity creation failed: "+ error);
				},
				wait: true
			};
			if(!this.editingOpp.get('title')) {
				this.$(".oppFormTitleWarning").html("title is required");
				notifications.notifyUser("title is required");
				return;
			}
			if(!this.editingOpp.get('startDateTime')) {
				notifications.notifyUser("start date is required");
				this.$(".oppFormStartDateTimeWarning").html("start date is required");
				return;
			}
			if(!this.editingOpp.get('endDateTime')) {
				notifications.notifyUser("end date is required");
				this.$(".oppFormEndDateTimeWarning").html("end date is required");
				return;
			}
			if(this.editingOpp.get('startDateTime') > this.editingOpp.get('endDateTime')) {
				notifications.notifyUser("start date must be before end date (unless you want to start after it's over)");
				this.$(".oppFormStartDateTimeWarning").html("start date must be before end date");
				return;
			}
			this.opportunity.save(this.editingOpp.toJSON(), options);
		},
		
		commandDeleteOpportunity: function() {
			var thisForm = this;
			var title = this.opportunity.get('title');
			require(['bootbox'], function(bootbox) {
				bootbox.confirm({
				    //title: "Remove student from class",
				    message: "delete "+title+"?",
				    buttons: {
				        cancel: {
				            label: '<i class="fa fa-times"></i> Cancel'
				        },
				        confirm: {
				            label: '<i class="fa fa-check"></i> Confirm'
				        }
				    },
				    callback: function (result) {
				    	if(result) {
					       var options = {
					        	success: function(opportunity) {
									notifications.notifyUser("opportunity deleted");
									router.navigate('/dashboard', {trigger: true});
								},
								error: function(error) {
									notifications.notifyUser("error -- opportunity deletion failed: "+ error);
								}
							};
							thisForm.opportunity.destroy(options);
						}
				    }
				});
			});
		}
	});
	return eLeap.own.OpportunityForm;
});

