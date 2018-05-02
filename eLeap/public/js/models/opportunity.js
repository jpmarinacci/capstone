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
			applicationDueDate: "",
			availableSeats: "",
			classId: "",
			classType: "",
			classYear: "",
			courseSummery: "",
			createDate: "",
			deliverables: "",
			description: "",
			donation: "",
			duration: "",
			endDateTime: "",
			estimatedClassSize: "",
			examples: "",
			hoursRequired: "",
			isClass: "",
			isRequredForClass: "",
			isPaid: "",
			isServiceLearning: "",
			isTeams: "",
			isVirtual: "",
			latitude: "",
			location: "",
			longitude: "",
			minimumPersonsRequred: "",
			notAllowed: "",
			notes: "",
			numTeams: "",
			onBoardingPrework: "",
			opportunityType: "",
			ownerId: "",
			pay: "",
			preferredServiceWorkType: "",
			preferredAgencyType: "",
			recurrence: "",
			requirments: "",
			startDateTime: "",
			statusId: "",
			supportDescription: "",
			supportPreference: "",
			teamSize: "",
			term: "",
			timePeriodEndDate: "",
			timePeriodStartDate: "",	
			title: "",
			totalSeats:""
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
				// this.translateOpportunityToDB(this.toJSON())
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
		
		/*parse: function (dbOpportunity) {
			return this.translateOpportunityFromDB(dbOpportunity);
		},
		
		translateOpportunityFromDB: function(dbOpportunity){
			var jsonOpportunity = {};
			if(dbOpportunity.ClassID)					jsonOpportunity.classId = dbOpportunity.ClassID;
			if(dbOpportunity.CreateDate)				jsonOpportunity.createDate = dbOpportunity.CreateDate;
			if(dbOpportunity.Description)				jsonOpportunity.description = dbOpportunity.Description;
			if(dbOpportunity.Donation)					jsonOpportunity.donation = dbOpportunity.Donation;
			if(dbOpportunity.Duration)					jsonOpportunity.duration = dbOpportunity.Duration;
			if(dbOpportunity.EndDate)					jsonOpportunity.endDate = dbOpportunity.EndDate;
			if(dbOpportunity.IsPaid)					jsonOpportunity.isPaid = dbOpportunity.IsPaid;
			if(dbOpportunity.Recurrent)					jsonOpportunity.recurrent = dbOpportunity.Recurrent;
			if(dbOpportunity.IsServiceLearning)			jsonOpportunity.isServiceLearning = dbOpportunity.IsServiceLearning;
			if(dbOpportunity.IsVirtual)					jsonOpportunity.isVirtual = dbOpportunity.IsVirtual;
			if(dbOpportunity.Latitude)					jsonOpportunity.latitude = dbOpportunity.Latitude;
			if(dbOpportunity.Location)					jsonOpportunity.location = dbOpportunity.Location;
			if(dbOpportunity.Longitude)					jsonOpportunity.longitude = dbOpportunity.Longitude;
			if(dbOpportunity.Notes)						jsonOpportunity.notes = dbOpportunity.Notes;
			if(dbOpportunity.OwnerID)					jsonOpportunity.ownerId = dbOpportunity.OwnerID;
			if(dbOpportunity.OpportunityID)				jsonOpportunity.opportunityId = dbOpportunity.OpportunityID;
			if(dbOpportunity.Pay)						jsonOpportunity.pay = dbOpportunity.Pay;
			if(dbOpportunity.StartDateTime)				jsonOpportunity.startDateTime = dbOpportunity.StartDateTime;
			if(dbOpportunity.StatusID)					jsonOpportunity.statusId = dbOpportunity.StatusID;
			if(dbOpportunity.TimePeriodEndDate)			jsonOpportunity.timePeriodEndDate = dbOpportunity.TimePeriodEnDate;
			if(dbOpportunity.TimePeriodStartDate)		jsonOpportunity.timePeriodStartDate = dbOpportunity.TimePeriodStartDate;
			if(dbOpportunity.Title)						jsonOpportunity.title = dbOpportunity.Title;
			if(dbOpportunity.TotalSeats)				jsonOpportunity.totalSeats = dbOpportunity.TotalSeats;
			
			return jsonOpportunity;
		},
		
		translateOpportunityToDB: function(jsonOpportunity) {
			var dbOpportunity = {};
			//do the opposite for translate to db type language
			if(jsonOpportunity.classId)					dbOpportunity.ClassID = jsonOpportunity.classId;
			if(jsonOpportunity.createDate)				dbOpportunity.CreateDate = jsonOpportunity.createDate;
			if(jsonOpportunity.description)				dbOpportunity.Description = jsonOpportunity.description;
			if(jsonOpportunity.donation)				dbOpportunity.Donation = jsonOpportunity.donation;
			if(jsonOpportunity.duration)				dbOpportunity.Duration = jsonOpportunity.Duration;
			if(jsonOpportunity.endDateTime)				dbOpportunity.EndDateTime = jsonOpportunity.endDateTime;
			if(jsonOpportunity.isPaid)					dbOpportunity.IsPaid = jsonOpportunity.isPaid ? true: false;
			if(jsonOpportunity.isServiceLearning)		dbOpportunity.IsServiceLearning = jsonOpportunity.isServiceLearning ? true: false;
			if(jsonOpportunity.isVirtual)				dbOpportunity.IsVirtual = jsonOpportunity.isVirtual ? true: false;
			if(jsonOpportunity.latitude)				dbOpportunity.Latitude = jsonOpportunity.latitude;
			if(jsonOpportunity.location)				dbOpportunity.Location = jsonOpportunity.location;
			if(jsonOpportunity.longitude)				dbOpportunity.Longitude = jsonOpportunity.longitude;
			if(jsonOpportunity.notes)					dbOpportunity.Note = jsonOpportunity.notes;
			if(jsonOpportunity.ownerId)					dbOpportunity.OwnedID = jsonOpportunity.ownerId;
			if(jsonOpportunity.opportunityId)			dbOpportunity.OpportunityID = OpportunityId;
			if(jsonOpportunity.pay)						dbOpportunity.Pay = jsonOpportunity.pay;
			if(jsonOpportunity.recurrent)				dbOpportunity.Recurrent = jsonOpportunity.recurrent ? true: false;
			if(jsonOpportunity.startDateTime)			jsonOpportunity.StartDateTime = jsonOpportunity.StartDateTime;
			if(jsonOpportunity.statusId)				dbOpportunity.StatusID = jsonOpportunity.statusId;
			if(jsonOpportunity.timePeriodEndDate)		dbOpportunity.TimePeriodEndDate = jsonOpportunity.timePeriodEndDate;
			if(jsonOpportunity.timePeriodStartDate)		dbOpportunity.TimePeriodStartDate = jsonOpportunity.timePeriodStartDate;
			if(jsonOpportunity.timePeriodEnd)			dbOpportunity.TimePeriodEnd = jsonOpportunity.timePeriodEnd;
			if(jsonOpportunity.timePeriodStart)			dbOpportunity.TimePeriodStart = jsonOpportunity.timePeriodStart;
			if(jsonOpportunity.title)					dbOpportunity.Title = jsonOpportunity.title;
			if(jsonOpportunity.totalSeats)				dbOpportunity.TotalSeats = jsonOpportunity.totalSeats;
				
			return dbOpportunity;
		}*/
	});

	return eLeap.own.Opportunity;
});
