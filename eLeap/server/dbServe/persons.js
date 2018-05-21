var dbServer = require('../dbServer');
var mysql = require('mysql');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

var persons = {
	signupPerson: function(request, response) { 'use strict';
		console.log('---signupPerson route called---\n');
	
		if(request.body.email && request.body.password) {
			var hashedCredential = bcrypt.hashSync(request.body.password, 10);
			var params = [
				request.body.email,
				hashedCredential,
				request.body.personName ? request.body.personName : null,
				request.body.phone ? request.body.phone : null,
				request.body.roleId ? request.body.roleId : 1,
				//request.body.themeId ? request.body.themeId : null,
				//request.body.picId ? request.body.picId : null
			];
			
			console.log("calling sprocAddPer");
			console.log("sproc params:");
			console.log(params);
			dbServer.sproc("sprocAddPer", params, function(results) {
				if (results && results.error) {
					dbServer.processSprocError(results, response);
		    	} else {
		    		var person = results[0];
	    			console.log("sprocAddPer successful");
	    			session.email = person.email;
		            session.personId = person.personId;
		            session.isLoggedIn = true;
		    		console.log("added person to login cookie");
		    		response.send(person);
		    	}
			});
			
		} else {
			response.send({
				error: 'invalid paramaters',
				errorMessage: 'no email or credential'
			});
		}
    },
    
    getPerson: function(request, response) { 'use strict';
		var sprocName = "sprocFindPer";
		var params = [
			request.body.personId ? request.body.personId : null,
			//request.body.email ? request.body.email : null
		];
		console.log("getPerson route called");
		console.log("calling "+ sprocName);
		//console.log("sproc params:");
		//console.log(params);
        //console.log("Session check: " + request.session.name);

		function processSproc(results) {
			if (results && results.error) {
				dbServer.processSprocError(results, response);
	    	} else {
	    		var returnResults = results[0];
	    		console.log("sprocFindPer successful");
	    		response.send(returnResults);
	    	}
		};
		dbServer.sproc(sprocName, params, processSproc);
    }, 
    
    updatePerson: function(request, response) { 'use strict';
    	var sprocName = "sprocUpdatePer";
		var params = [
			request.body.personId ? Number(request.body.personId): null,
		];
		console.log("updatePerson route called");
		console.log("calling " + sprocName);
		function processSproc(results) {
			if (results && results.error) {
				dbServer.processSprocError(results, response);
	    	} else {
	    		var returnResults = results[0];
	    		console.log("sprocUpdatePer successful");
	    		response.send(returnResults);
	    	}
		};
		dbServer.sproc(sprocName, params, processSproc);
	},
	 
	getAllPersons: function(request, response) { 'use strict';
		var sprocName = "sprocAllPer";
		var params = [];
		console.log("getAllPersons route called");
		console.log("calling " + sprocName);
		function processSproc(results) {
			if (results && results.error) {
				dbServer.processSprocError(results, response);
	    	} else {
	    		var returnResults = results[0];
	    		console.log("sprocAllPer successful");
	    		response.send(returnResults);
	    	}
		};
		dbServer.sproc(sprocName, params, processSproc);
	}
};

module.exports = persons;

