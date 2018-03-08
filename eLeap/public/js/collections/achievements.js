/**
 *	@authors: Belete Zegeye
 */

define(['underscore', 'backbone', 'eLeap', 'controllers/restServer', 'models/achievement'],
 function(_, Backbone, eLeap, server, Achievement) {'use strict';

	eLeap.own.Achievements = Backbone.Collection.extend({

		model : Achievement,

		routes : {
			getAchievements : "/getAchievements"
		},

		sync : function(method, thisCollection, options) {
			options = options || {};
			if (method === 'read') {
				server.postRoute(this.routes.getAchievements, this.toJSON(), function(response) {
					if (response.status && response.status !== "success") {
						if (options.appError) {
							options.appError(response);
						}
					} else {
						if (options.success) {
							if (options.context) {
								options.call(options.success, context);
							} else {
								options.success(response);
							}
						}
					}
				}, function(error) {
					if (options.error) {
						options.error(error);
					}
				});
			}
		}
	});

	return eLeap.own.Achievements;
});

