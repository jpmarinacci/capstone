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
			var startDateTime = new Date(this.$(".startDateTimeInput").val());
			var endDateTime = new Date(this.$(".endDateTimeInput").val());
			var opportuntityJson = {
				agencyCommitment: "",
				applicationDueDate: "",
				availableSeats: "",
				classId: "",
				classType: "",
				classYear: "",
				courseSummary: "",
				createDate: "",
				deliverables: "",
				description: this.$(".oppFormDescription").val(),
				donation: "",
				duration: "",
				endDateTime: endDateTime,
				estimatedClassSize: "",
				examples: "",
				hoursRequired: "",
				isClass: "",
				isRequredForClass: "",
				isPaid: true,// this.$(".isPaid").val(),
				isServiceLearning: "",
				isTeams: "",
				isVirtual: "",
				latitude: "",
				location: "",
				longitude: "",
				minimumPersonsRequired: "",
				notAllowed: "",
				notes: "",
				numTeams: "",
				onBoarding: "",
				opportunityType: "",
				ownerId: user.person.get('personId') || 1,
				pay: "",
				preferredServiceWorkType: "",
				preferredAgencyType: "",
				recurrence: "",
				requirments: "",
				startDateTime: startDateTime,
				statusId: "",
				supportDescription: "",
				supportPreference: "",
				teamSize: "",
				term: "",
				timePeriodEndDate: "",
				timePeriodStartDate: "",	
				title: this.$(".oppFormTitle").val(),
				totalSeats: Number(this.$(".totalSeats").val())
			};
			this.opportunity.set(opportuntityJson);
		},
		
		saveOpportunity: function() {
			notifications.notifyUser("opportunity created");
			this.gatherInput();
			var options = {
				success: function() {
					notifications.notifyUser("opportunity created");
				},
				error: function() {
					notifications.notifyUser("error -- opportunity creation failed");
				}
			};
			this.opportunity.save({}, options);
		}
	});
	return eLeap.own.OpportunityForm;
});
