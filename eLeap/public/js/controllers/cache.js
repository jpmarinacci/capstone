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
			this.allOpps = new Opportunities();
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
		
		fetchAllOpps: function(options) {
			options = options || {};
			if(this.allOpps.isFetched) {
				this.allOpps.trigger('reset');
			} else if(!this.allOpps.isFetchPending) {
				this.allOpps.isFetchPending = true;
				options.chainedSuccess = options.success;
				options.chainedError = options.error;
				options.success = function(response) {
					thisCache.allOpps.isFetchPending = false;
					thisCache.allOpps.isFetched = true;
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
				this.allOpps.fetch(options, {});
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
					if(joinedOppsRetriever && joinedOppsRetriever.models){
						var cachedJoinedOpps = new Opportunities();
						joinedOppsRetriever.each(function(opp) {
							opp.set('isJoined', true);
							var addedJoinedOpp = thisCache.allOpps.add(opp, {merge: true});
							addedJoinedOpp.isFetched = true;
							cachedJoinedOpps.add(addedJoinedOpp);
						});
						thisCache.joinedOpps.reset(cachedJoinedOpps.models);
					} else if(response && response.status){
						thisCache.joinedOpps.trigger('reset');
					}
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
				var joinedOppsRetriever = new Opportunities();
				joinedOppsRetriever.fetch(options);
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
					if(ownedOppsRetriever && ownedOppsRetriever.models){
						var cachedOwnedOpps = new Opportunities();
						ownedOppsRetriever.each(function(opp) {
							var addedOwnedOpp = thisCache.allOpps.add(opp, {merge: true});
							addedOwnedOpp.isFetched = true;
							cachedOwnedOpps.add(addedOwnedOpp);
						});
						thisCache.ownedOpps.reset(cachedOwnedOpps.models);
					}
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
				var ownedOppsRetriever = new Opportunities();
				ownedOppsRetriever.fetch(options);
			}
		},
		
		getOpportunity: function(options) {
			options = options || {};
			var opportunity;
			if(options.opportunity) {
				opportunity = this.allOpps.get(options.opportunity);
			}
			if(options.opportunityId) {
				opportunity = this.allOpps.get(options.opportunityId);
			}
			if(!opportunity) {
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
					var opp = thisCache.allOpps.add(opportunity, {merge: true});
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

