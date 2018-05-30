var dbServer = require('../dbServer');
var mysql = require('mysql');

var opportunities = {
	
	createOpportunity: function(request, response) { 'use strict';
		console.log("--- createOpportunity route called ---");
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
			new Date(),
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
		console.log("--- updateOpportunity route called ---");
		if(!request.body.opportunityId) {
			response.send('inputs not valid - no oppID');
		}
		var params = [
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
			new Date(),
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
		console.log("--- deleteOpportunity route called ---");
		if(!request.body.opportunityId) {
			response.send('inputs not valid');
		}
		var params = [
			request.body.opportunityId
		];
		
		console.log("calling sprocDeleteOpp");
		dbServer.sproc("sprocDeleteOpp", params, function processSproc(results) {
			if (results && results.error) {
				dbServer.processSprocError(results, response);
	    	} else {
	    		var returnResults = results[0] || {};
	    		returnResults.status = "success";
	    		console.log("sprocDeleteOpp successful");
	    		response.send(returnResults);
	    	}
		});
    },
    
    getOpportunity: function(request, response) { 'use strict';	
    	console.log("--- getOpportunity route called ---");
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
	    			if(results[0][0].status) {
	    				returnResults.serverStatus = results[0][0].status;
	    			}
	    			if(results[2] && results[2][0]) {
	    				returnResults.isJoined = results[2][0].personJoined;
	    			}
	    		}
	    		if(returnResults.serverStatus === "success") {
	    			console.log("opp ID: " + returnResults.opportunityId);
	    			console.log("opp title: " + returnResults.title);
	    		}
	    		console.log(returnResults);
	    		response.send(returnResults);
	    	}
		});
    },
    
	getAllOpportunities: function(request, response) { 'use strict';
		console.log("--- getAllOpportunities route called ---");
		console.log("calling sprocAllOpp");
		dbServer.sproc("sprocAllOpp", [], function(results) {
			if (results && results.error) {
				dbServer.processSprocError(results, response);
	    	} else {
	    		var returnResults = results[0];
	    		console.log("sprocAllOpp successful");
	    		console.log(returnResults.length + " opps");
	    		response.send(returnResults);
	    	}
		});
    },
    
	getJoinedOpportunities: function(request, response) { 'use strict';
		console.log("--- getJoinedOpportunities route called ---");
		if(!request.body.personId) {
			response.send('inputs not valid - no personID');
			return;
		}
		var params = [
			request.boy.personId
		];
	
		console.log("calling sprocMyJoinedOpps");
		dbServer.sproc("sprocMyJoinedOpps", params, function processSproc(results) {
			if (results && results.error) {
				dbServer.processSprocError(results, response);
	    	} else {
	    		console.log("sprocMyJoinedOpps results:");
	    		console.log(results);
	    		
	    		var returnResults = results[0];
	    		returnResults.status = "success";
	    		console.log("sprocMyJoinedOpps successful");
	    		response.send(returnResults);
	    	}
		});
    },
    
    getMyOpportunities: function(request, response) { 'use strict';
		console.log("--- getMyOpportunities route called ---");
		if(!request.body.personId) {
			response.send('inputs not valid - no personID');
			return;
		}
		var params = [
			request.boy.personId
		];
	
		console.log("calling sprocMyOwnOpps");
		dbServer.sproc("sprocMyOwnOpps", params, function processSproc(results) {
			if (results && results.error) {
				dbServer.processSprocError(results, response);
	    	} else {
	    		console.log("sprocMyOwnOpps results:");
	    		console.log(results);
	    		
	    		var returnResults = results[0];
	    		returnResults.status = "success";
	    		console.log("sprocMyOwnOpps successful");
	    		response.send(returnResults);
	    	}
		});
    },
    
	joinOpportunity: function(request, response) { 'use strict';
		console.log("--- joinOpportunity route called ---");
		if(!request.body.personId || !request.body.opportunityId) {
			response.send('inputs not valid');
			return;
		}
		var params = [
			request.body.opportunityId,
			request.body.personId
		];
		
		console.log("calling sprocJoinOpp");
		console.log("params:");
		console.log(params);
		dbServer.sproc("sprocJoinOpp", params, function processSproc(results) {
			if (results && results.error) {
				dbServer.processSprocError(results, response);
	    	} else {
	    		console.log("sprocJoinOpp results:");
	    		var returnResults = {};
	    		if(results[0] && results[0] === "invalid:1062") {
	    			returnResults = results[0];
	    			returnResults.status = "invalid";
	    			returnResults.message = "person already joined";
	    		} else {
	    			returnResults.status = "success";
	    			returnResults.message = "person joined";
	    		}
	    		console.log(returnResults);
	    		response.send(returnResults);
	    	}
		});
    },
    
    leaveOpportunity: function(request, response) { 'use strict';
    	console.log("--- leaveOpportunity route called ---");
	    if(!request.body.personId || !request.body.opportunityId) {
			response.send('inputs not valid');
			return;
		}
		var params = [
			request.body.opportunityId,
			request.body.personId
		];
		
		console.log("calling sprocLeaveOpp");
		console.log("params:");
		console.log(params);		
		dbServer.sproc("sprocLeaveOpp", params, function(results) {
			if (results && results.error) {
				dbServer.processSprocError(results, response);
	    	} else {
	    		console.log("sprocLeaveOpp results:");
	    		var returnResults = {};
	    		if(results[0]) {
	    			returnResults = [0];
	    			returnResults.status = "success";
	    			returnResults.message = "person unjoined";
	    		}
	    		console.log(returnResults);
	    		response.send(returnResults);
	    	}
		});
    }
};

module.exports = opportunities;

