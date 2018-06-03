/**
 * @authors: JP Marinacci, Belete Zegeye, Sunny Wu, Aren Kasner, Leo Sinanian
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'controllers/cache', 'controllers/router', 'controllers/user',
		'collections/opportunities', 'items/opportunityItem', 'text!../../tmpl/pages/dashboardPage.tmpl'],
function (eLeap, $, _, Backbone, cache, router, user, Opportunities, OpportunityItem, dashboardPageTmpl) {'use strict';

	eLeap.own.DashboardPage = Backbone.View.extend({
		
		pageTmpl: _.template(dashboardPageTmpl),
		
		events: {
			'click .cardModeBtn': 'commandCardView',
			'click .listModeBtn': 'commandListView',
			'click .oppItemApproveBtn': 'commandApproveOpp',
			'click .oppItemDenyBtn': 'commandDenyOpp'
		},
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.commandDispatcher = options.commandDispatcher;
			this.allOpps = cache.allOpps;
			this.joinedOpps = cache.joinedOpps;
			this.ownedOpps = cache.ownedOpps;
			this.renderFramework();
			this.listenForEvents();
			this.fetchOpps();
		},
		
		renderFramework: function() {
			this.$el.html(this.pageTmpl());
			if(user.person.get('personName') !== "") {
				this.renderPerson();
			}
			this.commandDispatcher.trigger('show:allOpps');
		},
		
		listenForEvents: function() {
			this.stopListening();
			if(user && user.perosn) {
				this.listenTo(user.person, 'sync change', this.renderPerson);
			}
			if(this.commandDispatcher) {
				this.listenTo(this.commandDispatcher, 'filter:all', this.renderAllOpps);
				this.listenTo(this.commandDispatcher, 'filter:joined', this.renderJoinedOpps);
				this.listenTo(this.commandDispatcher, 'filter:owned', this.renderOwnedOpps);
			}
			if(this.allOpps) {
				this.listenTo(this.allOpps, 'reset', this.allOppsReset);
			}
			if(this.joinedOpps) {
				this.listenTo(this.joinedOpps, 'reset', this.joinedOppsReset);
			}
			if(this.ownedOpps) {
				this.listenTo(this.ownedOpps, 'reset', this.ownedOppsReset);
			}
		},
		
		fetchOpps: function() {
			//based on role type we will show different opportunites
			//this.opportunities.fetch({reset: true});
			cache.fetchAllOpps({reset: true});
			cache.fetchJoinedOpportunities({reset:true});
			cache.fetchOwnedOpportunities({reset:true});
		},
		
		allOppsReset: function(){
			this.renderAllOpps();
		},
		
		joinedOppsReset: function() {
			if(this.joinedOpps.length) {
				this.commandDispatcher.trigger('show:joined');
			}
		},
		
		ownedOppsReset: function() {
			if(this.ownedOpps.length) {
				this.commandDispatcher.trigger('show:owned');
			}
		},
		
		renderPerson: function() {
			this.$(".welcomeName").text(user.person.get('personName'));
			if(user.person.get('roleId') > 2) {
				if(this.commandDispatcher) {
					this.commandDispatcher.trigger('show:create');
				}
			}
			if(user.person.get('roleId') === 5) {
				if(this.commandDispatcher) {
					this.commandDispatcher.trigger('show:instructor');
				}
			}
		},
		
		renderAllOpps: function() {
			this.$(".opportunitiesList").empty();
			if(this.allOpps) {
				var isShow = false;
				var thisPage = this;
				this.allOpps.sort();
				this.allOpps.each(function(opp) {
					if(opp.get('opportunityId')) {
						//needs to updates dateTime to 00:00 -- also remember to format time {0:00}
						isShow = opp.get('endDateTime') && opp.get('endDateTime') > new Date() ? true: false;
						isShow = user.person.get('roleId') === 7 ? true: isShow;
						if(isShow) {
							var oppItem = new OpportunityItem({
								opportunity: opp
							});
							thisPage.$(".opportunitiesList").append(oppItem.render());
						}
						thisPage.renderApprovalButtons(opp);
					}
				});
			} else {
				this.$(".opportunitiesList").html("No Opporunities to display");
			}
		},
		
		renderJoinedOpps: function() {
			this.$(".opportunitiesList").empty();
			if(this.joinedOpps) {
				var isShow = false;
				var thisPage = this;
				this.joinedOpps.sort();
				this.joinedOpps.each(function(opp) {
					if(opp.get('opportunityId')) {
						isShow = opp.get('endDateTime') && opp.get('endDateTime') > new Date() ? true: false;
						isShow = user.person.get('roleId') === 7 ? true: isShow;
						if(isShow) {
							var oppItem = new OpportunityItem({
								opportunity: opp
							});
							thisPage.$(".opportunitiesList").append(oppItem.render());
						}
						thisPage.renderApprovalButtons(opp);
					}
				});
			} else {
				this.$(".opportunitiesList").html("No joined opporunities to display");
			}
		},
		
		renderOwnedOpps: function(){
			this.$(".opportunitiesList").empty();
			if(this.ownedOpps) {
				var isShow = true;
				var thisPage = this;
				this.ownedOpps.sort();
				this.ownedOpps.each(function(opp) {
					if(opp.get('opportunityId')) {
						//filter out old owned opps??
						//isShow = opp.get('endDateTime') && opp.get('endDateTime') > new Date() ? true: false;
						isShow = user.person.get('roleId') === 7 ? true: isShow;
						if(isShow) {
							var oppItem = new OpportunityItem({
								opportunity: opp
							});
							thisPage.$(".opportunitiesList").append(oppItem.render());
						}
						thisPage.renderApprovalButtons(opp);
					}
				});
			} else {
				this.$(".opportunitiesList").html("No owned opporunities to display");
			}
		},
		
		renderApprovalButtons: function(opp) {
			if(user.person.get('roleId') > 5) {
				this.$("[data-oppId='"+opp.get('opportunityId') +"']").show();
				var status = opp.get('status'); 
				if(status === 'approved') {
					this.$(".oppItemApproveBtn[data-oppId='"+opp.get('opportunityId') +"']").hide();
				} else if(status === 'denied') {
					this.$(".oppItemDenyBtn[data-oppId='"+opp.get('opportunityId') +"']").hide();
				}
			}
		},
				
		commandCardView: function() {
			alert('viewing card view');
		},
		
		commandListView: function() {
			alert('list view not implemented yet');
		},
		
		commandApproveOpp: function() {
			this.opp.save({'status':'approved'});
		},
		
		commandDenyOpp: function() {
			this.opp.save({'status':'denied'});
		},
		
		remove: function() {
			if(this.commandDispatcher) {
				this.commandDispatcher.trigger('hide:oppFilterBtns');
			}
			this.$el.remove();
			this.stopListening();
			return this;
		}
	});
	return eLeap.own.DashboardPage;
});

