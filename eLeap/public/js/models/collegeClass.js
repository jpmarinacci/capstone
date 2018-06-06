/** 
* @authors: JP Marinacci
* 			Belete Zegeye 
*/

define(['jquery', 'underscore', 'backbone', 'eLeap', 'models/person', 'controllers/restServer'],
	function ($, _, Backbone, eLeap, Person, server) { 'use strict';
		
	eLeap.own.CollegeClass = Backbone.Model.extend({
		
		idAttribute: "classId",

		defaults: {
			className: "",
			classType: "",
			courseSummary: "",
			estimatedClassSize: 0,
			ownerId : 0,
			section: "",
			term: "",
			year: 0
		},
		
		routes: {
			createClass: "/createClass",
			getOwnedClasses: "/getOwnedClasses",
			updateClass: "/updateClass",
			deleteClass: "/deleteClass",
			addStudent: "/addStudent",
			removeStudent: "/removeStudent"
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
		},
		
		addStudent: function(options) {
			var thisModel = this;
			server.postRoute(this.routes.addStudent, options, function (response) {
				if (response.status && response.status !== "success") {
					if (options.appError) {
						options.appError(response);
					}
				} else {
					if (options.success && response.email) {
						var person = new Person(response);
						options.success(person);
					}
				}
			}, function (error) {
				if (options.error) {
					options.error(error);
				}
			});
		},
		
		removeStudent: function(options) {
			var thisModel = this;
			server.postRoute(this.routes.removeStudent, options, function (response) {
				if (response.status && response.status !== "success") {
					if (options.appError) {
						options.appError(response);
					}
				} else {
					if (options.success) {
						options.success(response);
					}
				}
			}, function (error) {
				if (options.error) {
					options.error(error);
				}
			});
		},
		
		parse: function (dbClass) {
			//optional
			return dbClass;
		}
		
	});

	return eLeap.own.CollegeClass;
});

