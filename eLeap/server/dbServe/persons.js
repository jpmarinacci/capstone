var dbServer = require('../dbServer');
var mysql = require('mysql');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var cryptoAlgorithm = 'aes-256-ctr';
var cryptoPassword = 'squirrelFart';

var persons = {
	signupPerson: function(request, response) { 'use strict';
		console.log('--- signupPerson route called ---');
		if(!request.body.email || !request.body.credential) {
			response.send({invalid:'invalid paramaters -- no email or credential'});
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
				results.sprocThatErrored = "sprocAddPer";
				dbServer.processSprocError(results, response);
	    	} else {
	    		console.log("sproc Add per returned");
	    		
	    		//CanNotInsert:1064
	    		if(Array.isArray(results) && results[0]){
	    			if(Array.isArray(results[0])){
	    				var firstElement = results[0][0];
	    				if(firstElement.CanNotInsert) {
	    					console.log("error can not insert into database");
	    				}
	    			}
	    		}
	    		var person = (results && results[0] && results[1] && results[1][0]) ? results[1][0] : {};
	    		person.status = (results && results[0] && results[0][0]) ? results[0][0].status : "invalid";
	    		if(person && person.personId) {
	    			delete person.credential;
	    			console.log("sprocAddPer successful");
	    			console.log("setting new cookie");
					var personIdString = "" + person.personId;
					var cipher = crypto.createCipher(cryptoAlgorithm, cryptoPassword);
					var encyrptedPersonId = cipher.update(personIdString, 'utf8', 'hex');
					encyrptedPersonId += cipher.final('hex');
					response.cookie('eLeapId', encyrptedPersonId,{
						maxAge: 2592000, //1 month
						httpOnly: true
					});
					console.log(response.cookie);
	    		}
	    		response.send(person);
	    	}
		});
    },
        
    updatePerson: function(request, response) { 'use strict';
    	console.log("--- updatePerson route called ---");
    	if(!request.body.personId || !request.body.credential) {
			response.send({invalid:'invalid paramaters -- no personId or credential'});
			return;
		}
		var hashedCredential = bcrypt.hashSync(request.body.credential, 10);
		var params = [
			hashedCredential,
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
				results.sprocThatErrored = "sprocUpdatePer";
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
    	if(!request.body.personId) {
			response.send('invalid paramaters -- no personId');
			return;
		}
		var params = [
			request.body.personId
		];
		
		console.log("calling sprocFindPerId");
		dbServer.sproc("sprocFindPerId", params, function(results) {
			if (results && results.error) {
				results.sprocThatErrored = "sprocFindPerId";
				dbServer.processSprocError(results, response);
	    	} else {
	    		console.log("sprocFindPerId returned");
	    		console.log(results);
	    		var returnResults = {};
	    		if(Array.isArray(results) && results[0]){
	    			if(Array.isArray(results[0])){
	    				var person = results[1][0];
	    				if(person && person.length) {
	    					delete person.credential;
	    					returnResults.status = "success";
	    				}
	    				returnResults = person;
			    		console.log("sprocFindPerId successful");
			    		console.log(returnResults);
	    			}
	    		} else {
	    			returnResults = {
		    			'status':'invalid'
		    		};
	    		}
	    		response.send(returnResults);
	    	}
		});
    },
	 
	getAllPersons: function(request, response) { 'use strict';
		console.log("--- getAllPersons route called ---");
		console.log("calling sprocAllPer");
		
		dbServer.sproc("sprocAllPer", [], function(results) {
			if (results && results.error) {
				results.sprocThatErrored = "sprocAllPer";
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

