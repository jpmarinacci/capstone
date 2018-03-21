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
			/*this.$(".startTimeInput").timepicker({
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
			this.$(".endTimeInput").timepicker();*/
			/*this.$(".timepPeriodStartInput").periodpicker({
				norange: true, // use only one value
				cells: [1, 1], // show only one month
			
				resizeButton: false, // deny resize picker
				fullsizeButton: false,
				fullsizeOnDblClick: false,
			
				timepicker: true, // use timepicker
				timepickerOptions: {
					hours: true,
					minutes: true,
					seconds: false,
					ampm: true
				}
			});*/
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
