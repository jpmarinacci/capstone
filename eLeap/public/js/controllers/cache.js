/** 
 * @author: JP Marinacci
 */


define(['jquery', 'underscore', 'backbone', 'eLeap', 'collections/roles', 'collections/opportunities', 'models/opportunity'],
	function ($, _, Backbone, eLeap, Roles, Opportunities, Opportunity) { 'use strict';
	
	var thisCache = undefined;
	
	eLeap.own.Cache = Backbone.Model.extend({
		
		initialize: function(options) {
			options = options || {};
			this.roles = new Roles();
			this.opportunities = new Opportunities();
		},
		
		fetchRoles: function(options) {
			options = options || {};
			if(this.roles.isFetched) {
				this.roles.trigger('reset');
			} else if(!this.roles.isFetchPending) {
				this.roles.isFetchPending = true;
				options.chainedSuccess = options.success;
				options.chainedError = options.error;
				options.success = function(response) {
					thisCache.roles.isFetchPending = false;
					thisCache.roles.isFetched = true;
					if(options.chainedSuccess) {
						if(options.context) {
							options.chainedSuccess.call(options.context, response);
						}
					}
				};
				options.error = function(error) {
					//console.log(error);
				};
				options.reset = true;
				this.roles.fetch(options, {});
			}
		},
		
		fetchOpportunites: function(options) {
			options = options || {};
			if(this.opportunities.isFetched) {
				this.opportunities.trigger('reset');
			} else if(!this.opportunities.isFetchPending) {
				this.opportunities.isFetchPending = true;
				options.chainedSuccess = options.success;
				options.chainedError = options.error;
				options.success = function(response) {
					thisCache.opportunities.isFetchPending = false;
					thisCache.opportunities.isFetched = true;
					thisCache.opportunities.each(function(opp) {
						opp.isFetched = true;
					});
					if(options.chainedSuccess) {
						if(options.context) {
							options.chainedSuccess.call(options.context, response);
						}
					}
				};
				options.error = function(error) {
					//console.log(error);
				};
				options.reset = true;
				this.opportunities.fetch(options, {});
			}
		},
		
		getOpportunity: function(options) {
			options = options || {};
			var opportunity;
			if(options.opportunity) {
				opportunity = this.opportunities.get(options.opportunity);
			}
			if(options.opportunityId) {
				opportunity = this.opportunities.get(options.opportunityId);
			}
			if(!opportunity) {
				//opportunity = this.opportunities.add(new Opportunity());
				opportunity = new Opportunity({
					opportunityId: options.opportunityId
				});
			}
			return opportunity;
		},
		
		fetchOpportunity: function(opportunity, options) {
			options = options || {};
			if(opportunity.isFetched) {
				opportunity.trigger('sync');
			} else if(!opportunity.isFetchPending) {
				opportunity.isFetchPending = true;
				options.chainedSuccess = options.success;
				options.chainedError = options.error;
				options.success = function(response) {
					var opp = thisCache.opportunities.add(opportunity, {merge: true});
					opp.isFetchPending = false;
					opp.isFetched = true;
					if(options.chainedSuccess) {
						if(options.context) {
							options.chainedSuccess.call(options.context, response);
						}
					}
				};
				options.error = function(error) {
					//console.log(error);
				};
				opportunity.fetch(options, {});
			}
		}
	});
	
	function getCache() {
		thisCache = thisCache || (eLeap.run.cache = new eLeap.own.Cache());
		return thisCache;
	}
	return getCache();
});

