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
			this.opportunities = cache.opportunities;
			
			this.renderFramework();
			this.listenForEvents();
			this.fetchOpportunities();
		},
		
		renderFramework: function() {
			this.$el.html(this.pageTmpl());
			if(user.person.get('personName') !== "") {
				this.renderPerson();
				this.renderApprovalButtons();
			}
		},
		
		listenForEvents: function() {
			this.stopListening();
			this.listenTo(this.opportunities, 'reset', this.renderOpportunities);
			this.listenTo(user.person, 'change', this.renderPerson);
		},
		
		fetchOpportunities: function() {
			//based on role type we will show different opportunites
			//this.opportunities.fetch({reset: true});
			cache.fetchOpportunites({reset: true});
		},
		
		renderPerson: function() {
			this.$(".welcomeName").text(user.person.get('personName'));
			if(user.person.get('roleId') < 3){
				if(this.commandDispatcher) {
					this.commandDispatcher.trigger('hideCreate');
				}
			}
		},
		
		renderOpportunities: function() {
			if(this.opportunities) {
				var isShow = false;
				var thisPage = this;
				this.opportunities.sort();
				this.opportunities.each(function(opportunity) {
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
			}
		},
		
		renderApprovalButtons: function() {
			if(this.opportunities.length && user.person.get('personId')) {
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
