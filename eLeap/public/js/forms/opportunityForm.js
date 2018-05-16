/**
 * @author: JP Marinacci
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'datetimepicker', 'controllers/user', 'controllers/notifications', 
		'models/opportunity', 'text!../../tmpl/forms/opportunityForm.tmpl'],
function (eLeap, $, _, Backbone, datetimepicker, user, notifications, Opportunity, opportunityFormTmpl) { 'use strict';
		
	eLeap.own.OpportunityForm = Backbone.View.extend({
		
		formTmpl: _.template(opportunityFormTmpl),
		
		events: {
			'change .oppFormTitle': 'commandChangedTitle',
			'change .oppFormDescription': 'commandChangedDescription',
			'change .oppFormTotalSeatsInput': 'commandChangedTotalSeats',
			
			'click .oppFormIsClass': 'toggleClassSection',
			'click .oppFormOppType': 'toggleTypeSection',
			'click .saveOpportunity': 'saveOpportunity',
		},
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.opportunity = options.opportunity || new Opportunity();
			this.renderFramework();
		},
		
		renderFramework: function(){
			this.$el.html(this.formTmpl({
				opportunity: this.opportunity
			}));
			this.$(".startDateTimeInput").datetimepicker({
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
			
			this.$(".endDateTimeInput").datetimepicker({
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
		
		toggleTypeSection: function(event) {
			this.$(".oppTypeSection").hide();
			var type = event.currentTarget.value;
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
					this.$(".oppFormGigSection").show();
					this.$(".oppFormGigDeliverableSharedSection").show();
					break;
				case 'deliverable':
					this.$(".oppFormDeliverableSection").show();
					this.$(".oppFormGigDeliverableSharedSection").show();
					break;
				case 'other':
					this.$(".oppFormOtherSection").show();
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
		
		commandChangedDescription: function() {
			
		},
		
		commandChangedTotalSeats: function(event) {
			var inputValue = this.$(".oppFormTotalSeatsInput").val();
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
		
		gatherInput: function() {
			var startDateTimeInput = this.$(".startDateTimeInput").val();
			var startDateTime = startDateTimeInput ? new Date(startDateTimeInput): "";
			var endDateTimeInput = this.$(".endDateTimeInput").val();
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
				donation: this.$(".oppFormDonation").val(),
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
				minimumPersonsRequired: this.$(".oppFormMinReqPersons").val(),
				notAllowed: this.$(".oppFormNotAllowed").val(),
				//notes: this.$(".oppFormNotes").val(),
				numTeams: this.$(".oppFormNumTeams").val(),
				onBoarding: this.$(".oppFormOnboarding").val(),
				opportunityType: opportunityType,
				ownerId: user.person.get('personId'),
				payAmount: this.$(".oppFormPayAmount").val(),
				preferredAgencyType: this.$(".oppFormPrefAgencyType").val() || this.$(".oppFormAgencyType").val(),
				preferredServiceWorkType: this.$(".oppFormPrefServiceWork").val(),
				//recurrence: "",
				requirments: this.$(".oppFormRequirements").val(),
				startDateTime: startDateTime,
				//status: null,
				supportDescription: this.$(".oppFormGivenSupport").val(),
				supportPreference: this.$(".oppFormSupportPref").val(),
				teamSize: this.$(".oppFormTeamSize").val(),
				term: this.$(".oppFormTerm").val(),
				//timePeriodEndDate: null,
				//timePeriodStartDate: null,
				title: this.$(".oppFormTitle").val(),
				totalSeats: Number(this.$(".oppFormTotalSeatsInput").val())
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
		
		saveOpportunity: function() {
			this.gatherInput();
			var thisForm = this;
			var options = {
				success: function(opportunity) {
					notifications.notifyUser("opportunity created");
					thisForm.renderResults(opportunity);
				},
				error: function(error) {
					notifications.notifyUser("error -- opportunity creation failed: /n"+ error);
				}
			};
			this.opportunity.save({}, options);
			this.opportunity = new Opportunity();
		}
	});
	return eLeap.own.OpportunityForm;
});
