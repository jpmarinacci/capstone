/** 
 *	@author: JP Marinacci
 */

define(['underscore', 'backbone', 'eLeap', 'controllers/restServer', 'models/role'],
	function (_, Backbone, eLeap, server, Role) { 'use strict';

	eLeap.own.Roles = Backbone.Collection.extend({
		
		model: Role,
		
		routes: {
			getRoles: "/getRoles"
		},
		
		sync: function (method, thisCollection, options) {
			options = options || {};
			if(method === 'read') {
				server.postRoute(this.routes.getRoles, this.toJSON(), function (response) {
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

	return eLeap.own.Roles;
});

