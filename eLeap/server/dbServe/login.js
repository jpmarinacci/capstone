var dbServer = require('../dbServer');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var express = require('express');
var crypto = require('crypto');
var cryptoAlgorithm = 'aes-256-ctr';
var cryptoPassword = 'squirrelFart';
var app = express();
app.use(cookieParser());


var login = {
	
	isUserLoggedIn: function(request, response) { 'use strict';
		console.log("--- isUserLoggedIn route called ---");
		if(!request || !request.headers) {
			console.log('error: no response headers');
			response.send({
				isLoggedIn: false,
				error: true,
				errorMessage: 'invalid request headers'
			});
			return;
		}
		var isLoggedOut = true;
		if(request.headers.cookie) {
			var headersCookie = request.headers.cookie;		
			headersCookie = headersCookie.toString();
			var foundCookieSpot = headersCookie.indexOf("eLeapId=");
			if(foundCookieSpot >= 0) {
				var foundCookie = headersCookie.slice(foundCookieSpot, foundCookieSpot + 12);
				if(foundCookie){
					console.log('found cookie');
					var encryptedCookieId = foundCookie.substr(8);
					var decipher = crypto.createDecipher(cryptoAlgorithm, cryptoPassword);
					var personId = decipher.update(encryptedCookieId, 'hex', 'utf8');
					personId += decipher.final('utf8');
					personId = Number(personId);
					if(!isNaN(personId)){
						isLoggedOut = false;
						console.log("logged in as personId: " + personId);
						response.send({
			            	isLoggedIn: true,
			            	personId: Number(personId)
			            });
			        	return;
		        	}    
	           }
			}
		} 
		if(isLoggedOut) {
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
						var personIdString=""+person.personId;
						
						var cipher = crypto.createCipher(cryptoAlgorithm, cryptoPassword);
						var encyrptedPersonId = cipher.update(personIdString, 'utf8', 'hex');
						encyrptedPersonId += cipher.final('hex');
						response.cookie('eLeapId', encyrptedPersonId,{
							maxAge: 2592000, //1 month
							httpOnly: true
						});
						console.log(response.cookie);
			            console.log("logged in as:" + person.personName);
			            console.log("logged in as personId: " + person.personId);
			            console.log("ignore warning (node 14184) cipher is sufficient for encrypting cookie");
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

