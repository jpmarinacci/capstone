/** 
 *	@authors: Belete Zegeye
 */

define(['underscore', 'backbone', 'eLeap', 'controllers/restServer', 'models/community'],
	function (_, Backbone, eLeap, server, Community) { 'use strict';

	eLeap.own.Communities = Backbone.Collection.extend({
		
		model: Community,
		
		routes: {
			getCommunities: "/getCommunities"
		},
		
		sync: function (method, thisCollection, options) {
			options = options || {};
			if(method === 'read') {
				server.postRoute(this.routes.getCommunities, this.toJSON(), function (response) {
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

	return eLeap.own.Communities;
});

