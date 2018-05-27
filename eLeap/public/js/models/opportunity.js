/**
 * @authors: JP Marinacci
 * 			Belete Zegeye
 */

define(['jquery', 'underscore', 'backbone', 'eLeap', 'controllers/restServer'], 
	function($, _, Backbone, eLeap, server) { 'use strict';

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
			requirements: "",
			startDateTime: undefined,
			status: 'pending',
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
			deleteOpportunity: "/deleteOpportunity",
			joinOpportunity: "/joinOpportunity",
			leaveOpportunity: "/leaveOpportunity",
			getOpportunityHours: "/getOpportunityHours",
		},

		sync: function(method, thisModel, options) {
			options = options || {};
			if (method === 'create') {
				server.postRoute(this.routes.createOpportunity, this.parseOppToDB(), function(response) {
					if (response.status && response.status !== "success") {
						if (options.appError) {
							options.appError(response);
						}
					} else {
						if (options.success) {
							if (options.context) {
								options.call(options.success, context);
							} else {
								options.success(response);
							}
						}
					}
				}, function(error) {
					if (options.error) {
						options.error(error);
					}
				});
			} else if (method === 'read') {
				server.postRoute(this.routes.getOpportunity, this.toJSON(), function(response) {
					if (response.status && response.status !== "success") {
						if (options.appError) {
							options.appError(response);
						}
					} else {
						if (options.success) {
							if (options.context) {
								options.call(options.success, context);
							} else {
								options.success(response);
							}
						}
					}
				}, function(error) {
					if (options.error) {
						options.error(error);
					}
				});
			} else if (method === 'update') {
				server.postRoute(this.routes.updateOpportunity, this.toJSON(), function(response) {
					if (response.status && response.status !== "success") {
						if (options.appError) {
							options.appError(response);
						}
					} else {
						if (options.success) {
							if (options.context) {
								options.call(options.success, context);
							} else {
								options.success(response);
							}
						}
					}
				}, function(error) {
					if (options.error) {
						options.error(error);
					}
				});
			} else if (method === 'delete') {
				server.postRoute(this.routes.deleteOpportunity, this.toJSON(), function(response) {
					if (response.status && response.status !== "success") {
						if (options.appError) {
							options.appError(response);
						}
					} else {
						if (options.success) {
							if (options.context) {
								options.call(options.success, context);
							} else {
								options.success(response);
							}
						}
					}
				}, function(error) {
					if (options.error) {
						options.error(error);
					}
				});
			}
		},

		joinOpportuntiy: function(options) {
			var options = options || {};
			var joinInputs = {
				opportunityId: this.get('opportunityId'),
				personId: options.personId
			};
			server.postRoute(this.routes.joinOpportunity, joinInputs, function(response) {
				if (response.status && response.status !== "success") {
					if (options.appError) {
						options.appError(response);
					}
				} else {
					if (options.success) {
						if (options.context) {
							options.call(options.success, context);
						} else {
							options.success(response);
						}
					}
				}
			}, function(error) {
				if (options.error) {
					options.error(error);
				}
			});
		},
		leaveOpportuntiy: function(options) {
			var options = options || {};
			var joinInputs = {
				opportunityId: this.get('opportunityId'),
				personId: options.personId
			};
			server.postRoute(this.routes.leaveOpportunity, leaveInputs, function(response) {
				if (response.status && response.status !== "success") {
					if (options.appError) {
						options.appError(response);
					}
				} else {
					if (options.success) {
						if (options.context) {
							options.call(options.success, context);
						} else {
							options.success(response);
						}
					}
				}
			}, function(error) {
				if (options.error) {
					options.error(error);
				}
			});
		},

		parse: function(dbOpportunity) {
			return this.parseOppFromDB(dbOpportunity);
		},

		parseOppToDB: function() {
			var dbOpp = this.toJSON();

			dbOpp.isClass = dbOpp.isClass ? 1 : 0;
			dbOpp.isRequiredForClass = dbOpp.isRequiredForClass ? 1 : 0;
			dbOpp.isPaid = dbOpp.isPaid ? 1 : 0;
			dbOpp.isServiceLearning = dbOpp.isServiceLearning ? 1 : 0;
			dbOpp.isTeams = dbOpp.isTeams ? 1 : 0;
			dbOpp.isVirtual = dbOpp.isVirtual ? 1 : 0;

			return dbOpp;
		},

		parseOppFromDB: function(dbOpportunity) {
			var jsonOpp = dbOpportunity;

			if (jsonOpp.applicationDueDate)		jsonOpp.applicationDueDate = new Date(jsonOpp.applicationDueDate);
			if (jsonOpp.availableSeats)			jsonOpp.availableSeats = Number(jsonOpp.availableSeats);
			if (jsonOpp.classId)				jsonOpp.classId = Number(jsonOpp.classId);
			if (jsonOpp.classYear)				jsonOpp.classYear = Number(jsonOpp.classYear);
			if (jsonOpp.createDate)				jsonOpp.createDate = new Date(jsonOpp.createDate);
			if (jsonOpp.donation)				jsonOpp.donation = Number(jsonOpp.donation);
			if (jsonOpp.duration)				jsonOpp.duration = Number(jsonOpp.duration);
			if (jsonOpp.endDateTime)			jsonOpp.endDateTime = new Date(jsonOpp.endDateTime);
			if (jsonOpp.estimatedClassSize)		jsonOpp.estimatedClassSize = Number(jsonOpp.estimatedClassSize);
			if (jsonOpp.hoursRequired)			jsonOpp.hoursRequired = Number(jsonOpp.hoursRequired);
			if (jsonOpp.isClass)				jsonOpp.isClass = jsonOpp.isClass ? true : false;
			if (jsonOpp.isRequiredForClass)		jsonOpp.isRequiredForClass = jsonOpp.isRequiredForClass ? true : false;
			if (jsonOpp.isPaid)					jsonOpp.isPaid = jsonOpp.isPaid ? true : false;
			if (jsonOpp.isServiceLearning)		jsonOpp.isServiceLearning = jsonOpp.isServiceLearning ? true : false;
			if (jsonOpp.isTeams)				jsonOpp.isTeams = jsonOpp.isTeams ? true : false;
			if (jsonOpp.isVirtual) 				jsonOpp.isVirtual = jsonOpp.isVirtual ? true : false;
			if (jsonOpp.latitude)				jsonOpp.latitude = Number(jsonOpp.latitude);
			if (jsonOpp.longitude)				jsonOpp.longitude = Number(jsonOpp.longitude);
			if (jsonOpp.minimumPersonsRequired)	jsonOpp.minimumPersonsRequired = Number(jsonOpp.minimumPersonsRequired);
			if (jsonOpp.numTeams)				jsonOpp.numTeams = Number(jsonOpp.numTeams);
			if (jsonOpp.opportunityId)			jsonOpp.opportunityId = Number(jsonOpp.opportunityId);
			if (jsonOpp.ownerId)				jsonOpp.ownerId = Number(jsonOpp.ownerId);
			if (jsonOpp.personName)				jsonOpp.ownerName = jsonOpp.personName;
			if (jsonOpp.pay)					jsonOpp.pay = Number(jsonOpp.pay);
			if (jsonOpp.startDateTime)			jsonOpp.startDateTime = new Date(jsonOpp.startDateTime);
			if (jsonOpp.status)					jsonOpp.status = jsonOpp.status;
			if (jsonOpp.teamSize)				jsonOpp.teamSize = Number(jsonOpp.teamSize);
			if (jsonOpp.timePeriodEndDate)		jsonOpp.timePeriodEndDate = new Date(jsonOpp.timePeriodEndDate);
			if (jsonOpp.timePeriodStartDate)	jsonOpp.timePeriodStartDate = new Date(jsonOpp.timePeriodStartDate);
			if (jsonOpp.totalSeats)				jsonOpp.totalSeats = Number(jsonOpp.totalSeats);

			return jsonOpp;
		}
	});

	return eLeap.own.Opportunity;
});
