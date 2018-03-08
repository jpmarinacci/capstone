/** 
* @authors: JP Marinacci
* 			Belete Zegeye 
*/

define(['jquery', 'underscore', 'backbone', 'eLeap', 'controllers/restServer'],
	function ($, _, Backbone, eLeap, server) { 'use strict';
		
	eLeap.own.ApplicationState = Backbone.Model.extend({
		
		idAttribute: "applicationStateId",

		defaults: {
			themeData: "",
			themeDescription: ""
		},
		
		routes: {
			getApplicationState: "/getApplicationState",
			updateTheme: "/updateApplicationState",
		},
		
		sync: function (method, thisModel, options) {
			options = options || {};
			if(method === 'read') {
				server.postRoute(this.routes.getApplicationState, this.toJSON(), function (response) {
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
				server.postRoute(this.routes.updateTheme, this.toJSON(), function (response) {
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
		parse: function (dbApplicationState) {
			return this.translateApplicatonStateClassFromDB(dbApplicationState);
		},
		
		translateApplicatonStateFromDB: function(dbApplicationState){
			var jsonApplicationState = {};
			if(dbApplicationState.ApplicatonStateID)			jsonApplicationState.applicatonStateId = dbApplicationState.ApplicatonStateID;
			if(dbApplicationState.ThemeData)					jsonApplicationState.themeData = dbApplicationState.ThemeData;
			if(dbApplicationState.ThemeDescription)				jsonApplicationState.themeDescription = dbApplicationState.ThemeDescription;
			return jsonApplicationState;
		},
		
		translateApplicatonStateToDB: function(jsonApplicationState){
			var dbApplicationState = {};
			if(jsonApplicationState.applicatonStateID)			dbApplicationState.ApplicatonStateID = jsonApplicationState.applicatonStateId;
			if(jsonApplicationState.themeData)					dbApplicationState.ThemeData = jsonApplicationState.themeData;
			if(jsonApplicationState.themeDescription)			dbApplicationState.ThemeDescription = jsonApplicationState.themeDescription;
			return dbApplicationState;
		}
	});

	return eLeap.own.applicationState;
});

