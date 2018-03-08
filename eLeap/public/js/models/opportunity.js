/**
* @authors: JP Marinacci 
* 			Belete Zegeye 
*/

define(['jquery', 'underscore', 'backbone', 'eLeap', 'controllers/restServer'],
	function ($, _, Backbone, eLeap, server) { 'use strict';
		
	eLeap.own.Opportunity = Backbone.Model.extend({
		
		idAttribute: "opportunityId",

		defaults: {
			classId: "",
			createDate: "",
			description: "",
			donation: "",
			duration: "",
			endDate: "",
			isPaid: "",
			isRecurrent: "",
			isServiceLearning: "",
			isVirtual: "",
			notes: "",
			ownerId: "",
			pay: "",
			startDate: "",
			statusId: "",
			timePeriodEnd: "",
			timePeriodStart: "",
			title: "",
			totalSeats: ""
		},
		
		routes: { //CRUD rest call route signatures
			createOpportunity: "/createOpportunity",
			readOpportunity: "/readOpportunity",
			updateOpportunity: "/updateOpportunity",
			deleteOpportunity: "deleteOpportunity"
		},
		
		sync: function (method, thisModel, options) {
			options = options || {};
			if(method === 'create') {
				server.postRoute(this.routes.createOpportunity, this.translateOpportunityToDB(this.toJSON()), function (response) {
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
				server.postRoute(this.routes.readOpportunity, this.toJSON(), function (response) {
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
			if(dbOpportunity.IsRecurrent)				jsonOpportunity.isRecurrent = dbOpportunity.IsRecurrent;
			if(dbOpportunity.IsServiceLearning)			jsonOpportunity.isServiceLearning = dbOpportunity.IsServiceLearning;
			if(dbOpportunity.IsVirtual)					jsonOpportunity.isVirtual = dbOpportunity.IsVirtual;
			if(dbOpportunity.Notes)						jsonOpportunity.notes = dbOpportunity.Notes;
			if(dbOpportunity.OwnerID)					jsonOpportunity.ownerId = dbOpportunity.OwnerID;
			if(dbOpportunity.OpportunityID)				jsonOpportunity.opportunityId = dbOpportunity.OpportunityID;
			if(dbOpportunity.Pay)						jsonOpportunity.pay = dbOpportunity.Pay;
			if(dbOpportunity.StartDate)					jsonOpportunity.startDate = dbOpportunity.StartDate;
			if(dbOpportunity.StatusID)					jsonOpportunity.statusId = dbOpportunity.StatusID;
			if(dbOpportunity.TimePeriodEnd)				jsonOpportunity.timePeriodEnd = dbOpportunity.TimePeriodEnd;
			if(dbOpportunity.TimePeriodStart)			jsonOpportunity.timePeriodStart = dbOpportunity.TimePeriodStart;
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
			if(jsonOpportunity.endDate)					dbOpportunity.EndDate = jsonOpportunity.endDate;
			if(jsonOpportunity.isPaid)					dbOpportunity.IsPaid = jsonOpportunity.isPaid ? true: false;
			if(jsonOpportunity.isRecurrent)				dbOpportunity.IsRecurrent = jsonOpportunity.isRecurrent ? true: false;
			if(jsonOpportunity.isServiceLearning)		dbOpportunity.IsServiceLearning = jsonOpportunity.isServiceLearning ? true: false;
			if(jsonOpportunity.isVirtual)				dbOpportunity.IsVirtual = jsonOpportunity.isVirtual ? true: false;
			if(jsonOpportunity.notes)					dbOpportunity.Note = jsonOpportunity.notes;
			if(jsonOpportunity.ownerId)					dbOpportunity.OwnedID = jsonOpportunity.ownerId;
			if(jsonOpportunity.opportunityId)			dbOpportunity.OpportunityID = OpportunityId;
			if(jsonOpportunity.pay)						dbOpportunity.Pay = jsonOpportunity.pay;
			if(jsonOpportunity.statusId)				dbOpportunity.StatusID = jsonOpportunity.statusId;
			if(jsonOpportunity.timePeriodEnd)			dbOpportunity.TimePeriodEnd = jsonOpportunity.timePeriodEnd;
			if(jsonOpportunity.timePeriodStart)			dbOpportunity.TimePeriodStart = jsonOpportunity.timePeriodStart;
			if(jsonOpportunity.title)					dbOpportunity.Title = jsonOpportunity.title;
			if(jsonOpportunity.totalSeats)				dbOpportunity.TotalSeats = jsonOpportunity.totalSeats;
				
			return dbOpportunity;
		}
	});

	return eLeap.own.Opportunity;
});
