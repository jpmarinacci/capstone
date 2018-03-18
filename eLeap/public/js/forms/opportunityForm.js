/**
 * @author: JP Marinacci
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'controllers/user', 'controllers/notifications', 
		'models/opportunity', 'text!../../tmpl/forms/opportunityForm.tmpl'],
function (eLeap, $, _, Backbone, user, notifications, Opportunity, opportunityFormTmpl) { 'use strict';
		
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
				//opportunity: this.opportunity
			}));
		},
		
		gatherInput: function() {
			var opportuntityJson = {
				//classId: "",
				/*donation: "",
				isVirtual: "",
				notes: "",*/
				/*pay: "",
				statusId: "",
				timePeriodEnd: "",
				timePeriodStart: "",*/
                description: this.$(".opportunityFormDescription").val(),
                duration: this.$(".duration").val(),
                isPaid: this.$(".isPaid").val(),
                isRecurrent: this.$(".isRecurrent").val(),
                isServiceLearning: this.$(".isServiceLearning").val(),
                startDate: this.$(".startDateInput").val(),
                endDate: this.$(".endDateInput").val(),
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
