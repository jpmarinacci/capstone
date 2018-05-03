var dbServer = require('../dbServer');
var mysql = require('mysql');

var opportunities = {
	
	createOpportunity: function(request, response) { 'use strict';
		var sprocName = "sprocAddOpp";
		var params = [
			//dbServer.isValidParam((//), "string"),
			request.body.agencyCommitment ? request.body.agencyCommitment: null, 
			request.body.applicationDueDate ? new Date(request.body.applicationDueDate): null,
			request.body.availableSeats ? Number(request.body.availableSeats): null,
			request.body.classId ? Number(request.body.classId): null,
			request.body.classType ? request.body.classType: null,
			request.body.classYear ? request.body.classYear: null,
			request.body.courseSummary ? request.body.courseSummary: null,
			request.body.createDate ? new Date(request.body.createDate): null,
			request.body.deliverables ? request.body.deliverables: null,
			request.body.description ? request.body.description: null,
			request.body.donation ? request.body.donation: null,
			request.body.description ? request.body.description: null,
			request.body.duration ? request.body.duration: null,
			request.body.endDateTime ? new Date(request.body.endDateTime): null,
			request.body.estimatedClassSize ? Number(request.body.estimatedClassSize): null,
			request.body.examples ? request.body.examples: null,
			request.body.hoursRequired ? Number(request.body.hoursRequired): null,
			request.body.isClass ? request.body.isClass: null,
			request.body.isRequredForClass ? request.body.isRequredForClass: null,
			request.body.isPaid ? request.body.isPaid: null,
			request.body.isServiceLearning ? request.body.isServiceLearning: null,
			request.body.isTeams ? request.body.isTeams: null,
			request.body.isVirtual ? request.body.isVirtual: null,
			request.body.latitude ? request.body.latitude: null,
			request.body.location ? request.body.location: null,
			request.body.longitude ? request.body.longitude: null,
			request.body.minimumPersonsRequired ? request.body.minimumPersonsRequired: null,
			request.body.notAllowed ? request.body.notAllowed: null,
			request.body.notes ? request.body.notes: null,
			request.body.numTeams ? Number(request.body.numTeams): null,
			request.body.onBoarding ? request.body.onBoarding: null,
			request.body.opportunityType ? request.body.opportunityType: null,
			request.body.notes ? request.body.notes: null,
			request.body.ownerId ? Number(request.body.ownerId): null,
			request.body.pay ? request.body.pay: null,
			request.body.preferredServiceWorkType ? request.body.preferredServiceWorkType: null,
			request.body.preferredAgencyType ? request.body.preferredAgencyType: null,
			request.body.recurrence ? request.body.recurrence: null,
			request.body.requirments ? request.body.requirments: null,
			request.body.startDateTime ? new Date(request.body.startDateTime): null,
			request.body.statusId ? Number(request.body.statusId): null,
			request.body.supportDescription ? request.body.supportDescription: null,
			request.body.supportPreference ? request.body.supportPreference: null,
			request.body.teamSize ? Number(request.body.teamSize): null,
			request.body.term ? request.body.term: null,
			request.body.timePeriodEndDate ? new Date(request.body.timePeriodEndDate): null,
			request.body.timePeriodStartDate ? new Date(request.body.timePeriodStartDate): null,
			request.body.title ? request.body.title: null,
			request.body.totalSeats ? Number(request.body.totalSeats): null,
		];
		console.log("params:");
		console.log(params);
		console.log("createOpportunity route called");
		console.log("calling "+ sprocName);
		function processSproc(results) {
			//results = results[0];
			dbServer.processSproc(results, response);
		};
		
		dbServer.sproc(sprocName, params, processSproc);
    },
    
	deleteOpportunity: function(request, response) { 'use strict';	
   		var sprocName = "sprocDeleteOpp";
		var params = [];
		console.log("deleteOpportunity route called");
		console.log("calling "+ sprocName);
		function processSproc(results) {
			dbServer.processSproc(results, response);
		};
		dbServer.sproc(sprocName, params, processSproc);
    },
    
	getAllOpportunities: function(request, response) { 'use strict';	
		var sprocName = "sprocAllOpp";
		var params = [];
		console.log("getAllOpportunities route called");
		console.log("calling "+ sprocName);
		function processSproc(results) {
			dbServer.processSproc(results, response);
		};
		dbServer.sproc(sprocName, params, processSproc);
    },
    
	getMyOpportunities: function(request, response) { 'use strict';	
   		var sprocName = "sprocName";
		var params = [
		];
		console.log("getMyOpportunities route called");
		console.log("calling "+ sprocName);
		function processSproc(results) {
			dbServer.processSproc(results, response);
		};
		dbServer.sproc(sprocName, params, processSproc);
    },
    
	getOpportunities: function(request, response) { 'use strict';	
   		var sprocName = "sprocName";
		var params = [];
		console.log("getOpportunities route called");
		console.log("calling "+ sprocName);
		function processSproc(results) {
			dbServer.processSproc(results, response);
		};
		dbServer.sproc(sprocName, params, processSproc);
    },
    
	getOpportunity: function(request, response) { 'use strict';	
   		var sprocName = "sprocGetOppID";
		var params = [
			request.body.OpportunityID ? request.body.OpportunityID : null,
			request.body.PersonID ? request.body.PersonID : null
		];
		console.log("getOpportunity route called");
		console.log("calling "+ sprocName);
		function processSproc(results) {
			dbServer.processSproc(results, response);
		};
		dbServer.sproc(sprocName, params, processSproc);
    },
    
	getOpportunityHours: function(request, response) { 'use strict';	
   		var sprocName = "sprocName";
		var params = [];
		console.log("getOpportunityHours route called");
		console.log("calling "+ sprocName);
		function processSproc(results) {
			dbServer.processSproc(results, response);
		};
		dbServer.sproc(sprocName, params, processSproc);
    },
    
	joinOpportunity: function(request, response) { 'use strict';	
   		var sprocName = "sprocJoinOpp";
		var params = [
			request.body.OpportunityID ? request.body.OpportunityID : null,
			request.body.PersonID ? request.body.PersonID : null
		];
		console.log("joinOpportunity route called");
		console.log("calling "+ sprocName);
		function processSproc(results) {
			dbServer.processSproc(results, response);
		};
		dbServer.sproc(sprocName, params, processSproc);
    },
    
    leaveOpportunity: function(request, response) { 'use strict';	
   		var sprocName = "sprocLeaveOpp";
		var params = [
			request.body.OpportunityID ? request.body.OpportunityID : null,
			request.body.PersonID ? request.body.PersonID : null
		];
		console.log("leaveOpportunity route called");
		console.log("calling "+ sprocName);
		function processSproc(results) {
			dbServer.processSproc(results, response);
		};
		dbServer.sproc(sprocName, params, processSproc);
    },
    
	updateOpportunity: function(request, response) { 'use strict';	
		var sprocName = "sprocUpdateOpp";
		var params = [];
		console.log("updateOpportunity route called");
		console.log("calling "+ sprocName);
		function processSproc(results) {
			dbServer.processSproc(results, response);
		};
		dbServer.sproc(sprocName, params, processSproc);
   }
};

module.exports = opportunities;

