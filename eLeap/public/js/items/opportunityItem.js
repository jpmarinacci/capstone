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
			this.listenForEvents();
		},
		
		listenForEvents: function() {
			if(this.itemDispatcher) {
				this.listenTo(this.itemDispatcher, 'remove:items', this.remove);
			}
			if(this.opportunity) {
				//this.listenTo(this.opportunity, 'change', this.render);
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
		
		commandClickItem: function(event) {
			var target = event.target;
			if(event.target.dataset) {
				var type = event.target.dataset.buttonType;
				var oppId = event.target.dataset.oppId;
				if(type || oppId) {
					if(!oppId) {
						oppId = this.$(event.target).parent().data().oppId;
					}
				}
			}
			if(oppId) {
				if(type === 'deny') {
					this.commandDenyOpportunity();
				} else {
					this.commandApproveOpportunity();
				}
			} else if(this.className === 'oppCardItem') {
				this.commandViewOpportunity();
			}
		},
		
		commandApproveOpportunity: function() {
			var thisItem = this;
			this.opportunity.save({'status':'approved'}, {
				success: function(response) {
					thisItem.render();
					thisItem.$(".oppItemApproveDenyBlock, .oppItemDenyBtn").show();
					thisItem.$(".oppItemApproveBtn").hide();
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
				},
				wait: true
			});
		},
		
		commandDenyOpportunity: function() {
			var thisItem = this;
			this.opportunity.save({'status':'denied'},{
				success: function(response) {
					thisItem.render();
					thisItem.$(".oppItemApproveDenyBlock, .oppItemApproveBtn").show();
					thisItem.$(".oppItemDenyBtn").hide();
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
				},
				wait: true
			});
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

