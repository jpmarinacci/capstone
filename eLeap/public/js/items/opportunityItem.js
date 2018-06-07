/**
 * @author: JP Marinacci
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'utils', 'controllers/notifications',
		'controllers/router', 'text!../../tmpl/items/opportunityItem.tmpl'],
function (eLeap, $, _, Backbone, utils, notifications, router, itemTmpl) { 'use strict';
		
	eLeap.own.OpportunityItem = Backbone.View.extend({
		
		tagName: 'li',
		className: 'opportunityItem',
		
		itemTmpl: _.template(itemTmpl),
		
		events: {
			'click': 'commandViewOpportunity'
		},
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.itemDispatcher = options.itemDispatcher;
			this.opportunity = options.opportunity;
			this.render();
		},
		
		listenForEvents: function() {
			if(this.itemDispatcher) {
				this.listentTo(this.itemDispatcher, 'remove:items', this.remove);
			}
		},
		
		render: function() {
			this.$el.html(this.itemTmpl({
				opp: this.opportunity.toJSON(),
				utils: utils
			}));
			return this.el;
		},
		
		commandViewOpportunity: function() {
			router.navigate('opportunity/'+this.opportunity.get('opportunityId'), {trigger: true});
		}
	});
	return eLeap.own.OpportunityItem;
});

