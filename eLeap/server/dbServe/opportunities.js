var dbServer = require('../dbServer');
var mysql = require('mysql');

var opportunities = {
	
	createOpportunity: function(request, response) { 'use strict';
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
	    		var returnResults = results[0];
	    		console.log("sprocAddOpp successful");
	    		console.log("created opp oppId: " + returnResults.opportunityId);
				console.log("created opp title: " + returnResults.title);
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
		dbServer.sproc(sprocName, params, function(results) {
			console.log("---------------------get oppportunity results: -----------");
			if (results && results.error) {
				dbServer.processSprocError(results, response);
	    	} else {
	    		var returnResults;
    			console.log('results returned:');
    			console.log(results);
    			returnResults = results;
	    		if(results[0]) {
	    			if(results[0][0]) {
	    				returnResults = results[0][0];
	    				console.log("results[0][0]");
	    				if(results[0][0][0]) {
	    					returnResults = results[0][0][0];
	    					console.log("results[0][0][0]");
	    				}
		    		}
		    		if(results[0][1]) {
		    			returnResults = results[0][1];
		    			console.log("results[0][1]");
		    		}
		    		if(results[0][2]) {
		    			returnResults = results[0][2];
		    			console.log("results[0][2]");
		    		}
		    		if(results[0][3]) {
		    			returnResults = results[0][3];
		    			console.log("results[0][3]");
		    		}
		    	}
		    	if(results[1]) {
		    		if(results[1][0]) {
		    			returnResults = results[1][0];
		    			console.log("results[1][0]");
		    			if(results[1][0][0]) {
	    					returnResults = results[1][0][0];
	    					console.log("results[1][0][0]");
	    				}
		    		}
		    		if(results[1][1]) {
		    			returnResults = results[1][1];
		    			console.log("results[1][1]");
		    		}
		    		if(results[1][2]) {
		    			returnResults = results[1][2];
		    			console.log("results[1][2]");
		    		}
		    		if(results[1][3]) {
		    			returnResults = results[1][3];
		    			console.log("results[1][3]");
		    		}
		    	}
		    	if(results[2]) {
		    		if(results[2][0]) {
		    			returnResults = results[2][0];
		    			console.log("results[2][0]");
		    			if(results[2][0][0]) {
	    					returnResults = results[2][0][0];
	    					console.log("results[2][0][0]");
	    				}
		    		}
		    		if(results[2][1]) {
		    			returnResults = results[2][1];
		    			console.log("results[2][1]");
		    		}
		    		if(results[2][2]) {
		    			returnResults = results[2][2];
		    			console.log("results[2][2]");
		    		}
		    		if(results[2][3]) {
		    			returnResults = results[2][3];
		    			console.log("results[2][3]");
		    		}
		    	}
		    	if(results[3]) {
		    		if(results[3][0]) {
		    			returnResults = results[3][0];
		    			console.log("results[3][0]");
		    		}
		    		if(results[3][1]) {
		    			returnResults = results[3][1];
		    			console.log("results[3][1]");
		    		}
		    		if(results[3][2]) {
		    			returnResults = results[3][2];
		    			console.log("results[3][2]");
		    		}
		    		if(results[3][3]) {
		    			returnResults = results[3][3];
		    			console.log("results[3][3]");
		    		}
		    	}
	    		
	    		console.log("----get oppportunity return results:----");
	    		console.log(returnResults);
	    		response.send(returnResults);
	    	}
		});
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
		console.log("updateOpportunity route called");
		if(!request.body.opportunityId) {
			response.send("denied: no opportunity Id");
		}
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
	    		var returnResults = results[0] ? results[0][0] || {} : {};
	    		if(results.message === "success") {
	    			returnResults.message = "success";
	    			console.log("success");
	    		}
	    		console.log("results:");
	    		console.log(returnResults);
	    		response.send(returnResults);
	    	}
		});
   }
};

module.exports = opportunities;

