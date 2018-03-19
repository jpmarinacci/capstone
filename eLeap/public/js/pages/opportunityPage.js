/**
 * @authors: JP Marinacci, Belete Zegeye, Sunny Wu, Aren Kasner, Leo Sinanian
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'models/opportunity', 'text!../../tmpl/pages/opportunityPage.tmpl'],
function (eLeap, $, _, Backbone, Opportunity, opportunityPageTmpl) { 'use strict';
		
	eLeap.own.OpportunityPage = Backbone.View.extend({
		
		pageTmpl: _.template(opportunityPageTmpl),
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.renderFramework();
			this.opportunityId = options.opportunityId;
			if(this.opportunityId === "create") {
				this.$(".oppportunityEditView").show();
				this.$(".opportunityDetailsView").hide();
				var thisPage = this;
				require(['forms/opportunityForm'], function(OpportunityForm) {
					thisPage.opportunityForm = new OpportunityForm({
						el: thisPage.$(".opportunityForm")
					});
				});
			} else {
				this.$(".opportunityDetailsView").show();
				this.opportunity = options.opportunity || new Opportunity({
					opportunityId: Number(this.opportunityId)
				});
				this.listenForEvents();
				this.opportunity.fetch();
			}
		},
		
		renderFramework: function(){
			this.$el.html(this.pageTmpl({}));
		},
		
		listenForEvents: function() {
			this.listenTo(this.opportunity, 'sync change', this.renderOpportunity);
		},
		
		renderOpportunity: function(opportunity) {
			//render
			console.log(this.opportunity);
		}
	});
	return eLeap.own.OpportunityPage;
});
