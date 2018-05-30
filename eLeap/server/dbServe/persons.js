var dbServer = require('../dbServer');
var mysql = require('mysql');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

var persons = {
	signupPerson: function(request, response) { 'use strict';
		console.log('--- signupPerson route called ---');
		if(!request.body.email || !request.body.credential) {
			response.send('invalid paramaters -- no email or credential');
			return;
		}
		var hashedCredential = bcrypt.hashSync(request.body.credential, 10);
		var params = [
			hashedCredential,
			request.body.email,
			request.body.personName ? request.body.personName : null,
			request.body.phone ? request.body.phone : null,
			request.body.picURL ? request.body.picURL: null,
			request.body.roleId ? request.body.roleId : 1
		];
		
		console.log("calling sprocAddPer");
		dbServer.sproc("sprocAddPer", params, function(results) {
			if (results && results.error) {
				dbServer.processSprocError(results, response);
	    	} else {
	    		console.log("sproc Add per returned");
	    		//console.log(results);
	    		var person = results[0] ? results[0][0] || results[0]: {};
	    		if(person && person.personId) {
	    			delete person.credential;
	    			person.status = "success";
	    		}
    			console.log("sprocAddPer successful");
    			//add new cookie code here -- this overwrites the session on every user login
    			//this makes multiple user logins on the same server work incorrectly
    			session.email = person.email;
	            session.personId = person.personId;
	            session.isLoggedIn = true;
	    		console.log("added person to login session");
	    	
	    		response.send(person);
	    	}
		});
    },
        
    updatePerson: function(request, response) { 'use strict';
    	console.log("--- updatePerson route called ---");
    	if(!request.body.personId) {
			response.send('invalid paramaters -- no personID');
			return;
		}
		var params = [
			request.body.credential ? request.body.credential : null,
			request.body.email ? request.body.email: null,
			request.body.personId ? Number(request.body.personId): null,
			request.body.personName ? request.body.personName: null,
			request.body.phone ?  request.body.phone: null,
			request.body.picURL ? request.body.picURL: null,
			request.body.roleId ? request.body.roleId: 1,
			request.body.themeId ? request.body.themeId: null
		];
		
		console.log("calling sprocUpdatePer");
		dbServer.sproc("sprocUpdatePer", params, function(results) {
			if (results && results.error) {
				dbServer.processSprocError(results, response);
	    	} else {
	    		var person = results[0] ? results[0][0] || results[0]: {};
	    		if(person && person.personId) {
	    			delete person.credential;
	    			person.status = "success";
	    			console.log("sprocUpdatePer successful");
	    			console.log("personId: "+ person.personID);
	    		} else {
	    			console.log("sprocUpdatePer error:");
	    			console.log(results);
	    		}
	    		
	    		response.send(person);
	    	}
		});
	},
    
    getPerson: function(request, response) { 'use strict';
    	console.log("--- getPerson route called ---");
    	if(!request.body.email) {
			response.send('invalid paramaters -- no email');
			return;
		}
		var params = [
			//request.body.personId ? request.body.personId : null,
			request.body.email ? request.body.email : null
		];
		
		console.log("calling sprocFindPer");
		dbServer.sproc("sprocFindPer", params, function(results) {
			if (results && results.error) {
				dbServer.processSprocError(results, response);
	    	} else {
	    		var returnResults = results[0];
	    		console.log("sprocFindPer successful");
	    		response.send(returnResults);
	    	}
		});
    },
	 
	getAllPersons: function(request, response) { 'use strict';
		console.log("--- getAllPersons route called ---");
		console.log("calling sprocAllPer");
		
		dbServer.sproc("sprocAllPer", [], function(results) {
			if (results && results.error) {
				dbServer.processSprocError(results, response);
	    	} else {
	    		var returnResults = results[0] || {};
	    		returnReuslts.status = "success";
	    		console.log("sprocAllPer successful");
	    		response.send(returnResults);
	    	}
		});
	}
};

module.exports = persons;

