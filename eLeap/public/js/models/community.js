/**
* @authors: JP Marinacci
* 			Belete Zegeye 
*/

define(['jquery', 'underscore', 'backbone', 'eLeap', 'controllers/restServer'],
	function ($, _, Backbone, eLeap, server) { 'use strict';
	
	eLeap.own.Community = Backbone.Model.extend({
		
		idAttribute: "communityId",

		defaults: {
			address: "",
			communityName: "",
			contactEmail: ""
		},
		
		routes: {
			createCommunity: "/createcommunity",
			getCommunity: "/getCommunity",			
			updateCommunity: "/updatecommunity",
			deleteCommunity: "/deletecommunity"
		},
		
		sync: function (method, thisModel, options) {
			options = options || {};
			if(method === 'read') {
				server.postRoute(this.routes.getCommunity, this.toJSON(), function (response) {
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
			} else if(method === 'update'){
				server.postRoute(this.routes.updateCommunity, this.toJSON(), function (response) {
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
		parse: function (dbCommunity) {
			return this.translateCommunityFromDB(dbCommunity);
		},
		
		translateCommunityFromDB: function(dbCommunity){
			var jsonCommunity = {};
			if(dbCommunity.Address)						jsonCommunity.address = dbCommunity.Address;
			if(dbCommunity.CommunityID)					jsonCommunity.communityId = dbCommunity.CommunityID;
			if(dbCommunity.CommunityName)				jsonCommunity.communityName = dbCommunity.CommunityName;
			if(dbCommunity.ContactEmail)				jsonCommunity.contactEmail = dbCommunity.ContactEmail;
			return jsonCommunity;
		},
		
		translateCommunityToDB: function(jsonCommunity){
			var dbCommunity = {};
			if(jsonCommunity.address)					dbCommunity.Address = jsonCommunity.address;
			if(jsonCommunity.communityId)				dbCommunity.CommunityID = jsonCommunity.communityId;
			if(jsonCommunity.communityName)				dbCommunity.CommunityName = jsonCommunity.communityName;
			if(jsonCommunity.contactEmail)				dbCommunity.ContactEmail = jsonCommunity.contactEmail;
			return dbCommunity;
		}	
	});

	return eLeap.own.Community;
});

