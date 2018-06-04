/** 
 *	@authors: JP Marinacci
 * 			  Belete Zegeye
 */

define(['underscore', 'backbone', 'eLeap', 'controllers/restServer', 'models/opportunity'],
	function (_, Backbone, eLeap, server, Opportunity) { 'use strict';

	eLeap.own.Opportunities = Backbone.Collection.extend({
		
		model: Opportunity,
		comparator : function(opp) {
			return - opp.get('createDate');
		},
		
		routes: {
			getAllOpportunities: '/getAllOpportunities',
			getOwnedOpportunities: '/getOwnedOpportunities',
			getJoinedOpportunities: '/getJoinedOpportunities'
		},
		
		sync: function (method, thisCollection, options) {
			options = options || {};
			if(method === 'read') {
				if(options.isOwned){
					server.postRoute(this.routes.getOwnedOpportunities, options, function (response) {
						if (!response || response.status && response.status !== "success") {
							if (options.appError) {
								options.appError(response);
							}
						} else {
							if (options.success) {
								if(options.context) {
									options.call(options.success, context);
								} else {
									options.success(response);
								}
							}
						}
					}, function (error) {
						if (options.error) {
							options.error(error);
						}
					});
				} else if(options.isJoined) {
					server.postRoute(this.routes.getJoinedOpportunities, options, function (response) {
						if (!response || response.status && response.status !== "success") {
							if (options.appError) {
								options.appError(response);
							}
						} else {
							if (options.success) {
								if(options.context) {
									options.call(options.success, context);
								} else {
									options.success(response);
								}
							}
						}
					}, function (error) {
						if (options.error) {
							options.error(error);
						}
					});
				} else {
					server.postRoute(this.routes.getAllOpportunities, this.toJSON(), function (response) {
						if (!response || response.status && response.status !== "success") {
							if (options.appError) {
								options.appError(response);
							}
						} else {
							if (options.success) {
								if(options.context) {
									options.call(options.success, context);
								} else {
									options.success(response);
								}
							}
						}
					}, function (error) {
						if (options.error) {
							options.error(error);
						}
					});
				}
			}
		}
	});

	return eLeap.own.Opportunities;
});

