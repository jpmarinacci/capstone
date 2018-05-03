var dbServer = require('../dbServer');
var mysql = require('mysql');

var opportunities = {
	
	createOpportunity: function(request, response) { 'use strict';
		var sprocName = "sprocAddOpp";
		var params = [
			//dbServer.isValidParam((//), "string"),
			request.body.agencyCommitment ? request.body.agencyCommitment: "", 
			//temp --->
			request.body.applicationDueDate ? request.body.applicationDueDate: "",
			//--end temp-->
			//request.body.applicationDueDate ? new Date(request.body.applicationDueDate): "",
			request.body.classId ? Number(request.body.classId): "",
			//request.body.className ? request.body.className: "",
			request.body.classType ? request.body.classType: "",
			request.body.classYear ? request.body.classYear: "",
			request.body.courseSummary ? request.body.courseSummary: "",
			new Date(),
			request.body.deliverables ? request.body.deliverables: "",
			request.body.description ? request.body.description: "",
			request.body.donation ? request.body.donation: "",
			request.body.duration ? request.body.duration: "",
			request.body.endDateTime ? new Date(request.body.endDateTime): "",
			request.body.estimatedClassSize ? Number(request.body.estimatedClassSize): "",
			request.body.examples ? request.body.examples: "",
			request.body.hoursRequired ? Number(request.body.hoursRequired): "",
			request.body.isClass ? request.body.isClass: "",
			request.body.isRequredForClass ? request.body.isRequredForClass: "",
			request.body.isPaid ? request.body.isPaid: "",
			request.body.isServiceLearning ? request.body.isServiceLearning: "",
			request.body.isTeams ? request.body.isTeams: "",
			request.body.isVirtual ? request.body.isVirtual: "",
			request.body.latitude ? request.body.latitude: "",
			request.body.location ? request.body.location: "",
			request.body.longitude ? request.body.longitude: "",
			request.body.minimumPersonsRequired ? request.body.minimumPersonsRequired: "",
			request.body.notAllowed ? request.body.notAllowed: "",
			request.body.notes ? request.body.notes: "",
			request.body.numTeams ? Number(request.body.numTeams): "",
			request.body.onBoarding ? request.body.onBoarding: "",
			request.body.opportunityType ? request.body.opportunityType: "",
			request.body.ownerId ? Number(request.body.ownerId): "",
			request.body.pay ? request.body.pay: "",
			request.body.preferredAgencyType ? request.body.preferredAgencyType: "",
			request.body.preferredServiceWorkType ? request.body.preferredServiceWorkType: "",
			request.body.recurrence ? request.body.recurrence: "",
			request.body.requirments ? request.body.requirments: "",
			request.body.startDateTime ? new Date(request.body.startDateTime): "",
			request.body.statusId ? Number(request.body.statusId): "",
			request.body.supportDescription ? request.body.supportDescription: "",
			request.body.supportPreference ? request.body.supportPreference: "",
			request.body.teamSize ? Number(request.body.teamSize): "",
			request.body.term ? request.body.term: "",
			request.body.timePeriodEndDate ? new Date(request.body.timePeriodEndDate): "",
			request.body.timePeriodStartDate ? new Date(request.body.timePeriodStartDate): "",
			request.body.title ? request.body.title: "",
			request.body.totalSeats ? Number(request.body.totalSeats): "",
		];
		console.log("params("+params.length+"):");
		console.log(params);
		console.log("createOpportunity route called");
		console.log("calling "+ sprocName);
		function processSproc(results) {
			results = results[0];
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

