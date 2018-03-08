/** 
* @authors: JP Marinacci
* 			Belete Zegeye 
*/

define(['jquery', 'underscore', 'backbone', 'eLeap', 'controllers/restServer'],
	function ($, _, Backbone, eLeap, server) { 'use strict';
		
	eLeap.own.CollegeClass = Backbone.Model.extend({
		
		idAttribute: "classId",

		defaults: {
			className: ""
		},
		
		routes: {
			createClass: "/createClass",
			getClass: "/getClass",
			updateClass: "/udpateClass",
			deleteClass: "/deleteClass"
		},
		
		sync: function (method, thisModel, options) {
			options = options || {};
			if(method === 'create') {
				server.postRoute(this.routes.createClass, this.toJSON(), function (response) {
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
				server.postRoute(this.routes.updatecollegeClass, this.toJSON(), function (response) {
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
				server.postRoute(this.routes.readcollegeClass, this.toJSON(), function (response) {
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
				server.postRoute(this.routes.updateCcollegeClass, this.toJSON(), function (response) {
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
			return this.translateCollegeClassFromDB(dbClass);
		},
		
		translateCollegeClassFromDB: function(dbClass){
			var jsonClass = {};
			if(dbClass.CollegeClassID)				jsonClass.collegeClassId = dbClass.CollegeClassID;
			if(dbClass.ClassName)					jsonClass.className = dbClass.ClassName;
			if(dbClass.CollegeClassName)			jsonClass.collegeClassName = dbClass.CollegeClassName;
			return jsonClass;
		},
		
		translateCollegeClassToDB: function(jsonClass){
			var dbClass = {};
			if(jsonClass.collegeClassId)			dbClass.CollegeClassID = jsonClass.collegeClassId;
			if(jsonClass.className)					dbClass.ClassName = jsonClass.className;
			if(jsonClass.collegeClassName)			dbClass.CollegeClassName = jsonClass.collegeClassName;
			return dbClass;
		}
	});

	return eLeap.own.CollegeClass;
});

