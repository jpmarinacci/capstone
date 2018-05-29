var dbServer = require('../dbServer');
var mysql = require('mysql');

var opportunities = {
	
	createOpportunity: function(request, response) { 'use strict';
		var params = [
			request.body.agencyCommitment ? request.body.agencyCommitment: null, 
			request.body.applicationDueDate ? request.body.applicationDueDate: null,
			request.body.className ? request.body.className: null,
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
			request.body.requirements ? request.body.requirements: null,
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
		console.log("calling sprocAddOpp");
		dbServer.sproc("sprocAddOpp", params, function(results) {
			
			if (results && results.error) {
				dbServer.processSprocError(results, response);
	    	} else {
	    		var returnResults = {};
	    		if(results && results[0] && results[0][0] && results[1] && results[1][0]) {
	    			returnResults = results[1][0];
	    			if(results[0][0].status) {
	    				returnResults.serverStatus = results[0][0].status;
	    			}
	    		}
	    		if(returnResults.serverStatus === "success") {
	    			console.log("sprocAddOpp successful");
	    			console.log("created opp ID: " + returnResults.opportunityId);
	    			console.log("created opp title: " + returnResults.title);
	    		}
	    		response.send(returnResults);
	    	}
		});
    },
    
	updateOpportunity: function(request, response) { 'use strict';
		console.log("updateOpportunity route called");
		if(!request.body.opportunityId) {
			response.send("denied: no opportunity Id");
		}
		var params = [
			//dbServer.isValidParam((//), "string"),
			request.body.agencyCommitment ? request.body.agencyCommitment: null, 
			request.body.applicationDueDate ? request.body.applicationDueDate: null,
			request.body.className ? request.body.className: null,
			request.body.classType ? request.body.classType: null,
			request.body.classYear ? request.body.classYear: null,
			request.body.courseSummary ? request.body.courseSummary: null,
			request.body.createDate ? request.body.createDate: new Date(),
			request.body.deliverables ? request.body.deliverables: null,
			request.body.description ? request.body.description: null,
			request.body.donation ? Number(request.body.donation): null,
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
			request.body.minimumPersonsRequired ? Number(request.body.minimumPersonsRequired): null,
			request.body.notAllowed ? request.body.notAllowed: null,
			request.body.notes ? request.body.notes: null,
			request.body.numTeams ? Number(request.body.numTeams): null,
			request.body.onBoarding ? request.body.onBoarding: null,
			request.body.opportunityId,
			request.body.opportunityType ? request.body.opportunityType: null,
			request.body.ownerId ? Number(request.body.ownerId): 3,
			request.body.pay ? Number(request.body.payAmount): null,
			request.body.preferredAgencyType ? request.body.preferredAgencyType: null,
			request.body.preferredServiceWorkType ? request.body.preferredServiceWorkType: null,
			request.body.recurrence ? request.body.recurrence: null,
			request.body.requirements ? request.body.requirements: null,
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
		console.log("calling sprocUpdateOpp");
		console.log("total params:" + params.length);
		dbServer.sproc("sprocUpdateOpp", params, function(results) {
			if (results && results.error) {
				dbServer.processSprocError(results, response);
	    	} else {
	    		var returnResults = {};
	    		if(results && results[0] && results[0][0] && results[1] && results[1][0]) {
	    			returnResults = results[1][0];
	    			if(results[0][0].status) {
	    				returnResults.serverStatus = results[0][0].status;
	    			}
	    		}
	    		if(returnResults.serverStatus === "success") {
	    			console.log("sprocUpdateOpp successful");
	    			console.log("edited opp ID: " + returnResults.opportunityId);
	    			console.log("edited opp title: " + returnResults.title);
	    		}
	    		console.log("results:");
	    		console.log(returnResults);
	    		response.send(returnResults);
	    	}
		});
	},
	
	deleteOpportunity: function(request, response) { 'use strict';
		if(!request.body.opportunityId) {
			response.send("denied: no opportunity Id");
		}
		var params = [
			request.body.opportunityId
		];
		console.log("deleteOpportunity route called");
		console.log("calling sprocDeleteOpp");
		
		dbServer.sproc("sprocDeleteOpp", params, function processSproc(results) {
			if (results && results.error) {
				dbServer.processSprocError(results, response);
	    	} else {
	    		var returnResults = {};
	    		var returnResults = returnResults || results[0];
	    		returnResults.message = "success";
	    		console.log("sprocDeleteOpp successful");
	    		response.send(returnResults);
	    	}
		});
    },
    
    getOpportunity: function(request, response) { 'use strict';	
    	console.log("getOpportunity route called");
    	
		var params = [
			request.body.opportunityId ? request.body.opportunityId : null,
			request.body.personId ? request.body.personId : null
		];
		
		console.log("calling sprocGetOppId");
		dbServer.sproc("sprocGetOppId", params, function(results) {
			
			if (results && results.error) {
				dbServer.processSprocError(results, response);
	    	} else {
	    		console.log("---------------------get oppportunity results: -----------");
	    		var returnResults = {};
	    		if(results && results[0] && results[0][0] && results[1] && results[1][0]) {
	    			returnResults = results[1][0];
	    			/*if(results[0][0].status) {
	    				returnResults.serverStatus = results[0][0].status;
	    			}*/
	    			if(returnResults) {
	    				returnResults.serverStatus = "success";
	    			}
	    		}
	    		if(returnResults.serverStatus === "success") {
	    			console.log("opp ID: " + returnResults.opportunityId);
	    			console.log("opp title: " + returnResults.title);
	    		}
	    		
	    		response.send(returnResults);
	    	}
		});
    },
    
	getAllOpportunities: function(request, response) { 'use strict';
		var params = [];
		console.log("getAllOpportunities route called");
		console.log("calling sprocAllOpp");
		dbServer.sproc("sprocAllOpp", params, function(results) {
			if (results && results.error) {
				dbServer.processSprocError(results, response);
	    	} else {
	    		var returnResults = results[0];
	    		console.log("sprocAllOpp successful");
	    		response.send(returnResults);
	    	}
		});
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
    }
};

module.exports = opportunities;

