/**
 * @authors: JP Marinacci
 * 			Belete Zegeye
 */

define(['jquery', 'underscore', 'backbone', 'eLeap', 'controllers/restServer'], 
	function($, _, Backbone, eLeap, server) { 'use strict';
	
	var thisModel = undefined;

	eLeap.own.Opportunity = Backbone.Model.extend({

		idAttribute: "opportunityId",

		defaults: {
			agencyCommitment: "",
			applicationDueDate: null,
			availableSeats: 0,
			className: "",
			classType: "",
			classYear: 0,
			courseSummary: "",
			createDate: null,
			deliverables: "",
			description: "",
			donation: 0,
			duration: 0,
			endDateTime: null,
			estimatedClassSize: 0,
			examples: "",
			hoursRequired: 0,
			isClass: false,
			isRequiredForClass: false,
			isJoined: false,
			isPaid: false,
			isServiceLearning: false,
			isTeams: false,
			isVirtual: false,
			lastModified: null,
			latitude: null,
			location: "",
			longitude: null,
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
			startDateTime: null,
			status: 'pending',
			supportDescription: "",
			supportPreference: "",
			teamSize: 0,
			term: "",
			timePeriodEndDate: null,
			timePeriodStartDate: null,
			title: "",
			totalSeats: 0
		},
		
		routes: { //CRUD rest call route signatures
			createOpportunity: "/createOpportunity",
			getOpportunity: "/getOpportunity",
			updateOpportunity: "/updateOpportunity",
			deleteOpportunity: "/deleteOpportunity",
			joinOpportunity: "/joinOpportunity",
			leaveOpportunity: "/leaveOpportunity"
		},
		
		initialize: function() {
			thisModel = this;
		},

		sync: function(method, thisModel, options) {
			options = options || {};
			if(method === 'create') {
				server.postRoute(this.routes.createOpportunity, this.parseOppToDB(), function(response) {
					if(response.serverStatus && response.serverStatus !== "success") {
						if(options.appError) {
							options.appError(response);
						}
					} else {
						require(['controllers/cache'], function(cache) {
							var parsedOpp = thisModel.parseOppFromDB(response);
							var cachedOpp = cache.opportunities.add(parsedOpp, {merge:true});
							cachedOpp.isFetched = true;
							if(options.success) {
								if(options.context) {
									options.call(options.success, context);
								} else {
									options.success(response);
								}
							}
						});
					}
				}, function(error) {
					if(options.error) {
						options.error(error);
					}
				});
			} else if(method === 'read') {
				var getOppInput = {
					opportunityId: this.get('opportunityId'),
					personId: options.personId
				};
				server.postRoute(this.routes.getOpportunity, getOppInput, function(response) {
					if(response.serverStatus && response.serverStatus !== "success") {
						if(options.appError) {
							options.appError(response);
						}
					} else {
						require(['controllers/cache'], function(cache) {
							var fetchedOpp = thisModel.parseOppFromDB(response);
							var cachedOpp = cache.opportunities.add(fetchedOpp, {merge: true});
							cachedOpp.isFetched = true;
							if(options.success) {
								if(options.context) {
									options.call(options.success, context);
								} else {
									options.success(response);
								}
							}
						});
					}
				}, function(error) {
					if(options.error) {
						options.error(error);
					}
				});
			} else if(method === 'update') {
				server.postRoute(this.routes.updateOpportunity, this.toJSON(), function(response) {
					if(response.serverStatus && response.serverStatus !== "success") {
						if(options.appError) {
							options.appError(response);
						}
					} else {
						if(options.success) {
							if(options.context) {
								options.call(options.success, context);
							} else {
								options.success(response);
							}
						}
					}
				}, function(error) {
					if(options.error) {
						options.error(error);
					}
				});
			} else if(method === 'delete') {
				server.postRoute(this.routes.deleteOpportunity, this.toJSON(), function(response) {
					if(response.status && response.status !== "success") {
						if(options.appError) {
							options.appError(response);
						}
					} else {
						if(options.success) {
							if(options.context) {
								options.call(options.success, context);
							} else {
								options.success(response);
							}
						}
					}
				}, function(error) {
					if(options.error) {
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
				if(response.status && response.status !== "success") {
					if(options.appError) {
						options.appError(response);
					}
				} else {
					if(options.success) {
						if(options.context) {
							options.call(options.success, context);
						} else {
							options.success(response);
						}
					}
				}
			}, function(error) {
				if(options.error) {
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
				if(response.status && response.status !== "success") {
					if(options.appError) {
						options.appError(response);
					}
				} else {
					if(options.success) {
						if(options.context) {
							options.call(options.success, context);
						} else {
							options.success(response);
						}
					}
				}
			}, function(error) {
				if(options.error) {
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

		parseOppFromDB: function(dbOpp) {
			var jsonOpp = {};
			if(dbOpp.agencyCommitment)			jsonOpp.agencyCommitment = dbOpp.agencyCommitment;
			if(dbOpp.applicationDueDate)		jsonOpp.applicationDueDate = new Date(dbOpp.applicationDueDate);
			if(dbOpp.availableSeats)			jsonOpp.availableSeats = Number(dbOpp.availableSeats);
			if(dbOpp.className)					jsonOpp.className = dbOpp.className;
			if(dbOpp.classType)					jsonOpp.classType = dbOpp.classType;
			if(dbOpp.classYear)					jsonOpp.classYear = Number(dbOpp.classYear);
			if(dbOpp.courseSummary)				jsonOpp.courseSummary = dbOpp.courseSummary;
			if(dbOpp.createDate)				jsonOpp.createDate = new Date(dbOpp.createDate);
			if(dbOpp.deliverables)				jsonOpp.deliverables = dbOpp.deliverables;
			if(dbOpp.description)				jsonOpp.description = dbOpp.description;
			if(dbOpp.donation)					jsonOpp.donation = Number(dbOpp.donation);
			if(dbOpp.duration)					jsonOpp.duration = Number(dbOpp.duration);
			if(dbOpp.endDateTime)				jsonOpp.endDateTime = new Date(dbOpp.endDateTime);
			if(dbOpp.estimatedClassSize)		jsonOpp.estimatedClassSize = Number(dbOpp.estimatedClassSize);
			if(dbOpp.examples)					jsonOpp.examples = dbOpp.examples;
			if(dbOpp.hoursRequired)				jsonOpp.hoursRequired = Number(dbOpp.hoursRequired);
			if(dbOpp.isClass)					jsonOpp.isClass = Number(dbOpp.isClass) ? true : false;
			if(dbOpp.isJoined)					jsonOpp.isJoined = Number(dbOpp.isJoined) ? true: false;
			if(dbOpp.isPaid)					jsonOpp.isPaid = Number(dbOpp.isPaid) ? true : false;
			if(dbOpp.isRequiredForClass)		jsonOpp.isRequiredForClass = Number(dbOpp.isRequiredForClass) ? true : false;
			if(dbOpp.isServiceLearning)			jsonOpp.isServiceLearning = Number(dbOpp.isServiceLearning) ? true : false;
			if(dbOpp.isTeams)					jsonOpp.isTeams = Number(dbOpp.isTeams) ? true : false;
			if(dbOpp.isVirtual) 				jsonOpp.isVirtual = Number(dbOpp.isVirtual) ? true : false;
			if(dbOpp.lastModified)				jsonOpp.lastModified = new Date(dbOpp.lastModified);
			if(dbOpp.latitude)					jsonOpp.latitude = Number(dbOpp.latitude);
			if(dbOpp.location)					jsonOpp.location = dbOpp.location;
			if(dbOpp.longitude)					jsonOpp.longitude = Number(dbOpp.longitude);
			if(dbOpp.minimumPersonsRequired)	jsonOpp.minimumPersonsRequired = Number(dbOpp.minimumPersonsRequired);
			if(dbOpp.notAllowed)				jsonOpp.notAllowed = dbOpp.notAllowed;
			if(dbOpp.notes)						jsonOpp.notes = dbOpp.notes;
			if(dbOpp.numTeams)					jsonOpp.numTeams = Number(dbOpp.numTeams);
			if(dbOpp.onBoarding)				jsonOpp.onBoarding = dbOpp.onBoarding;
			if(dbOpp.opportunityId)				jsonOpp.opportunityId = Number(dbOpp.opportunityId);
			if(dbOpp.opportunityType)			jsonOpp.opportunityType = dbOpp.opportunityType;
			if(dbOpp.ownerId)					jsonOpp.ownerId = Number(dbOpp.ownerId);
			if(dbOpp.personName)				jsonOpp.ownerName = dbOpp.ownerName;
			if(dbOpp.pay)						jsonOpp.payAmount = Number(dbOpp.pay);
			if(dbOpp.preferredAgencyType)		jsonOpp.preferredAgencyType = dbOpp.preferredAgencyType;
			if(dbOpp.preferredServiceWorkType)	jsonOpp.preferredServiceWorkType = dbOpp.preferredServiceWorkType;
			if(dbOpp.recurrence)				jsonOpp.recurrence = dbOpp.recurrence;
			if(dbOpp.requirements)				jsonOpp.requirements = dbOpp.requirements;
			if(dbOpp.startDateTime)				jsonOpp.startDateTime = new Date(dbOpp.startDateTime);
			if(dbOpp.status)					jsonOpp.status = dbOpp.status;
			if(dbOpp.supportDescription)		jsonOpp.supportDescription = dbOpp.supportDescription;
			if(dbOpp.supportPreference)			jsonOpp.supportPreference = dbOpp.supportPreference;
			if(dbOpp.teamSize)					jsonOpp.teamSize = Number(dbOpp.teamSize);
			if(dbOpp.term)						jsonOpp.term = dbOpp.term;
			if(dbOpp.timePeriodEndDate)			jsonOpp.timePeriodEndDate = new Date(dbOpp.timePeriodEndDate);
			if(dbOpp.timePeriodStartDate)		jsonOpp.timePeriodStartDate = new Date(dbOpp.timePeriodStartDate);
			if(dbOpp.title)						jsonOpp.title = dbOpp.title;
			if(dbOpp.totalSeats)				jsonOpp.totalSeats = Number(dbOpp.totalSeats);

			return jsonOpp;
		}
	});

	return eLeap.own.Opportunity;
});

