/**
 * @authors: JP Marinacci, Belete Zegeye, Sunny Wu, Aren Kasner, Leo Sinanian
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'controllers/cache', 'controllers/notifications', 'controllers/router',
		'controllers/user', 'forms/opportunityForm', 'items/opportunityDetailItem', 'text!../../tmpl/pages/opportunityPage.tmpl'],
function (eLeap, $, _, Backbone, cache, notifications, router, user, OpportunityForm, OpportunityDetailItem, opportunityPageTmpl) { 'use strict';
		
	eLeap.own.OpportunityPage = Backbone.View.extend({
		
		pageTmpl: _.template(opportunityPageTmpl),
		mode: "create",
		
		events: {
			'click .oppViewJoinBtn': 'commandJoinOpportunity',
			'click .oppViewLeaveBtn': 'commandLeaveOpportunity',
			'click .oppViewEditBtn': 'commandEditOpportunity'
		},
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.renderFramework();
			this.opportunityId = options.opportunityId;
			if(this.opportunityId === "create") {
				this.mode = "create",
				this.showCreateView();
				var thisPage = this;
				thisPage.opportunityForm = new OpportunityForm({
					el: thisPage.$(".opportunityPageCreateForm")
				});
				
			} else {
				this.opportunityId = Number(this.opportunityId);
				if(this.opportunityId) {
					this.openViewMode();
				} else {
					notifications.notifyUser("invalid opportuity ID");
					router.navigate('/dashboard', {trigger: true});
				}
			}
		},
		
		listenForEvents: function() {
			this.stopListening();
			this.listenTo(this.opportunity, 'sync', this.renderOpportunity);
			this.listenTo(this.opportunity, 'change', this.opportunityChanged);
		},
				
		openViewMode: function() {
			this.mode = "view";
			this.showDetailView();
			this.getCurrentOpportunity();
		},
		
		openEditMode: function() {
			this.mode = "edit";
			this.showCreateView();
			this.getCurrentOpportunity();
		},
		
		getCurrentOpportunity: function() {
			this.opportunity = cache.getOpportunity({
				opportunityId: this.opportunityId
			});
			
			this.listenForEvents();
			cache.fetchOpportunity(this.opportunity);
		},
		
		renderFramework: function(){
			this.$el.html(this.pageTmpl());
		},
		
		showDetailView: function() {
			this.$(".oppportunityEditView").hide();
			this.$(".opportunityDetailsView").show();
		},
		
		showCreateView: function() {
			this.$(".oppportunityEditView").show();
			this.$(".opportunityDetailsView").hide();
		},
		
		opportunityChanged: function() {
			this.mode = "view";
			this.showDetailView();
			this.renderOpportunity();
		},
		
		renderOpportunity: function() {
			if(this.mode === "edit") {
				this.opportunityForm = new OpportunityForm({
					el: this.$(".opportunityPageCreateForm"),
					opportunity: this.opportunity
				});
			} else if (this.mode === "view") {
				var opportunityView = new OpportunityDetailItem({
					opportunity: this.opportunity
				});
				this.$(".opportunityView").html(opportunityView.render());
			}
		},
		
		commandJoinOpportunity: function() {
			this.$(".oppViewJoinBtn").attr('disabled', 'disabled');
			var options = {
				personId: user.person.get('personId'),
				success: function() {
					notifications.notifyUser("You joined this opportunity");
				},
				appError: function(error) {
					var errorMessage = error ? error.message ? error.message : error: "couldn't join at this time";
					notifications.notifyUser(error.message);
				},
				error: function(error) {
					var errorMessage = error ? error.message ? error.message : error: "an error occurred";
					notifications.notifyUser(error.message);
				}
			};
			this.opportunity.joinOpportuntiy(options);
		},
		
		commandLeaveOpportunity: function() {
			this.$(".oppViewLeaveBtn").attr('disabled', 'disabled');
			var options = {
				personId: user.person.get('personId'),
				success: function() {
					notifications.notifyUser("You Left this opportunity");
				},
				appError: function(error) {
					var errorMessage = error ? error.message ? error.message : error: "couldn't leave at this time";
					notifications.notifyUser(error.message);
				},
				error: function(error) {
					var errorMessage = error ? error.message ? error.message : error: "an error occurred";
					notifications.notifyUser(error.message);
				}
			};
			this.opportunity.leaveOpportuntiy(options);
		},
		
		commandEditOpportunity: function() {
			this.openEditMode();
		}
	});
	return eLeap.own.OpportunityPage;
});

