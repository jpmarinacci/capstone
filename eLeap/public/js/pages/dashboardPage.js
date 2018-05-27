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
			this.renderFramework();
			//this.opportunityHoursChart = new Chart();
			//this.opportunities = new Opportunities();
			this.opportunities = cache.opportunities;
			this.listenForEvents();
			this.fetchOpportunities();
		},
		
		renderFramework: function() {
			this.$el.html(this.pageTmpl());
			if(user.person.get('personName') !== "") {
				this.renderWelcome();
			}
		},
		
		listenForEvents: function() {
			this.listenTo(this.opportunities, 'reset', this.render);
			this.listenTo(user.person, 'change', this.renderWelcome);
		},
		
		fetchOpportunities: function() {
			this.stopListening();
			//based on role type we will show different opportunites
			//this.opportunities.fetch({reset: true});
			cache.fetchOpportunites({reset: true});
		},
		
		renderWelcome: function() {
			this.$(".welcomeName").text(user.person.get('personName'));
		},
		
		render: function() {
			if(this.opportunities) {
				var thisPage = this;
				$("#opportunities").html("DASHBOARD PAGE UNDER CONSTRUCTION --("+ this.opportunities.length+") Opportunities");
				this.opportunities.each(function(opportunity){
					var oppItem = new OpportunityItem({
						opportunity: opportunity
					});
					thisPage.$(".opportunitiesList").append(oppItem.render());
				});
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
