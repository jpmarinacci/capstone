var dbServer = require('../dbServer');
var mysql = require('mysql');

var roles = {
	
	getRoles: function(request, response) { 'use strict';	
		var sprocName = "sprocAllRole";
		var params = [];
		console.log("getRoles route called");
		console.log("calling " + sprocName);
		function processSproc(results) {
			dbServer.processSproc(results, response);
		};
		dbServer.sproc(sprocName, params, processSproc);
    }
};

module.exports = roles;
