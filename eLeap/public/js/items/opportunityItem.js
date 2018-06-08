/**
 * @author: JP Marinacci
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'utils', 'controllers/notifications',
		'controllers/router', 'text!../../tmpl/items/opportunityCardItem.tmpl', 'text!../../tmpl/items/opportunityListItem.tmpl'],
function (eLeap, $, _, Backbone, utils, notifications, router, itemTmpl, listItemTmpl) { 'use strict';
		
	eLeap.own.OpportunityItem = Backbone.View.extend({
		
		tagName: 'li',
		className: 'oppCardItem',
		
		itemTmpl: _.template(itemTmpl),
		listItemTmpl: _.template(listItemTmpl),
		
		events: {
			'click': 'commandClickItem',
			'click .oppItemMoreBtn': 'commandClickMoreBtn',
		},
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.itemDispatcher = options.itemDispatcher;
			this.opportunity = options.opportunity;
			this.availablePrct = options.availablePrct;
			this.render();
		},
		
		listenForEvents: function() {
			if(this.itemDispatcher) {
				this.listentTo(this.itemDispatcher, 'remove:items', this.remove);
			}
		},
		
		render: function() {
			if(this.className === 'oppListItem') {
				this.$el.html(this.listItemTmpl({
					opp: this.opportunity.toJSON(),
					availablePrct: this.availablePrct,
					utils: utils
				}));
			} else {
				this.$el.html(this.itemTmpl({
					opp: this.opportunity.toJSON(),
					availablePrct: this.availablePrct,
					utils: utils
				}));
			}
			return this.el;
		},
		
		commandClickItem: function() {
			if(this.className === 'oppCardItem') {
				this.commandViewOpportunity();
			}
		},
		
		commandClickMoreBtn: function() {
			this.commandViewOpportunity();
		},
		
		commandViewOpportunity: function(event) {
			router.navigate('opportunity/'+this.opportunity.get('opportunityId'), {trigger: true});
		}
	});
	return eLeap.own.OpportunityItem;
});

