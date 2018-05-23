var dbServer = require('../dbServer');
var mysql = require('mysql');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

var login = {
	
	isUserLoggedIn: function(request, response) { 'use strict';
		console.log("\n---isUserLoggedIn route called---\n");
		
		if(session.isLoggedIn == true) {
            response.send({
            	isLoggedIn: true,
            	email: session.email,
            	personId: session.personId,
            	personName: session.personName
            });
            console.log("session exists, logged in as:" + session.personName);
		} else {
            response.send({isLoggedIn: false});
            console.log("session expired");
		}
	},

	login: function(request, response) { 'use strict';
		console.log("---login route called---");

		if(request.body.email && request.body.credential) {
			
			var credential = request.body.credential;
	        var sprocParams = [request.body.email];
	        console.log("calling sprocFindPer");
	        console.log("params: " + sprocParams);
	        dbServer.sproc("sprocFindPer", sprocParams, function(results) {
		        if (results && results.error) {
					dbServer.processSprocError(results, response);
		    	} else {
		    		var returnResults = {};
		    		if(results[0][0].loginStatus === 'valid') {
			    		var person = results[1][0];
			    		if(bcrypt.compareSync(credential, person.credential)) {
			    			returnResults.loginStatus = 'valid';
			    			returnResults.person = person;
			    			session.email = returnResults.person.email;
				            session.personId = returnResults.person.personId;
				            session.personName = returnResults.person.personName;
				            session.isLoggedIn = true;
				            console.log("logged in as:" + returnResults.person.personName);
						} else {
							returnResults.loginStatus = 'invalid';
							returnResults.message = "password credentials don't match";
							console.log("login invalid: password credentials don't match");
						}
		    		} else {
		    			returnResults.loginStatus = 'invalid';
		    			returnResults.message = 'cannot find person with that email';
		    		}
		    		response.send(returnResults);
		    	}
	       });
	    } else {
			response.send({
				error: 'invalid paramaters',
				errorMessage: 'no email or password'
			});
		}
	},
	
	logout: function(request, response) { 'use strict';
		console.log("logout route called");
        session.isLoggedIn = false;
        session.email = null;
        session.personId = null;
        session.personName = null;
		//response.redirect('/');
		console.log("session removed");
	}
};

module.exports = login;

