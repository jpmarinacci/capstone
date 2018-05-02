var dbServer = require('../dbServer');
var mysql = require('mysql');

var login = {
	
	isUserLoggedIn: function(request, response) { 'use strict';
		console.log("---\nisUserLoggedIn route called\n---");
		var sessions = request.session;
		
		if(sessions.user) {
			response.send(sessions.user);
            console.log("session exist, logged in :" + sessions.user);
		} else {
			response.send("session expired :" + sessions);
            console.log("session expired :" + sessions.user);
		}
	},
	
	login: function(request, response) { 'use strict';
		console.log("---\nlogin route called\n---");

		var sessions = request.session;
        var sprocName = "sprocAuth";

		//From Form Post
		//var userEmail = request.body.email ? request.body.email : null;;
        //var userPassword = request.body.password ? request.body.password : null;

        var userEmail = "etsunny@gmail.com";
		var userPassword = "bc9b5718afdffe85fb13555347969ff5";//123456abcd

        var params = [
            userEmail,
        	userPassword
        ];

        console.log("Params:" + params);

        //Verify from DB
		function processSproc(results) {
            dbServer.processSproc(results, response);
        };
        dbServer.sproc(sprocName, params, processSproc);

        //Save
		sessions.user = userEmail;

		console.log("logged in as:" + sessions.user);
	},
	
	logout: function(request, response) { 'use strict';
		console.log("logoff route called");

        request.logout();
        request.session.destroy(function(err) {
	  		if(err) {
	  			console.log(err);
	  		} else {
	  			//res.redirect('/');
	  			console.log("session destroyed");
	  		}
		});
	}
};

module.exports = login;
