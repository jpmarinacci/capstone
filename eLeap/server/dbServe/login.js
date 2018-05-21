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
		console.log("---login route called---\n");

		if(request.body.email && request.body.credential) {
			
			var hashedCredential = bcrypt.hashSync(request.body.credential, 10);
	        var sprocParams = [
	        	request.body.email
	        	//hashedCredential
	        ];
	        console.log("calling sprcoFindPer");
	        console.log("params: " + sprocParams);
	        //dbServer.sproc("sprocLogin", params, function(results) {
	        dbServer.sproc("sprocFindPer", sprocParams, function(results) {
	        	console.log(results);
		        if (results && results.error) {
					dbServer.processSprocError(results, response);
		    	} else {
		    		var returnResults = {};
		    		
		    		/*returnResults.person = results[1][0];
		    		var hash = returnResults.person.credential;
		    		if(bcrypt.compareSync(credential, hash)) {
					 // Passwords match
					} else {
					 // Passwords don't match
					}*/
					console.log(returnResults.person);
		    		if(results[0][0].loginStatus === 'valid') {
		    			returnResults.loginStatus = 'valid';
		    			returnResults.person = results[1][0];
		    			session.email = returnResults.person.email;
			            session.personId = returnResults.person.personId;
			            session.personName = returnResults.person.personName;
			            session.isLoggedIn = true;
			            console.log("logged in as:" + returnResults.person.personName);
		    		} else {
		    			returnResults.loginStatus = 'invalid';
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

