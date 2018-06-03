var dbServer = require('../dbServer');
var mysql = require('mysql');

var collegeClasses = {
	
	createClass: function(request, response) {'use strict';
		console.log('--- createClass route called ---');
		/*if(!request.body.email || !request.body.credential) {
			response.send({invalid:'invalid paramaters -- no email or credential'});
			return;
		}*/
		var params = [
			request.body.className ? request.body.className : null,
			request.body.courseSummary ? request.body.courseSummary : null,
			request.body.estimatedClassSize ? request.body.estimatedClassSize: null,
			request.body.ownerId ? request.body.ownerId : 3,
			request.body.section ? request.body.section: null,
			request.body.term ? request.body.term: null,
			request.body.year ? request.body.year: null,
		];
		
		console.log("calling sprocAddClass");
		dbServer.sproc("sprocAddClass", params, function(results) {
			if (results && results.error) {
				results.sprocThatErrored = "sprocAddClass";
				dbServer.processSprocError(results, response);
	    	} else {
	    		console.log("sprocAddClass returned");
	    		console.log(results);
	    		
	    		//CanNotInsert:1064
	    		if(Array.isArray(results) && results[0]){
	    			if(Array.isArray(results[0])){
	    				var firstElement = results[0][0];
	    				if(firstElement.CanNotInsert) {
	    					console.log("success --- found the thing");
	    				}
	    			}
	    		}
	    		var returnResults = results[0] ? results[0][0] || results[0]: {};
	    		returnResults.status = "success";
	    		
    			console.log("sprocAddClass successful");
	    		response.send(returnResults);
	    	}
		});
	},
	
	updateClass: function(request, response) {'use strict';
		console.log('--- updateClass route called ---');
		if(!request.body.classId || !request.body.className) {
			response.send({invalid:'invalid paramaters -- no classId or className'});
			return;
		}
		var params = [
			request.body.classId ? request.body.classId : null,
			request.body.className ? request.body.className : null,
			request.body.courseSummary ? request.body.courseSummary : null,
			request.body.estimatedClassSize ? request.body.estimatedClassSize: null,
			request.body.ownerId ? request.body.ownerId : 3,
			request.body.section ? request.body.section: null,
			request.body.term ? request.body.term: null,
			request.body.year ? request.body.year: null,
		];
		
		console.log("calling sprocUpdateClass");
		dbServer.sproc("sprocUpdateClass", params, function(results) {
			if (results && results.error) {
				results.sprocThatErrored = "sprocUpdateClass";
				dbServer.processSprocError(results, response);
	    	} else {
	    		console.log("sprocUpdateClass returned");
	    		console.log(results);
	    		
	    		//CanNotInsert:1064
	    		if(Array.isArray(results) && results[0]){
	    			if(Array.isArray(results[0])){
	    				var firstElement = results[0][0];
	    				if(firstElement.CanNotInsert) {
	    					console.log("success --- found the thing");
	    				}
	    			}
	    		}
	    		var returnResults = results[0] ? results[0][0] || results[0]: {};
	    		returnResults.status = "success";
	    		
    			console.log("sprocUpdateClass successful");
	    		response.send(returnResults);
	    	}
		});
	},
	
	deleteClass: function(request, response) {'use strict';
		console.log('--- deleteClass route called ---');
		if(!request.body.classId) {
			response.send({invalid:'invalid paramaters -- classId'});
			return;
		}
		var params = [
			request.body.classId
		];
		
		console.log("calling sprocDeleteClass");
		dbServer.sproc("sprocDeleteClass", params, function(results) {
			if (results && results.error) {
				results.sprocThatErrored = "sprocDeleteClass";
				dbServer.processSprocError(results, response);
	    	} else {
	    		console.log("sprocDeleteClass returned");
	    		console.log(results);
	    		var returnResults = (results && results[0] ? results[0]: results) || {};
	    		returnResults.status = "success";
	    		
    			console.log("sprocDeleteClass successful");
	    		response.send(returnResults);
	    	}
		});
	},
	
	getOwnedClasses: function(request, response) { 'use strict';	
		console.log("--- getClasses route called ---");
		if(!request.body.ownerId) {
			response.send('invalid paramaters -- no ownerId');
			return;
		}
		var params = [
			Number(request.body.ownerId)
		];
		console.log("calling sprocGetClassByOwnId");
		dbServer.sproc("sprocGetClassByOwnId", params, function processSproc(results) {
			if (results && results.error) {
				results.sprocThatErrored = "sprocAllCommunities";
				dbServer.processSprocError(results, response);
	    	} else {
	    		console.log("sprocGetClassByOwnId returned");
	    		console.log(results);
	    		var returnResults = results ? results[0] ? results[0]: results: {'status':'success', 'message':'no results'};
	    		console.log("sprocAllCommunities successful");
	    		response.send(returnResults);
	    	}
		});
	}
};

module.exports = collegeClasses;
