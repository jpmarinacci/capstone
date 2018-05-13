/**
* @authors: JP Marinacci 
* 			Belete Zegeye 
*/

define(['jquery', 'underscore', 'backbone', 'eLeap', 'controllers/restServer'],
	function ($, _, Backbone, eLeap, server) { 'use strict';
		
	eLeap.own.Opportunity = Backbone.Model.extend({
		
		idAttribute: "opportunityId",

		defaults: {
			agencyCommitment: "",
			applicationDueDate: undefined,
			availableSeats: 0,
			classId: 0,
			className: "",
			classType: "",
			classYear: 0,
			courseSummary: "",
			createDate: undefined,
			deliverables: "",
			description: "",
			donation: 0,
			duration: 0,
			endDateTime: undefined,
			estimatedClassSize: 0,
			examples: "",
			hoursRequired: 0,
			isClass: false,
			isRequiredForClass: false,
			isPaid: false,
			isServiceLearning: false,
			isTeams: false,
			isVirtual: false,
			latitude: undefined,
			location: "",
			longitude: undefined,
			minimumPersonsRequired: 0,
			notAllowed: "",
			notes: "",
			numTeams: 0,
			onBoarding: "",
			opportunityType: "",
			ownerId: 0,
			ownerName: "",
			payAmount: 0,
			preferredAgencyType: "",
			preferredServiceWorkType: "",
			recurrence: "",
			requirments: "",
			startDateTime: undefined,
			statusId: 0,
			supportDescription: "",
			supportPreference: "",
			teamSize: 0,
			term: "",
			timePeriodEndDate: undefined,
			timePeriodStartDate: undefined,	
			title: "",
			totalSeats: 0
		},
		
		routes: { //CRUD rest call route signatures
			createOpportunity: "/createOpportunity",
			getOpportunity: "/getOpportunity",
			updateOpportunity: "/updateOpportunity",
			deleteOpportunity: "deleteOpportunity"
		},
		
		sync: function (method, thisModel, options) {
			options = options || {};
			if(method === 'create') {
				server.postRoute(this.routes.createOpportunity, this.toJSON(), function (response) {
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
				server.postRoute(this.routes.getOpportunity, this.toJSON(), function (response) {
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
				server.postRoute(this.routes.updateOpportunity, this.toJSON(), function (response) {
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
			} else if(method === 'delete'){
				server.postRoute(this.routes.deleteOpportunity, this.toJSON(), function (response) {
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
		
		parse: function (dbOpportunity) {
			return this.parseOppFromDB(dbOpportunity);
		},
		
		parseOppFromDB: function(dbOpportunity){
			var jsonOpportunity = dbOpportunity;
			if(jsonOpportunity.applicationDueDate)		jsonOpportunity.applicationDueDate = new Date(jsonOpportunity.applicationDueDate);
			if(jsonOpportunity.availableSeats)			jsonOpportunity.availableSeats = Number(jsonOpportunity.availableSeats);
			if(jsonOpportunity.classId)					jsonOpportunity.classId = Number(jsonOpportunity.classId);
			if(jsonOpportunity.classYear)				jsonOpportunity.classYear = Number(jsonOpportunity.classYear);
			if(jsonOpportunity.createDate)				jsonOpportunity.createDate = new Date(jsonOpportunity.createDate);
			if(jsonOpportunity.donation)				jsonOpportunity.donation = Number(jsonOpportunity.donation);
			if(jsonOpportunity.duration)				jsonOpportunity.duration = Number(jsonOpportunity.duration);
			if(jsonOpportunity.endDateTime)				jsonOpportunity.endDateTime = new Date(jsonOpportunity.endDateTime);
			if(jsonOpportunity.estimatedClassSize)		jsonOpportunity.estimatedClassSize = Number(jsonOpportunity.estimatedClassSize);
			if(jsonOpportunity.hoursRequired)			jsonOpportunity.hoursRequired = Number(jsonOpportunity.hoursRequired);
			if(jsonOpportunity.isClass)					jsonOpportunity.isClass = jsonOpportunity.isClass? true: false;
			if(jsonOpportunity.isRequredForClass)		jsonOpportunity.isRequredForClass = jsonOpportunity.isRequredForClass? true: false;
			if(jsonOpportunity.isPaid)					jsonOpportunity.isPaid = jsonOpportunity.isPaid? true: false;
			if(jsonOpportunity.isServiceLearning)		jsonOpportunity.isServiceLearning = jsonOpportunity.isServiceLearning? true: false;
			if(jsonOpportunity.isTeams)					jsonOpportunity.isTeams = jsonOpportunity.isTeams? true: false;
			if(jsonOpportunity.isVirtual)				jsonOpportunity.isVirtual = jsonOpportunity.isVirtual? true: false;
			if(jsonOpportunity.latitude)				jsonOpportunity.latitude = Number(jsonOpportunity.latitude);
			if(jsonOpportunity.longitude)				jsonOpportunity.longitude = Number(jsonOpportunity.longitude);
			if(jsonOpportunity.minimumPersonsRequired)	jsonOpportunity.minimumPersonsRequired = Number(jsonOpportunity.minimumPersonsRequired);
			if(jsonOpportunity.numTeams)				jsonOpportunity.numTeams = Number(jsonOpportunity.numTeams);
			if(jsonOpportunity.ownerId)					jsonOpportunity.ownerId = Number(jsonOpportunity.ownerId);
			if(jsonOpportunity.ownerName)				jsonOpportunity.ownerName = jsonOpportunity.ownerName;
			if(jsonOpportunity.pay)						jsonOpportunity.pay = Number(jsonOpportunity.pay);
			if(jsonOpportunity.startDateTime)			jsonOpportunity.startDateTime = new Date(jsonOpportunity.startDateTime);
			if(jsonOpportunity.statusId)				jsonOpportunity.statusId = Number(jsonOpportunity.statusId);
			if(jsonOpportunity.teamSize)				jsonOpportunity.teamSize = Number(jsonOpportunity.teamSize);
			if(jsonOpportunity.timePeriodEndDate)		jsonOpportunity.timePeriodEndDate = new Date(jsonOpportunity.timePeriodEndDate);
			if(jsonOpportunity.timePeriodStartDate)		jsonOpportunity.timePeriodStartDate = new Date(jsonOpportunity.timePeriodStartDate);
			if(jsonOpportunity.totalSeats)				jsonOpportunity.totalSeats = Number(jsonOpportunity.totalSeats);
			return jsonOpportunity;
		}
	});

	return eLeap.own.Opportunity;
});
