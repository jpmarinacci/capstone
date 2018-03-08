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
			} else if(method === 'read') {
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
		},
		parse: function (dbAchievement) {
			return this.translateAchievementClassFromDB(dbAchievement);
		},
		
		translateAchievementFromDB: function(dbAchievement){
			var jsonAchievement = {};
			if(dbAchievement.AchievementID)					jsonAchievement.achievementId = dbAchievement.AchievementID;
			if(dbAchievement.AchievementName)				jsonAchievement.achievementName = dbAchievement.AchievementName;
			if(dbAchievement.AchievementDescription)		jsonAchievement.achievementDescription = dbAchievement.AchievementDescription;
			return jsonAchievement;
		},
		
		translateAchievementToDB: function(jsonAchievement){
			var dbAchievement = {};
			if(dbAchievement.AchievementID)					jsonAchievement.achievementId = dbAchievement.AchievementID;
			if(dbAchievement.AchievementName)				jsonAchievement.achievementName = dbAchievement.AchievementName;
			if(dbAchievement.AchievementDescription)		jsonAchievement.achievementDescription = dbAchievement.AchievementDescription;
			return dbAchievement;
		}
	});

	return eLeap.own.Achievement;
});

