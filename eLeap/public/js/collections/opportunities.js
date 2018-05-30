/** 
 *	@authors: JP Marinacci
 * 			  Belete Zegeye
 */

define(['underscore', 'backbone', 'eLeap', 'controllers/restServer', 'models/opportunity'],
	function (_, Backbone, eLeap, server, Opportunity) { 'use strict';

	eLeap.own.Opportunities = Backbone.Collection.extend({
		
		model: Opportunity,
		//comparator: 'createDate',
		comparator : function() {
			return this.get('createDate');
		},
		
		routes: {
			getAllOpportunities: '/getAllOpportunities',
			getMyOpportunities: '/getMyOpportunities'
		},
		
		sync: function (method, thisCollection, options) {
			options = options || {};
			if(method === 'read') {
				server.postRoute(this.routes.getAllOpportunities, this.toJSON(), function (response) {
					if (response.status && response.status !== "success") {
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
	});

	return eLeap.own.Opportunities;
});

