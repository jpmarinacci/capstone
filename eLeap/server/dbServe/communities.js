var dbServer = require('../dbServer');
var mysql = require('mysql');

var communities = {
	
	getCommunities: function(request, response) { 'use strict';	
		var sprocName = "sprocAllCommunities";
		console.log(sprocName + " called");
		var params = [];
		console.log("getCommunities route called");
		console.log("calling "+ sprocName);
		function processSproc(results) {
			dbServer.processSproc(results, response);
		};
		dbServer.sproc(sprocName, params, processSproc);
    }
};

module.exports = communities;
