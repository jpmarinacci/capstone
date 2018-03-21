/**
 * @author: JP Marinacci
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'jquery-ui', 'jquery-timepicker', 'controllers/user', 'controllers/notifications', 
		'models/opportunity', 'text!../../tmpl/forms/opportunityForm.tmpl'],
function (eLeap, $, _, Backbone, jqueryUI, jqueryTimePicker, user, notifications, Opportunity, opportunityFormTmpl) { 'use strict';
		
	eLeap.own.OpportunityForm = Backbone.View.extend({
		
		formTmpl: _.template(opportunityFormTmpl),
		
		events: {
			'click .saveOpportunity': 'saveOpportunity'
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
			this.$(".startDateTimeInput").datepicker();
			this.$(".startTimeInput").timepicker({
			    timeFormat: 'h:mm p',
			    interval: 60,
			    minTime: '10',
			    maxTime: '6:00pm',
			    defaultTime: '7',
			    startTime: '10:00',
			    dynamic: false,
			    dropdown: true,
			    scrollbar: true
			});
			this.$(".endTimeInput").timepicker({
				 timeFormat: 'h:mm p',
			    interval: 60,
			    minTime: '10',
			    maxTime: '6:00pm',
			    defaultTime: '7',
			    startTime: '10:00',
			    dynamic: false,
			    dropdown: true,
			    scrollbar: true
			});
		},
		
		gatherInput: function() {
			//var startDateInput = this.$(".startDateTimeInput").val();
			//var startTimeInput = this.$(".startTimeInput").val();
			//var oppDate = new Date(startDateInput);
			//var startDateTime = oppDate.setTime(startTimeInput);
			
			//var endTime = this.$(".endTimeInput").val();
			//var startDateTime = oppDate.setHours(oppTime);
			//var endDateTime = oppDate.setHours(endTime);
			var opportuntityJson = {
				//classId: "",
				/*donation: "",
				isVirtual: "",
				notes: "",*/
				/*pay: "",
				statusId: "",
				timePeriodEnd: "",*/
				timePeriodStartDate: new Date(),
                description: this.$(".opportunityFormDescription").val(),
                //duration: this.$(".duration").val(),
                isPaid: true,// this.$(".isPaid").val(),
                //isServiceLearning: this.$(".isServiceLearning").val(),
                startDateTime: new Date(),
                //endDateTime: endDateTime,
                ownerId: user.person.get('personId'),
				title: this.$(".opportunityFormTitle").val(),
				totalSeats: this.$(".totalSeats").val()
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
