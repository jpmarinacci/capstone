var dbServer = require('../dbServer');
var mysql = require('mysql');

var collegeClasses = {
	
	createClass: function(request, response) {'use strict';
		console.log('--- createClass route called ---');
		if(!request.body.className) {
			response.send({invalid:'invalid paramaters -- no className'});
			return;
		}
		var params = [
			request.body.className ? request.body.className : null,
			request.boyd.classType ? request.body.classType: null,
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
	    		
	    		//CanNotInsert:1064
	    		if(Array.isArray(results) && results[0]){
	    			if(Array.isArray(results[0])){
	    				var firstElement = results[0][0];
	    				if(firstElement.CanNotInsert) {
	    					console.log("error can not insert into database");
	    				}
	    			}
	    		}
	    		var returnResults = results[0] ? results[0][0] || results[0]: {};
	    		if(returnResults.classId) {
	    			returnResults.status = "success";
	    			console.log("sprocAddClass successful");
	    			console.log("created class:" + returnResults.className);
	    		} else {
	    			console.log("sprocAddClass invalid");
	    			returnResults.status = "invalid";
	    		}
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
			request.boyd.classType ? request.body.classType: null,
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
	    		
	    		//CanNotInsert:1064
	    		if(Array.isArray(results) && results[0]){
	    			if(Array.isArray(results[0])){
	    				var firstElement = results[0][0];
	    				if(firstElement.CanNotInsert) {
	    					console.log("error can not insert into database");
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
	    		var returnResults = (results && results[0] && results[0][0] ? results[0][0]: results) || {};
	    		returnResults.status = "success";
    			console.log("sprocDeleteClass successful");
	    		response.send(returnResults);
	    	}
		});
	},
	
	removeStudent: function(request, response) {'use strict';
		console.log('--- removeStudent route called ---');
		if(!request.body.classId && request.body.email) {
			response.send({invalid:'invalid paramaters -- no classId or email'});
			return;
		}
		var params = [
			request.body.classId,
			request.body.email
		];
		
		console.log("calling sprocDeleteStudent");
		dbServer.sproc("sprocDeleteStudent", params, function(results) {
			if (results && results.error) {
				results.sprocThatErrored = "sprocDeleteStudent";
				dbServer.processSprocError(results, response);
	    	} else {
	    		console.log("sprocDeleteStudent returned");
	    		var returnResults = (results && results[0] && results[0][0] ? results[0][0]: results) || {};
	    		returnResults.status = "success";
    			console.log("sprocDeleteStudent successful");
	    		response.send(returnResults);
	    	}
		});
	},
	
	getOwnedClasses: function(request, response) { 'use strict';	
		console.log("--- getOwnedClasses route called ---");
		if(!request.body.ownerId) {
			response.send('invalid paramaters -- no ownerId');
			return;
		}
		var params = [
			Number(request.body.ownerId)
		];
		console.log("calling sprocAllOwnClass");
		dbServer.sproc("sprocAllOwnClass", params, function(results) {
			if (results && results.error) {
				results.sprocThatErrored = "sprocAllOwnClass";
				dbServer.processSprocError(results, response);
	    	} else {
	    		console.log("sprocAllOwnClass returned");
	    		var returnResults = results ? results[0] ? results[0]: results: {'status':'success', 'message':'no results'};
	    		console.log("sprocAllCommunities successful");
	    		response.send(returnResults);
	    	}
		});
	},
	
	getJoinedClasses: function(request, response) { 'use strict';	
		console.log("--- getJoinedClasses route called ---");
		if(!request.body.personId) {
			response.send('invalid paramaters -- no personId');
			return;
		}
		var params = [
			Number(request.body.personId)
		];
		console.log("calling sprocAllJoinClass");
		dbServer.sproc("sprocAllJoinClass", params, function(results) {
			if (results && results.error) {
				results.sprocThatErrored = "sprocAllJoinClass";
				dbServer.processSprocError(results, response);
	    	} else {
	    		console.log("sprocAllJoinClass returned");
	    		var returnResults = {};
	    		if(results && results.length && Array.isArray(results[0])) {
	    			console.log("sprocAllJoinClass successful");
	    			console.log(results);
	    			returnResults = results[0][0] && results[0][1] ? results[0][1] : {'status':'no results'};
	    			console.log("joined classes: "+ returnResults.length);
	    			/*if(results[0][0] && results[0][0].status) {
	    				returnResults.status = results[0][0].status;
	    			}*/
	    		} else {
	    			console.log("results returned malformed - sending status:invalid");
	    			returnResults.status = "invalid";
	    		}
	    		response.send(returnResults);
	    	}
		});
	},
	
	addStudent: function(request, response) { 'use strict';	
		console.log("--- addStudent route called ---");
		if(!request.body.classId || !request.body.email) {
			response.send('invalid paramaters -- no classId or no email');
			return;
		}
		var params = [
			Number(request.body.classId),
			request.body.email
		];
		console.log("calling sprocAddStudent");
		dbServer.sproc("sprocAddStudent", params, function(results) {
			if (results && results.error) {
				results.sprocThatErrored = "sprocAddStudent";
				dbServer.processSprocError(results, response);
	    	} else {
	    		console.log("sprocAddStudent returned");
	    		var returnResults = (results && results[0] && results[1] && results[1][0] ? results[1][0] : results) || {};
	    		if(results && results[0] && results[0][0] && results[0][0].status) {
	    			returnResults.status =  results[0][0].status;
	    		} else {
	    			returnResults.status = "success";
	    		}
	    		
	    		console.log("sprocAddStudent successful");
	    		response.send(returnResults);
	    	}
		});
	},
	
	addStudents: function(request, response) { 'use strict';	
		console.log("--- addStudents route called ---");
		if(!request.body.ownerId) {
			response.send('invalid paramaters -- no ownerId');
			return;
		}
		var params = [
			Number(request.body.ownerId)
		];
		console.log("calling sprocAddStudents");
		dbServer.sproc("sprocAddStudents", params, function(results) {
			if (results && results.error) {
				results.sprocThatErrored = "sprocAddStudents";
				dbServer.processSprocError(results, response);
	    	} else {
	    		console.log("sprocAddStudents returned");
	    		var returnResults = (results && results[0] ? results[0] : results) || {};
	    		returnResults.status = "success";
	    		console.log("sprocAddStudents successful");
	    		response.send(returnResults);
	    	}
		});
	},
	
	getStudentsForClass: function(request, response) { 'use strict';
		console.log("--- getStudentsForClass route called ---");
		if(!request.body.ownerId && request.body.classId) {
			response.send('invalid paramaters -- no ownerId or classId');
			return;
		}
		var params = [
			Number(request.body.classId)
		];
		console.log("calling sprocAllStudentInClass");
		dbServer.sproc("sprocAllStudentInClass", params, function(results) {
			if (results && results.error) {
				results.sprocThatErrored = "sprocAllStudentInClass";
				dbServer.processSprocError(results, response);
	    	} else {
	    		console.log("sprocAllStudentInClass returned");
	    		var returnResults = (results && results[0] ? results[0]: results) || {};
	    		returnResults.status = results[0] ? results[0] :"success";
	    		console.log("sprocAllStudentInClass successful");
	    		response.send(returnResults);
	    	}
		});
	}
};

module.exports = collegeClasses;

