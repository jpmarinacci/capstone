var dbServer = require('../dbServer');
var mysql = require('mysql');

var opportunities = {
	
	createOpportunity: function(request, response) { 'use strict';
		var sprocName = "sprocAddOpp";
		var params = [
			//dbServer.isValidParam((//), "string"),
			request.body.agencyCommitment ? request.body.agencyCommitment: null, 
			request.body.applicationDueDate ? request.body.applicationDueDate: null,
			request.body.classId ? Number(request.body.classId): null,
			//request.body.className ? request.body.className: null,
			request.body.classType ? request.body.classType: null,
			request.body.classYear ? request.body.classYear: null,
			request.body.courseSummary ? request.body.courseSummary: null,
			new Date(),
			request.body.deliverables ? request.body.deliverables: null,
			request.body.description ? request.body.description: null,
			request.body.donation ? request.body.donation: null,
			request.body.duration ? request.body.duration: null,
			request.body.endDateTime ? new Date(request.body.endDateTime): null,
			request.body.estimatedClassSize ? Number(request.body.estimatedClassSize): null,
			request.body.examples ? request.body.examples: null,
			request.body.hoursRequired ? Number(request.body.hoursRequired): null,
			request.body.isClass ? request.body.isClass: 0,
			request.body.isRequiredForClass ? request.body.isRequiredForClass: 0,
			request.body.isPaid ? request.body.isPaid: 0,
			request.body.isServiceLearning ? request.body.isServiceLearning: 0,
			request.body.isTeams ? request.body.isTeams: 0,
			request.body.isVirtual ? request.body.isVirtual: 0,
			request.body.latitude ? request.body.latitude: null,
			request.body.location ? request.body.location: null,
			request.body.longitude ? request.body.longitude: null,
			request.body.minimumPersonsRequired ? request.body.minimumPersonsRequired: null,
			request.body.notAllowed ? request.body.notAllowed: null,
			request.body.notes ? request.body.notes: null,
			request.body.numTeams ? Number(request.body.numTeams): null,
			request.body.onBoarding ? request.body.onBoarding: null,
			request.body.opportunityType ? request.body.opportunityType: null,
			request.body.ownerId ? Number(request.body.ownerId): 3,
			request.body.pay ? Number(request.body.payAmount): null,
			request.body.preferredAgencyType ? request.body.preferredAgencyType: null,
			request.body.preferredServiceWorkType ? request.body.preferredServiceWorkType: null,
			request.body.recurrence ? request.body.recurrence: null,
			request.body.requirments ? request.body.requirments: null,
			request.body.startDateTime ? new Date(request.body.startDateTime): null,
			request.body.status ? request.body.status: null,
			request.body.supportDescription ? request.body.supportDescription: null,
			request.body.supportPreference ? request.body.supportPreference: null,
			request.body.teamSize ? Number(request.body.teamSize): null,
			request.body.term ? request.body.term: null,
			request.body.timePeriodEndDate ? new Date(request.body.timePeriodEndDate): null,
			request.body.timePeriodStartDate ? new Date(request.body.timePeriodStartDate): null,
			request.body.title ? request.body.title: "",
			request.body.totalSeats ? Number(request.body.totalSeats): null,
		];
		console.log("params("+params.length+"):");
		console.log(params);
		console.log("createOpportunity route called");
		console.log("calling "+ sprocName);
		function processSprocCallback(results) {
			if (results && results.error) {
				dbServer.processSprocError(results, response);
	    	} else {
	    		var returnResults = results[0];
	    		console.log("sprocAddOpp successful");
	    		console.log("created opp oppId: " + returnResults.opportunityId);
				console.log("created opp title: " + returnResults.title);
	    		response.send(returnResults);
	    	}
		};
		dbServer.sproc(sprocName, params, processSprocCallback);
    },
    
	deleteOpportunity: function(request, response) { 'use strict';	
   		var sprocName = "sprocDeleteOpp";
		var params = [];
		console.log("deleteOpportunity route called");
		console.log("calling "+ sprocName);
		function processSproc(results) {
			if (results && results.error) {
				dbServer.processSprocError(results, response);
	    	} else {
	    		var returnResults = results[0];
	    		console.log("sprocDeleteOpp successful");
	    		response.send(returnResults);
	    	}
		};
		dbServer.sproc(sprocName, params, processSproc);
    },
    
	getAllOpportunities: function(request, response) { 'use strict';	
		var sprocName = "sprocAllOpp";
		var params = [];
		console.log("getAllOpportunities route called");
		console.log("calling "+ sprocName);
		function processSproc(results) {
			if (results && results.error) {
				dbServer.processSprocError(results, response);
	    	} else {
	    		var returnResults = results[0];
	    		console.log("sprocAllOpp successful");
	    		response.send(returnResults);
	    	}
		};
		dbServer.sproc(sprocName, params, processSproc);
    },
    
	getMyOpportunities: function(request, response) { 'use strict';	
   		var sprocName = "sprocMyOpps";
		var params = [
		];
		console.log("getMyOpportunities route called");
		console.log("calling "+ sprocName);
		function processSproc(results) {
			if (results && results.error) {
				dbServer.processSprocError(results, response);
	    	} else {
	    		var returnResults = results[0];
	    		console.log("sprocMyOpps successful");
	    		response.send(returnResults);
	    	}
		};
		dbServer.sproc(sprocName, params, processSproc);
    },
    
	getOpportunities: function(request, response) { 'use strict';	
   		var sprocName = "sprocName";
		var params = [];
		console.log("getOpportunities route called");
		console.log("calling "+ sprocName);
		function processSproc(results) {
			if (results && results.error) {
				dbServer.processSprocError(results, response);
	    	} else {
	    		var returnResults = results[0];
	    		response.send(returnResults);
	    	}
		};
		dbServer.sproc(sprocName, params, processSproc);
    },
    
	getOpportunity: function(request, response) { 'use strict';	
   		var sprocName = "sprocGetOppId";
		var params = [
			request.body.opportunityId ? request.body.opportunityId : null,
			request.body.personId ? request.body.personId : null
		];
		console.log("getOpportunity route called");
		console.log("calling "+ sprocName);
		function processSproc(results) {
			console.log("results");
			console.log(results);
			if (results && results.error) {
				dbServer.processSprocError(results, response);
	    	} else {
	    		var returnResults = results[0][0];
	    		response.send(returnResults);
	    	}
		};
		dbServer.sproc(sprocName, params, processSproc);
    },
    
	getOpportunityHours: function(request, response) { 'use strict';	
   		var sprocName = "sprocName";
		var params = [];
		console.log("getOpportunityHours route called");
		console.log("calling "+ sprocName);
		function processSproc(results) {
			if (results && results.error) {
				dbServer.processSprocError(results, response);
	    	} else {
	    		var returnResults = results[0];
	    		response.send(returnResults);
	    	}
		};
		dbServer.sproc(sprocName, params, processSproc);
    },
    
	joinOpportunity: function(request, response) { 'use strict';	
		var params = [
			request.body.opportunityId ? request.body.opportunityId : null,
			request.body.personId ? request.body.personId : null
		];
		console.log("joinOpportunity route called");
		console.log("calling sprocJoinOpp");
		console.log("params");
		console.log(params);
		dbServer.sproc("sprocJoinOpp", params, function processSproc(results) {
			if (results && results.error) {
				console.log(results);
				dbServer.processSprocError(results, response);
	    	} else {
	    		var returnResults = results[0];
	    		if(returnResults === "invalid:1062") {
	    			returnResults.status = "invalid";
	    			returnResults.message = "person already joined";
	    		} else {
	    			returnResults.status = "success";
	    			returnResults.message = "person joined";
	    		}
	    		response.send(returnResults);
	    	}
		});
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
			if (results && results.error) {
				dbServer.processSprocError(results, response);
	    	} else {
	    		var returnResults = results[0];
	    		response.send(returnResults);
	    	}
		};
		dbServer.sproc(sprocName, params, processSproc);
    },
    
	updateOpportunity: function(request, response) { 'use strict';	
		var sprocName = "sprocUpdateOpp";
		var params = [];
		console.log("updateOpportunity route called");
		console.log("calling "+ sprocName);
		function processSproc(results) {
			if (results && results.error) {
				dbServer.processSprocError(results, response);
	    	} else {
	    		var returnResults = results[0];
	    		response.send(returnResults);
	    	}
		};
		dbServer.sproc(sprocName, params, processSproc);
   }
};

module.exports = opportunities;

