/** 
* @authors: JP Marinacci
* 			Belete Zegeye 
*/

define(['jquery', 'underscore', 'backbone', 'eLeap', 'controllers/restServer'],
	function ($, _, Backbone, eLeap, server) { 'use strict';
		
	eLeap.own.CollegeClass = Backbone.Model.extend({
		
		idAttribute: "classId",

		defaults: {
			className: "",
			courseSummary: null,
			estimatedClassSize: null,
			ownerId : 0,
			section: null,
			term: null,
			year: 0
		},
		
		routes: {
			createClass: "/createClass",
			getOwnedClasses: "/getOwnedClasses",
			updateClass: "/updateClass",
			deleteClass: "/deleteClass"
		},
		
		sync: function (method, thisModel, options) {
			options = options || {};
			if(method === 'read') {
				var ownedClassInput = {
					ownerId: options.ownerId
				};
				server.postRoute(this.routes.getOwnedClasses, this.toJSON(), function (response) {
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
			} else if(method === 'create') {
				var createClassInput = this.toJSON();
				createClassInput.ownerId = options.ownerId;
				server.postRoute(this.routes.createClass, createClassInput, function (response) {
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
				server.postRoute(this.routes.updateClass, this.toJSON(), function (response) {
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
				server.postRoute(this.routes.deleteClass, this.toJSON(), function (response) {
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
		},
		
		parse: function (dbClass) {
			//optional
			return dbClass;
		}
		
	});

	return eLeap.own.CollegeClass;
});

