/**
 * @author: JP Marinacci
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'utils', 'controllers/notifications',
		'controllers/router', 'text!../../tmpl/items/opportunityDetailItem.tmpl'],
function (eLeap, $, _, Backbone, utils, notifications, router, viewTempl) { 'use strict';
		
	eLeap.own.OpportunityDetailItem = Backbone.View.extend({
		
		className: 'opportunityDetailItem',
		
		viewTempl: _.template(viewTempl),
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.opportunity = options.opportunity;
			this.render();
		},
		
		render: function() {
			this.$el.html(this.viewTempl({
				opp: this.opportunity.toJSON(),
				utils: utils
			}));
			return this.el;
		}
	});
	return eLeap.own.OpportunityDetailItem;
});

