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
			'click .add': 'addOpportuntiy'
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
			this.renderApprovalButtons();
		},
		
		renderAllOpps: function() {
			this.$(".opportunitiesList").empty();
			if(this.allOpps) {
				var isShow = false;
				var thisPage = this;
				this.allOpps.sort();
				this.allOpps.each(function(opportunity) {
					//needs to updates dateTime to 00:00 -- alsot remember to format time {0:00}
					isShow = opportunity.get('endDateTime') && opportunity.get('endDateTime') > new Date() ? true: false;
					isShow = user.person.get('roleId') === 7 ? true: isShow;
					//temp -- case show newb old opps while developing
					isShow = user.person.get('personId') === 19 ? true: isShow;
					if(isShow) {
						var oppItem = new OpportunityItem({
							opportunity: opportunity
						});
						thisPage.$(".opportunitiesList").append(oppItem.render());
					}
				});
				this.renderApprovalButtons();
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
				this.joinedOpps.each(function(opportunity) {
					//needs to updates dateTime to 00:00 -- alsot remember to format time {0:00}
					isShow = opportunity.get('endDateTime') && opportunity.get('endDateTime') > new Date() ? true: false;
					isShow = user.person.get('roleId') === 7 ? true: isShow;
					//temp -- case show newb old opps while developing
					isShow = user.person.get('personId') === 19 ? true: isShow;
					if(isShow) {
						var oppItem = new OpportunityItem({
							opportunity: opportunity
						});
						thisPage.$(".opportunitiesList").append(oppItem.render());
					}
				});
				this.renderApprovalButtons();
			} else {
				this.$(".opportunitiesList").html("No joined opporunities to display");
			}
		},
		
		renderOwnedOpps: function(){
			this.$(".opportunitiesList").empty();
			if(this.ownedOpps) {
				var isShow = false;
				var thisPage = this;
				this.ownedOpps.sort();
				this.ownedOpps.each(function(opportunity) {
					//needs to updates dateTime to 00:00 -- alsot remember to format time {0:00}
					isShow = opportunity.get('endDateTime') && opportunity.get('endDateTime') > new Date() ? true: false;
					isShow = user.person.get('roleId') === 7 ? true: isShow;
					//temp -- case show newb old opps while developing
					isShow = user.person.get('personId') === 19 ? true: isShow;
					if(isShow) {
						var oppItem = new OpportunityItem({
							opportunity: opportunity
						});
						thisPage.$(".opportunitiesList").append(oppItem.render());
					}
				});
				this.renderApprovalButtons();
			} else {
				this.$(".opportunitiesList").html("No owned opporunities to display");
			}
		},
		
		renderApprovalButtons: function() {
			if(this.allOpps.length && user.person.get('personId')) {
				if(user.person.get('roleId') > 5) {
					this.$(".oppItemApproveDenyBlock").show();
				}
			}
		},
		
		createOpportunity: function() {
			var thisPage = this;
			require(['forms/opportunityForm'], function(OpportunityForm) {
				thisPage.opportunityForm = new OpportunityForm({
					el: thisPage.$(".opportunityForm")
				});
			});
		}
	});
	return eLeap.own.DashboardPage;
});
