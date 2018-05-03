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
			isRequredForClass: false,
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
			pay: 0,
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
			//return this.parseOppFromDB(dbOpportunity);
		},
		
		parseOppFromDB: function(dbOpportunity){
			var jsonOpportunity = {};
			/*jsonOpportunity.agencyCommitment = dbOpportunity.,
			jsonOpportunity.applicationDueDate = dbOpportunity.,
			jsonOpportunity.availableSeats = dbOpportunity.,
			jsonOpportunity.classId = dbOpportunity.,
			jsonOpportunity.className = dbOpportunity.,
			jsonOpportunity.classType = dbOpportunity.,
			jsonOpportunity.classYear = dbOpportunity.,
			jsonOpportunity.courseSummary = dbOpportunity.,
			jsonOpportunity.createDate = dbOpportunity.,
			jsonOpportunity.deliverables = dbOpportunity.,
			jsonOpportunity.description = dbOpportunity.,
			jsonOpportunity.donation = dbOpportunity.,
			jsonOpportunity.duration = dbOpportunity.,
			jsonOpportunity.endDateTime = dbOpportunity.,
			jsonOpportunity.estimatedClassSize = dbOpportunity.,
			jsonOpportunity.examples = dbOpportunity.,
			jsonOpportunity.hoursRequired = dbOpportunity.,
			jsonOpportunity.isClass = dbOpportunity.,
			jsonOpportunity.isRequredForClass = dbOpportunity.,
			jsonOpportunity.isPaid = dbOpportunity.,
			jsonOpportunity.isServiceLearning = dbOpportunity.,
			jsonOpportunity.isTeams = dbOpportunity.,
			jsonOpportunity.isVirtual = dbOpportunity.,
			jsonOpportunity.latitude = dbOpportunity.,
			jsonOpportunity.location = dbOpportunity.,
			jsonOpportunity.longitude = dbOpportunity.,
			jsonOpportunity.minimumPersonsRequired = dbOpportunity.,
			jsonOpportunity.notAllowed = dbOpportunity.,
			jsonOpportunity.notes = dbOpportunity.,
			jsonOpportunity.numTeams = dbOpportunity.,
			jsonOpportunity.onBoarding = dbOpportunity.,
			jsonOpportunity.opportunityType = dbOpportunity.,
			ownerId = dbOpportunity.,
			jsonOpportunity.pay = dbOpportunity.,
			jsonOpportunity.preferredAgencyType = dbOpportunity.,
			jsonOpportunity.preferredServiceWorkType = dbOpportunity.,
			jsonOpportunity.recurrence = dbOpportunity.,
			jsonOpportunity.requirments = dbOpportunity.,
			jsonOpportunity.startDateTime = dbOpportunity.,
			jsonOpportunity.statusId = dbOpportunity.,
			jsonOpportunity.supportDescription = dbOpportunity.,
			jsonOpportunity.supportPreference = dbOpportunity.,
			jsonOpportunity.teamSize = dbOpportunity.,
			jsonOpportunity.term = dbOpportunity.,
			jsonOpportunity.timePeriodEndDate = dbOpportunity.,
			jsonOpportunity.timePeriodStartDate = dbOpportunity.,	
			jsonOpportunity.title = dbOpportunity.,
			jsonOpportunity.totalSeats = dbOpportunity.*/
			return jsonOpportunity;
		}
	});

	return eLeap.own.Opportunity;
});
