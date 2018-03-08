var dbServer = require('../dbServer');
var mysql = require('mysql');

var login = {
	
	login: function(request, response) { 'use strict';
		console.log("login route called");
		//login tbd
	},
	
	logout: function(request, response) { 'use strict';
		console.log("logoff route called");
		//logout tbd
	}
};

module.exports = login;
