/**
 * @authors: JP Marinacci, Belete Zegeye, Sunny Wu, Aren Kasner, Leo Sinanian
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'models/collegeClass', 'controllers/cache', 'controllers/notifications', 
		'controllers/router', 'controllers/user', 'forms/opportunityForm', 'panels/opportunityDetailPanel',
		'text!../../tmpl/pages/opportunityPage.tmpl'],
	function (eLeap, $, _, Backbone, CollegeClass, cache, notifications, router, user, OpportunityForm, OpportunityDetailPanel, 
		opportunityPageTmpl) { 'use strict';
	
	eLeap.own.OpportunityPage = Backbone.View.extend({
		
		pageTmpl: _.template(opportunityPageTmpl),
		mode: "create",
		
		events: {
			'click .dashboardLink': 'commandNavigateToDashboard'
		},
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.commandDispatcher = options.commandDispatcher;
			this.renderFramework();
			this.listenForDispatcherEvents();
			this.opportunityId = options.opportunityId;
			if(this.opportunityId === "create") {
				this.openCreateMode();
			} else {
				this.opportunityId = Number(this.opportunityId);
				if(this.opportunityId) {
					this.openViewMode();
				} else {
					notifications.notifyUser("invalid opportuity ID");
					//router.navigate('/dashboard', {trigger: true});
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
				this.listenTo(this.commandDispatcher, 'command:denyOpp', this.commandDenyOpportunity);
				//this.listenTo(this.commandDispatcher, 'filter:all filter:joined filter:owned', this.commandNavigateToDashboard);
			}
		},
		
		listenForOppEvents: function() {
			if(this.opp) {
				this.stopListening(this.opp);
				this.listenTo(this.opp, 'sync', this.renderOpportunity);
				this.listenTo(this.opp, 'change', this.opportunityChanged);
			}
		},
				
		getCurrentOpportunity: function() {
			this.opp = cache.getOpportunity({
				opportunityId: this.opportunityId
			});

			this.listenForOppEvents();
			
			//forcing fetch to get isJoined value (purposely not using cache correctly) 
			this.opp.isFetched = false;
			//end hack
			cache.fetchOpportunity(this.opp);
		},
		
		opportunityChanged: function() {
			this.mode = "view";
			this.showDetailView();
			this.renderOpportunity();
		},
				
		openViewMode: function() {
			this.mode = "view";
			this.showDetailView();
			this.getCurrentOpportunity();
		},
		
		openEditMode: function() {
			this.mode = "edit";
			this.showEditView();
			this.getCurrentOpportunity();
		},
		
		openCreateMode: function() {
			this.mode = "create",
			this.showEditView();
			this.$(".oppBreadCrumbTitle").text("Create");
			if(this.opportunityForm) {
				this.opportunityForm.remove();
			}
			this.opportunityForm = new OpportunityForm({
				commandDispatcher: this.commandDispatcher,
				el: this.$(".opportunityPageCreateForm")
			});
		},
		
		showDetailView: function() {
			this.$(".oppportunityEditView").hide();
			this.$(".opportunityDetailsView").show();
		},
		
		showEditView: function() {
			this.$(".oppportunityEditView").show();
			this.$(".opportunityDetailsView").hide();
		},
		
		decideDisplayJoin: function() {
			if(this.opp.get('isJoined')) {
				this.commandDispatcher.trigger('show:leave');
			} else {
				this.commandDispatcher.trigger('show:join');
			}
		},
		
		decideDisplayApprove: function() {
			var status = this.opp.get('status');
			if(user.person.get('roleId') > 5 && status !== 'for class') {
				if(status === 'approved') {
					this.commandDispatcher.trigger('show:deny');
				} else if(status === 'denied'){
					this.commandDispatcher.trigger('show:approve');
				} else {
					this.commandDispatcher.trigger('show:approveDeny');	
				}
			}
		},
		
		decideDisplayEdit: function() {
			if(user.person.get('roleId') ===7 || this.opp.get('ownerId') === user.person.get('personId')) {
				this.commandDispatcher.trigger('show:edit');
			}
		},
		
		renderOpportunity: function() {
			this.decideDisplayJoin();
			if(this.mode === "edit") {
				this.renderEditMode();
			} else if (this.mode === "view") {
				this.renderViewMode();
			}
		},
		
		renderEditMode: function() {
			if(this.opportunityForm) {
				this.opportunityForm.remove();
			}
			this.opportunityForm = new OpportunityForm({
				el: this.$(".opportunityPageCreateForm"),
				opportunity: this.opp
			});
			this.commandDispatcher.trigger('hide:edit');
		},
		
		renderViewMode: function() {
			if(this.opp.get('title')){
				this.opportunityDetailPanel = new OpportunityDetailPanel({
					opportunity: this.opp
				});
				this.$(".opportunityView").html(this.opportunityDetailPanel.render());
				this.$(".oppBreadCrumbTitle").text(this.opp.get('title'));
				this.commandDispatcher.trigger("show:oppViewBtns");
				this.decideDisplayEdit();
				this.decideDisplayApprove();
			} else {
				this.$(".opportunityView").html("<div class='centerText ml5 mr5'>no opportunity with this ID</div>");
			}
		},
		
		commandJoinOpportunity: function() {
			this.$(".oppViewJoinBtn").attr('disabled', 'disabled');
			var thisPage = this;
			var options = {
				personId: user.person.get('personId'),
				success: function() {
					notifications.notifyUser("You joined this opportunity");
					thisPage.commandDispatcher.trigger('hide:join');
					thisPage.commandDispatcher.trigger('show:leave');
					thisPage.opp.set({'isJoined': true});
					cache.joinedOpps.add(thisPage.opp, {merge:true});
				},
				appError: function(error) {
					var errorMessage = error ? error.message ? error.message : error: "couldn't join at this time";
					//notifications.notifyUser(error.message);
				},
				error: function(error) {
					var errorMessage = error ? error.message ? error.message : error: "an error occurred";
					//notifications.notifyUser(error.message);
				}
			};
			this.opp.joinOpportuntiy(options);
		},
		
		commandLeaveOpportunity: function() {
			var thisPage = this;
			this.$(".oppViewLeaveBtn").attr('disabled', 'disabled');
			var options = {
				personId: user.person.get('personId'),
				success: function() {
					notifications.notifyUser("You left this opportunity");
					thisPage.commandDispatcher.trigger('show:join');
					thisPage.commandDispatcher.trigger('hide:leave');
					thisPage.opp.set({'isJoined': false});
					cache.joinedOpps.remove(thisPage.opp);
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
			this.opp.leaveOpportuntiy(options);
		},
		
		commandEditOpportunity: function() {
			this.openEditMode();
		},
				
		commandApproveOpportunity: function() {
			var thisPage = this;
			this.opp.save({'status':'approved'}, {
				success: function(response) {
					thisPage.commandDispatcher.trigger('hide:approve');
				},
				appError: function(response) {
					var errorMessage = "update errored";
					if(response && response.message) {
						errorMessage = response.message;
					}
					notifications.notifyUser(errorMessage);
				},
				error: function(error){
					var errorMessage = "update errored";
					if(response && response.message) {
						errorMessage = response.message;
					}
					notifications.notifyUser(errorMessage);
				}
			});
		},
		
		commandDenyOpportunity: function() {
			var thisPage = this;
			this.opp.save({'status':'denied'},{
				success: function(response) {
					thisPage.commandDispatcher.trigger('hide:deny');
				},
				appError: function(response) {
					var errorMessage = "update errored";
					if(response && response.message) {
						errorMessage = response.message;
					}
					notifications.notifyUser(errorMessage);
				},
				error: function(error){
					var errorMessage = "update errored";
					if(response && response.message) {
						errorMessage = response.message;
					}
					notifications.notifyUser(errorMessage);
				}
			});
		},
		
		commandNavigateToDashboard: function() {
			router.navigate('/dashboard', {trigger: true});
		},
		
		remove: function() {
			if(this.opportunityForm) {
				this.opportunityForm.remove();
			}
			if(this.opportunityDetailPanel) {
				this.opportunityDetailPanel.remove();
			}
			if(this.commandDispatcher) {
				this.commandDispatcher.trigger('hide:oppViewBtns');
			}
			this.$el.remove();
			this.stopListening();
			return this;
		}
	});
	return eLeap.own.OpportunityPage;
});
