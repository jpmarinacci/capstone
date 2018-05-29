/**
 * @author: JP Marinacci
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'datetimepicker', 'utils', 'controllers/cache', 'controllers/user',
		'controllers/notifications', 'controllers/router', 'models/opportunity', 'text!../../tmpl/forms/opportunityForm.tmpl'],
	function (eLeap, $, _, Backbone, datetimepicker, utils, cache, user, notifications, router, Opportunity, opportunityFormTmpl) { 'use strict';
		
	eLeap.own.OpportunityForm = Backbone.View.extend({
		
		formTmpl: _.template(opportunityFormTmpl),
		
		events: {
			'change .oppFormTitle': 'commandChangedTitle',
			'dp.change .oppFormStartDateTime': 'commandChangeStartDateTime',
			'dp.change .oppFormEndDateTime': 'commandChangeEndDateTime',
			'change .oppFormYear': 'commandChangedYear',
			'chage .oppFormDonation': 'commandChangedDonation',
			'change .oppFormClassSize': 'commandChangedClassSize',
			'change .oppFormHours': 'commandChangedHours',
			'change .oppFormMinReqPersons': 'commandChangedMinReqPersons',
			'change .oppFormNumTeams': 'commandChangedNumTeams',
			'change .oppFormPayAmount': 'commandChangedPayAmount',
			'change .oppFormTeamSize': 'commandChangedTeamSize',
			'change .oppFormTotalSeats': 'commandChangedTotalSeats',
			
			'click .oppFormIsClass': 'toggleClassSection',
			'click .oppFormOppType': 'toggleTypeSection',
			'click .saveOpportunity': 'commandSaveOpportunity',
			'click .deleteOpportunity': 'commandDeleteOpportunity'
		},
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.opportunity = options.opportunity || new Opportunity();
			this.renderFramework();
			if(options.opportunity) {
				this.renderOpportunityToForm();
			}
		},
		
		renderFramework: function(){
			this.$el.html(this.formTmpl({
				opportunity: this.opportunity
			}));
			this.$(".oppFormStartDateTime").datetimepicker({
				 icons: {
                    time: "fa fa-clock",
                    date: "fa fa-calendar",
                    up: "fa fa-arrow-up",
                    down: "fa fa-arrow-down",
                    previous: "glyphicon glyphicon-chevron-left",
                    next: "glyphicon glyphicon-chevron-right"
                    /*previous: "fa fa-angle-left",
                    next: "fa fa-angle-right",
                    time: 'glyphicon glyphicon-time',
		            date: 'glyphicon glyphicon-calendar',
		            up: 'glyphicon glyphicon-chevron-up',
		            down: 'glyphicon glyphicon-chevron-down',
		            previous: 'glyphicon glyphicon-chevron-left',
		            next: 'glyphicon glyphicon-chevron-right',
		            today: 'glyphicon glyphicon-screenshot',
		            clear: 'glyphicon glyphicon-trash',
		            close: 'glyphicon glyphicon-remove'*/
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
		
		toggleClassSection: function() {
			this.$(".oppFormClassSection").toggle();
			this.$(".oppFormNonClassSection").toggle();
		},
		
		toggleTypeSection: function(event, options) {
			options = options || {};
			var type = options.type || event.currentTarget.value;
			this.$(".oppTypeSection").hide();
			
			this.$(".oppFormServiceSection .oppFormTextInput, .oppFormVolunteerSection .oppFormTextInput").val("").text("");
			this.$(".oppFormProjectSection .oppFormTextInput, .oppFormOtherSection .oppFormTextInput").val("").text("");
			this.$(".oppFormGigSection .oppFormTextInput, .oppFormDeliverableSection .oppFormTextInput").val("").text("");
			switch(type) {
				case 'service':
					this.$(".oppFormServiceSection").show();
					this.$(".oppFormHoursSharedSection").show();
					this.$(".oppFormGigDeliverableSharedSection .oppFormTextInput").val("").text("");
					break;
				case 'volunteer':
					this.$(".oppFormVolunteerSection").show();
					this.$(".oppFormGigDeliverableSharedSection .oppFormTextInput").val("").text("");
					break;
				case 'project':
					this.$(".oppFormProjectSection").show();
					this.$(".oppFormGigDeliverableSharedSection .oppFormTextInput").val("").text("");
					break;
				case 'gig':
					this.$(".oppFormGigSection").show();
					this.$(".oppFormHoursSharedSection").show();
					this.$(".oppFormGigDeliverableSharedSection").show();
					break;
				case 'deliverable':
					this.$(".oppFormDeliverableSection").show();
					this.$(".oppFormHoursSharedSection").show();
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
		
		commandChangedTitle: function(event) {
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
			this.$(".oppFormStartDateTimeWarning").empty();
		},
		
		commandChangeEndDateTime: function() {
			this.$(".oppFormEndDateTimeWarning").empty();
		},
		
		commandChangedYear: function(event) {
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
		
		commandChangedDonation: function() {
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
		
		commandChangedClassSize: function(event) {
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
		
		commandChangedHours: function(event) {
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
				
		commandChangedMinReqPersons: function() {
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
		
		commandChangedNumTeams: function() {
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
		
		commandChangedPayAmount: function() {
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
		
		commandChangedTeamSize: function() {
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
		
		commandChangedTotalSeats: function(event) {
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
			//classId
			this.$(".oppFormClassType").val(this.opportunity.get('classType'));
			this.$(".oppFormYear").val(this.opportunity.get('classYear'));
			this.$(".oppFormClassName").val(this.opportunity.get('className'));
			this.$(".oppFormCourseSummary").val(this.opportunity.get('courseSummary'));
			this.$(".oppFormDeliverables").val(this.opportunity.get('deliverables'));
			this.$(".oppFormDescription").val(this.opportunity.get('description'));
			this.$(".oppFormDonation").val(this.opportunity.get('donation'));
			//duration
			this.$(".oppFormEndDateTime").val(utils.dateTimeToDisplay(this.opportunity.get('endDateTime')));
			this.$(".oppFormEndDateTime").datetimepicker({
			    date: this.opportunity.get('endDateTime')
			});
			this.$(".oppFormClassSize").val(this.opportunity.get('estimatedClassSize'));
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
			//latitude
			this.$(".oppFormAddress").val(this.opportunity.get('location'));
			//longitude
			this.$(".oppFormMinReqPersons").val(this.opportunity.get('minimumPersonsRequired'));
			this.$(".oppFormNotAllowed").val(this.opportunity.get('notAllowed'));
			//notes
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
			//recurrence
			this.$(".oppFormRequirements").val(this.opportunity.get('requirements'));
			this.$(".oppFormStartDateTime").val(utils.dateTimeToDisplay(this.opportunity.get('startDateTime')));
			this.$(".oppFormStartDateTime").datetimepicker({
			    date: this.opportunity.get('startDateTime')
			});
		    this.$(".oppFormGivenSupport").val(this.opportunity.get('supportDescription'));
			this.$(".oppFormSupportPref").val(this.opportunity.get('supportPreference'));
			this.$(".oppFormTeamSize").val(this.opportunity.get('teamSize'));
			this.$(".oppFormTerm").val(this.opportunity.get('term'));
			//timePeriodEndDate
			//timePeriodStartDate
			this.$(".oppFormTitle").val(this.opportunity.get('title'));
			this.$(".oppFormTotalSeats").val(this.opportunity.get('totalSeats'));
			
			this.$(".deleteOpportunity").show();
			this.$(".oppFormHeader").text("Edit Opportunity");
		},
		
		gatherInput: function() {
			var startDateTimeInput = this.$(".oppFormStartDateTime").val();
			var startDateTime = startDateTimeInput ? new Date(startDateTimeInput): "";
			var endDateTimeInput = this.$(".oppFormEndDateTime").val();
			var endDateTime = endDateTimeInput ? new Date(endDateTimeInput): "";
			var applicationDueDateInput = this.$(".oppFormApplicationDueDate").val();
			var applicationDueDate = applicationDueDateInput ? new Date(applicationDueDateInput): "";
			var opportunityType = this.$(".oppFormOppType[name='oppFormOppType']:checked").val();
			var opportuntityJson = {
				agencyCommitment: this.$(".oppFormAgencyCommitment").val(),
				applicationDueDate: applicationDueDate,
				//classId: 1,
				classType: this.$(".oppFormClassType").val(),
				classYear: this.$(".oppFormYear").val(),
				className: this.$(".oppFormClassName").val(),
				courseSummary: this.$(".oppFormCourseSummary").val(),
				deliverables: this.$(".oppFormDeliverables").val(),
				description: this.$(".oppFormDescription").val(),
				donation: Number(this.$(".oppFormDonation").val()),
				//duration: "test",
				endDateTime: endDateTime,
				estimatedClassSize: this.$(".oppFormClassSize").val(),
				examples: this.$(".oppFormExamples").val(),
				hoursRequired: this.$(".oppFormHours").val(),
				isClass: this.$(".oppFormIsClass:checked").val() ? true: false,
				isRequiredForClass: this.$(".oppFormIsRequiredForClass:checked").val() ? true: false,
				isPaid: this.$(".oppFormIsPaid:checked").val() ? true: false,
				isServiceLearning: opportunityType === 'service' ? true: false,
				isTeams: this.$(".oppFormIsTeams:checked").val() ? true: false,
				isVirtual: this.$(".oppFormIsVirtual:checked").val() ? true: false,
				//latitude: null,
				location: this.$(".oppFormAddress").val(),
				//longitude: null,
				minimumPersonsRequired: Number(this.$(".oppFormMinReqPersons").val()),
				notAllowed: this.$(".oppFormNotAllowed").val(),
				//notes: this.$(".oppFormNotes").val(),
				numTeams: this.$(".oppFormNumTeams").val(),
				onBoarding: this.$(".oppFormOnboarding").val(),
				opportunityType: opportunityType,
				ownerId: user.person.get('personId'),
				payAmount: Number(this.$(".oppFormPayAmount").val()),
				preferredAgencyType: this.$(".oppFormPrefAgencyType").val() || this.$(".oppFormAgencyType").val(),
				preferredServiceWorkType: this.$(".oppFormPrefServiceWork").val(),
				//recurrence: "",
				requirements: this.$(".oppFormRequirements").val(),
				startDateTime: startDateTime,
				//status: null,
				supportDescription: this.$(".oppFormGivenSupport").val(),
				supportPreference: this.$(".oppFormSupportPref").val(),
				teamSize: this.$(".oppFormTeamSize").val(),
				term: this.$(".oppFormTerm").val(),
				//timePeriodEndDate: null,
				//timePeriodStartDate: null,
				title: this.$(".oppFormTitle").val(),
				totalSeats: Number(this.$(".oppFormTotalSeats").val())
			};
			this.opportunity.set(opportuntityJson);
		},
		
		renderResults: function(opportunity) {
			var thisForm = this;
			this.$(".oppFormResults").show();
			this.$(".oppFormResults .resultsList").empty();
			_.each(opportunity.attributes, function(item, index, items) {
				thisForm.$(".oppFormResults .resultsList").append("<li>"+index+": "+ item +"</li>");
			});
			
			/*setTimeout(function() {
				thisForm.$(".oppFormResults").fadeOut(1000);			
			}, 10000);*/
		},
		
		commandSaveOpportunity: function() {
			this.gatherInput();
			var thisForm = this;
			var options = {
				success: function(opportunity) {
					/*var addedOpp = cache.opportunities.add(opportunity.toJSON(), {merge:true});
					addedOpp.isFetched = true;*/
					var message;
					if(thisForm.options.opportunity) {
						message = "opportunity updated";
					} else {
						message = "opportunity created";
					}
					notifications.notifyUser(message);
					router.navigate('opportunity/'+ addedOpp.get('opportunityId'), {trigger: true});
					if(thisForm.options.opportunity) {
						
					}
					//thisForm.renderResults(thisForm.opportunity);
				},
				error: function(error) {
					notifications.notifyUser("error -- opportunity creation failed: /n"+ error);
				}
			};
			if(!this.opportunity.get('title')) {
				this.$(".oppFormTitleWarning").html("title is required");
				notifications.notifyUser("title is required");
				return;
			}
			if(!this.opportunity.get('startDateTime')) {
				notifications.notifyUser("start date is required");
				this.$(".oppFormStartDateTimeWarning").html("start date is required");
				return;
			}
			if(!this.opportunity.get('endDateTime')) {
				notifications.notifyUser("end date is required");
				this.$(".oppFormEndDateTimeWarning").html("end date is required");
				return;
			}
			this.opportunity.save({}, options);
			this.opportunity = new Opportunity();
		},
		
		commandDeleteOpportunity: function() {
			var options = {
				success: function(opportunity) {
					notifications.notifyUser("opportunity deleted");
					router.navigate('/dashboard', {trigger: true});
				},
				error: function(error) {
					notifications.notifyUser("error -- opportunity deletion failed: /n"+ error);
				}
			};
			this.opportunity.destroy(options);
		}
	});
	return eLeap.own.OpportunityForm;
});
