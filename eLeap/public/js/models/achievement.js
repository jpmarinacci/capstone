/** 
* @authors: JP Marinacci
* 			Belete Zegeye 
*/

define(['jquery', 'underscore', 'backbone', 'eLeap', 'controllers/restServer'],
	function ($, _, Backbone, eLeap, server) { 'use strict';
		
	eLeap.own.Achievement = Backbone.Model.extend({
		
		idAttribute: "achievementId",

		defaults: {
			achievementName: "",
			achievementDescription: ""
		},
		
		routes: {
			createAchievement: "/createAchievement",
			getAchievement: "/getAchievement",
			updateAchievement: "/updateAchievement",
			deleteAchievement: "/deleteAchievement"
		},
		
		sync: function (method, thisModel, options) {
			options = options || {};
			if(method === 'create') {
				server.postRoute(this.routes.createAchievement, this.toJSON(), function (response) {
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
			} else if(method === 'read') {
				server.postRoute(this.routes.getAchievement, this.toJSON(), function (response) {
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
			} else if(method === 'update') {
				server.postRoute(this.routes.updateAchievement, this.toJSON(), function (response) {
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
			} else if(method === 'delete') {
				server.postRoute(this.routes.deleteAchievement, this.toJSON(), function (response) {
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

	return eLeap.own.Achievement;
});

