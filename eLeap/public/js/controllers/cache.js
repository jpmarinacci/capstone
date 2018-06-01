/** 
 * @author: JP Marinacci
 */


define(['jquery', 'underscore', 'backbone', 'eLeap', 'controllers/user', 'collections/roles',
	'collections/opportunities', 'models/opportunity'],
	function ($, _, Backbone, eLeap, user, Roles, Opportunities, Opportunity) { 'use strict';
	
	var thisCache = undefined;
	
	eLeap.own.Cache = Backbone.Model.extend({
		
		initialize: function(options) {
			options = options || {};
			this.roles = new Roles();
			this.emptyCache();
		},
		
		emptyCache: function() {
			this.opportunities = new Opportunities();
			this.joinedOpps = new Opportunities();
			this.ownedOpps = new Opportunities();
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
		
		fetchJoinedOpportunities: function(options) {
			options = options || {};
			if(this.joinedOpps.isFetched) {
				this.joinedOpps.trigger('reset');
			} else if(!this.joinedOpps.isFetchPending) {
				this.joinedOpps.isFetchPending = true;
				options.chainedSuccess = options.success;
				options.chainedError = options.error;
				options.success = function(response) {
					thisCache.joinedOpps.isFetchPending = false;
					thisCache.joinedOpps.isFetched = true;
					thisCache.joinedOpps.each(function(opp) {
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
				options.isJoined = true;
				options.personId = user.person.get('personId');
				this.joinedOpps.fetch(options, {});
			}
		},
		
		fetchOwnedOpportunities: function(options) {
			options = options || {};
			if(this.ownedOpps.isFetched) {
				this.ownedOpps.trigger('reset');
			} else if(!this.ownedOpps.isFetchPending) {
				this.ownedOpps.isFetchPending = true;
				options.chainedSuccess = options.success;
				options.chainedError = options.error;
				options.success = function(response) {
					thisCache.ownedOpps.isFetchPending = false;
					thisCache.ownedOpps.isFetched = true;
					thisCache.ownedOpps.each(function(opp) {
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
				options.isOwned = true;
				options.personId = user.person.get('personId');
				this.ownedOpps.fetch(options, {});
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
				options.personId = user.person.get('personId');
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

