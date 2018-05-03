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
			'click .oppFormIsClass': 'toggleClassSection',
			'click .oppFormOppType': 'toggleTypeSection',
			'click .saveOpportunity': 'saveOpportunity',
		},
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.opportunity = options.opportunity || new Opportunity();
			this.renderFramework();
		},
		tempFunc: function() {
			
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
		
		gatherInput: function() {
			var startDateTimeInput = this.$(".startDateTimeInput").val();
			var startDateTime = startDateTimeInput ? new Date(startDateTimeInput): "";
			var endDateTimeInput = this.$(".endDateTimeInput").val();
			var endDateTime = endDateTimeInput ? new Date(endDateTimeInput): "";
			var applicationDueDateInput = this.$(".oppFormApplicationDueDate").val();
			var applicationDueDate = applicationDueDateInput ? new Date(applicationDueDateInput): "";
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
				isClass: this.$(".oppFormIsClass:checked").val() ? true:false,
				isRequredForClass: this.$(".oppFormIsRequredForClass:checked").val() ? true:false,
				isPaid: this.$(".oppFormIsPaid:checked").val() ? true:false,
				isServiceLearning: false,
				isTeams: this.$(".oppFormIsTeams:checked").val() ? true:false,
				isVirtual: false,
				latitude: null,
				location: this.$(".oppFormAddress").val(),
				longitude: null,
				minimumPersonsRequired: this.$(".oppFormMinReqPersons").val(),
				notAllowed: this.$(".oppFormNotAllowed").val(),
				//notes: this.$(".oppFormNotes").val(),
				numTeams: this.$(".oppFormNumTeams").val(),
				onBoarding: this.$(".oppFormOnboarding").val(),
				opportunityType: "",//this.$(".").val(),
				ownerId: user.person.get('personId') || 1,
				pay: this.$(".oppFormPayAmount").val(),
				preferredAgencyType: this.$(".oppFormPrefAgencyType").val() || this.$(".oppFormAgencyType").val(),
				preferredServiceWorkType: this.$(".oppFormPrefServiceWork").val(),
				recurrence: "",
				requirments: this.$(".oppFormRequirements").val(),
				startDateTime: startDateTime,
				//statusId: null,
				supportDescription: this.$(".oppFormGivenSupport").val(),
				supportPreference: this.$(".oppFormSupportPref").val(),
				teamSize: this.$(".oppFormTeamSize").val(),
				term: this.$(".oppFormTerm").val(),
				timePeriodEndDate: null,
				timePeriodStartDate: null,	
				title: this.$(".oppFormTitle").val(),
				totalSeats: Number(this.$(".totalSeatsInput").val())
			};
			this.opportunity.set(opportuntityJson);
		},
		
		saveOpportunity: function() {
			notifications.notifyUser("opportunity created");
			this.gatherInput();
			var options = {
				success: function(opportunity) {
					notifications.notifyUser("opportunity created");
				},
				error: function(error) {
					notifications.notifyUser("error -- opportunity creation failed: /n"+ error);
				}
			};
			this.opportunity.save({}, options);
		}
	});
	return eLeap.own.OpportunityForm;
});
