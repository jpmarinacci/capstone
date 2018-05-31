var dbServer = require('../dbServer');
//var mysql = require('mysql');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var express = require('express');
var app = express();
app.use(cookieParser());


var login = {
	
	isUserLoggedIn: function(request, response) { 'use strict';
		console.log("--- isUserLoggedIn route called ---");
		var cookie = request.headers.cookie;
		if(cookie && cookie && cookie.slice(0, 7) == 'eLeapId') {
			console.log('got that cookie');
			var personId = cookie.substr(8);
			console.log("logged in as personId: " + personId);
			response.send({
            	isLoggedIn: true,
            	personId: Number(personId)
            });
		} else {
			console.log('not logged in');
			response.send({isLoggedIn: false});
		}
	},

	login: function(request, response) { 'use strict';
		console.log("--- login route called ---");
		if(!request.body.email || !request.body.credential) {
			response.send('invalid paramaters -- no email or credential');
			return;
		}
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
		    			delete person.credential;
		    			returnResults.person = person;
		    			
						console.log("setting new cookie");
						response.cookie('eLeapId', person.personId,{
							maxAge: 2592000, //1 month
							httpOnly: true
						});
						console.log(response.cookie);
			            console.log("logged in as:" + person.personName);
			            console.log("logged in as personId: " + person.personId);
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
	},
	
	logout: function(request, response) { 'use strict';
		console.log("--- logout route called ---");
        response.clearCookie('eLeapId');
		console.log("cookie removed");
		response.send({
			status: "success",
			message: "logged out"
		});
		console.log("--- user is logged out ---");
	}
};

module.exports = login;

