var dbServer = require('../dbServer');
var mysql = require('mysql');

var session = require('express-session');
//var fileStore = require('session-file-store')(session);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var login = {
	
	isUserLoggedIn: function(request, response) { 'use strict';
		console.log("---\nisUserLoggedIn route called\n---");

        console.log("session :" + session.loginUser + "," + session.isLoggedIn);

		if(session.isLoggedIn == true) {
            response.send({isLoggedIn: true});
            console.log("session exist, logged in :" + session.loginUser);
		} else {
            response.send({isLoggedIn: false});
            console.log("session expired :" + session.loginUser);
		}
	},

	login: function(request, response) { 'use strict';

		console.log("---\nlogin route called\n---");

		//var sess = request.session;
        var sprocName = "sprocAuth";

		//From Form Post
		//var userEmail = request.body.email ? request.body.email : null;;
        //var userPassword = request.body.password ? request.body.password : null;

        var userName = "Maricel Medina";
        var userEmail = "maricel.medina@bellevuecollege.edu";
		var userPassword = "bc9b5718afdffe85fb13555347969ff5";//123456abcd

        var params = [
            userName,
			userEmail,
        	userPassword
        ];

        console.log("Params:" + params);

        //Verify from DB
		/*function processSproc(results) {
            dbServer.processSproc(results, response);
        };
        dbServer.sproc(sprocName, params, processSproc);*/

        //Save
		//sess.loginUser = userEmail;
        //sess.isLoggedIn = true;

        session.loginUserName = userName;
        session.loginUser = userEmail;
        session.isLoggedIn = true;

		console.log("logged in as:" + session.loginUser);
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
