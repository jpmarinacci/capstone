var dbServer = require('../dbServer');
var mysql = require('mysql');
//var fileStore = require('session-file-store');

var login = {
	
	isUserLoggedIn: function(request, response) { 'use strict';
		console.log("---\nisUserLoggedIn route called\n---");

		var sess = request.session;
        console.log("session :" + sess.loginUser);

		if(sess.isLoggedIn == true) {
			response.send(sess.loginUser);
            console.log("session exist, logged in :" + sess.loginUser);
		} else {
			response.send("session expired :" + sess);
            console.log("session expired :" + sess.loginUser);
		}
	},

	login: function(request, response) { 'use strict';

		console.log("---\nlogin route called\n---");

		var sess = request.session;
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
		sess.loginUser = userEmail;
        sess.isLoggedIn = true;

		console.log("logged in as:" + sess.loginUser);
	},
	
	logout: function(request, response) { 'use strict';
		console.log("logoff route called");

        request.logout();
        request.session.destroy(function(err) {
	  		if(err) {
	  			console.log(err);
	  		} else {
                response.redirect('/');
	  			console.log("session destroyed");
	  		}
		});
	}
};

module.exports = login;