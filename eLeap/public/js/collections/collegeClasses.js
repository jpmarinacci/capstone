/** 
 *	@authors: JP Marinacci
 */

define(['underscore', 'backbone', 'eLeap', 'controllers/restServer', 'models/collegeClass'],
	function (_, Backbone, eLeap, server, CollegeClass) { 'use strict';

	eLeap.own.CollegeClasses = Backbone.Collection.extend({
		
		model: CollegeClass,
		
		routes: {
			getJoinedClasses: "/getJoinedClasses",
			getOwnedClasses: "/getOwnedClasses"
		},
		
		sync: function (method, thisCollection, options) {
			options = options || {};
			if(method === 'read') {
				if(options && options .ownerId) {
					var getClassesInput = {
						ownerId: options.ownerId
					};
					server.postRoute(this.routes.getOwnedClasses, getClassesInput, function (response) {
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
			} else if(options && options.studentId) {
				var getClassesInput = {
					personId: options.studentId
				};
				server.postRoute(this.routes.getJoinedClasses, getClassesInput, function (response) {
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
		});

	return eLeap.own.CollegeClasses;
});

