var dbServer = require('../dbServer');
var mysql = require('mysql');

var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

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

		function processSproc(results) {
	        if (results && results.error) {
				dbServer.processSprocError(results, response);
	    	} else {
	    		var returnResults = {};
	    		
	    		if(results[0][0].LoginStatus === 'Success') {
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
        };
        
        var params = [
			request.body.email ? request.body.email : null,
        	request.body.credential ? request.body.credential : null
        ];

        console.log("params: " + params);
        dbServer.sproc("sprocLogin", params, processSproc);
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

