/**
 * @authors: JP Marinacci, Belete Zegeye, Sunny Wu, Aren Kasner, Leo Sinanian
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'controllers/router', 'controllers/user', 'collections/opportunities',
		'text!../../tmpl/pages/dashboardPage.tmpl', 'text!../../tmpl/items/opportunityItem.tmpl', 'text!../../tmpl/items/opportunityTableItem.tmpl'],
function (eLeap, $, _, Backbone, router, user, Opportunities, dashboardPageTmpl, oppItemTmpl, oppTblItm) {'use strict';

	eLeap.own.DashboardPage = Backbone.View.extend({
		
		pageTmpl: _.template(dashboardPageTmpl),
		oppItemTmpl: _.template(oppItemTmpl),
		oppTblItm: _.template(oppTblItm),
		
		events: {
			'click .add': 'addOpportuntiy'
		},
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.renderFramework();
			//this.opportunityHoursChart = new Chart();
			this.opportunities = new Opportunities();
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
			//based on role type we will show different opportunites
			this.opportunities.fetch({reset: true});
		},
		
		renderWelcome: function() {
			this.$(".welcomeName").text(user.person.get('personName'));
		},
		
		render: function() {
			if(this.opportunities) {
				var thisPage = this;
				$("#opportunities").html("DASHBOARD PAGE UNDER CONSTRUCTION --("+ this.opportunities.length+") Opportunities");
				/*this.opportunities.each(function(opportunity){
					/*var itemHtml = thisPage.oppItemTmpl({
						opportunity: opportunity.toJSON()
					});
					thisPage.$(".opportunitiesList").append(itemHtml);*/
					/*var itemHtml = thisPage.oppTblItm({
						opportunity: opportunity.toJSON()
					});
					thisPage.$(".opportunityTable tbody").append(itemHtml);
				});*/
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
