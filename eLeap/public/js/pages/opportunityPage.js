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
			/*'click .oppViewJoinBtn': 'commandJoinOpportunity',
			'click .oppViewLeaveBtn': 'commandLeaveOpportunity',
			'click .oppViewEditBtn': 'commandEditOpportunity'*/
		},
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.commandDispatcher = options.commandDispatcher;
			this.renderFramework();
			this.listenForDispatcherEvents();
			this.opportunityId = options.opportunityId;
			if(this.opportunityId === "create") {
				this.mode = "create",
				this.showCreateView();
				this.opportunityForm = new OpportunityForm({
					el: this.$(".opportunityPageCreateForm")
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
				
		renderFramework: function(){
			this.$el.html(this.pageTmpl());
		},
		
		listenForDispatcherEvents: function() {
			if(this.commandDispatcher) {
				this.stopListening(this.commandDispatcher);
				this.listenTo(this.commandDispatcher, 'command:editOpp', this.commandEditOpportunity);
				this.listenTo(this.commandDispatcher, 'command:joinOpp', this.commandJoinOpportunity);
				this.listenTo(this.commandDispatcher, 'command:leaveOpp', this.commandLeaveOpportunity);
				this.listenTo(this.commandDispatcher, 'command:approveOpp', this.commandApproveOpportunity);
			}
		},
		
		listenForOppEvents: function() {
			if(this.opportunity) {
				this.stopListening(this.opportunity);
				this.listenTo(this.opportunity, 'sync', this.renderOpportunity);
				this.listenTo(this.opportunity, 'change', this.opportunityChanged);
			}
		},
				
		getCurrentOpportunity: function() {
			this.opportunity = cache.getOpportunity({
				opportunityId: this.opportunityId
			});
			
			this.listenForOppEvents();
			
			//forcing fetch to get isJoined value (purposely not using cache correctly) 
			this.opportunity.isFetched = false;
			//end hack
			cache.fetchOpportunity(this.opportunity);
		},
		
		opportunityChanged: function() {
			this.mode = "view";
			this.showDetailView();
			this.renderOpportunity();
		},
				
		openViewMode: function() {
			this.mode = "view";
			this.showDetailView();
			this.commandDispatcher.trigger('showEdit');
			this.getCurrentOpportunity();
		},
		
		openEditMode: function() {
			this.mode = "edit";
			this.showCreateView();
			this.commandDispatcher.trigger('hideEdit');
			this.getCurrentOpportunity();
		},
		
		showDetailView: function() {
			this.$(".oppportunityEditView").hide();
			this.$(".opportunityDetailsView").show();
		},
		
		showCreateView: function() {
			this.$(".oppportunityEditView").show();
			this.$(".opportunityDetailsView").hide();
		},
		
		decideDisplayJoin: function() {
			if(this.opportunity.get('isJoined')) {
				this.commandDispatcher.trigger('showLeave');
			} else {
				this.commandDispatcher.trigger('showJoin');
			}
		},
		
		renderOpportunity: function() {
			this.decideDisplayJoin();
			if(this.mode === "edit") {
				if(this.opportunityForm) {
					this.opportunityForm.remove();
				}
				this.opportunityForm = new OpportunityForm({
					el: this.$(".opportunityPageCreateForm"),
					opportunity: this.opportunity
				});
			} else if (this.mode === "view") {
				var opportunityView = new OpportunityDetailItem({
					opportunity: this.opportunity
				});
				this.$(".opportunityView").html(opportunityView.render());
				this.$(".oppBreadCrumbTitle").text(this.opportunity.get('title'));
			}
		},
		
		commandJoinOpportunity: function() {
			this.$(".oppViewJoinBtn").attr('disabled', 'disabled');
			var thisPage = this;
			var options = {
				personId: user.person.get('personId'),
				success: function() {
					notifications.notifyUser("You joined this opportunity");
					thisPage.commandDispatcher.trigger('hideJoin');
					thisPage.commandDispatcher.trigger('showLeave');
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
			var thisPage = this;
			this.$(".oppViewLeaveBtn").attr('disabled', 'disabled');
			var options = {
				personId: user.person.get('personId'),
				success: function() {
					notifications.notifyUser("You Left this opportunity");
					thisPage.commandDispatcher.trigger('showJoin');
					thisPage.commandDispatcher.trigger('hideLeave');
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
		},
		
		commandApproveOpportunity: function() {
			this.opportunity.save({'status':'approved'});
		},
		
		remove: function() {
			if(this.opportunityForm) {
				this.opportunityForm.remove();
			}
			if(this.commandDispatcher) {
				this.commandDispatcher.trigger('hideOppViewBtns');
			}
			this.$el.remove();
			this.stopListening();
			return this;
		}
	});
	return eLeap.own.OpportunityPage;
});

