/** 
 *	@authors: JP Marinacci, Belete Zegeye
 */

define(['underscore', 'backbone', 'eLeap', 'controllers/restServer', 'models/person'],
	function (_, Backbone, eLeap, server, Person) { 'use strict';

	eLeap.own.Persons = Backbone.Collection.extend({
		
		model: Person,
		
		routes: {
			getAllPersons: "/getAllPersons",
			getStudentsForClass: "/getStudentsForClass"
		},
		
		sync: function (method, thisCollection, options) {
			options = options || {};
			if(method === 'read') {
				if(options.classId) {
					var getStudentsInput = {
						classId: options.classId,
						ownerId: options.ownerId
					};
					server.postRoute(this.routes.getStudentsForClass, getStudentsInput, function (response) {
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
					server.postRoute(this.routes.getAllPersons, this.toJSON(), function (response) {
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
		}
	});

	return eLeap.own.Persons;
});

