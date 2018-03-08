var dbServer = require('../dbServer');
var mysql = require('mysql');

var applicationState = {
	
	updateApplicationState: function(request, response) { 'use strict';	
		var sprocName = "sprocName";
		var params = [
			request.body.ApplicationStateID ? request.body.ApplicationStateID : null,
			request.body.PersonID ? request.body.PersonID : null,
		];
		console.log("updateApplicationState route called");
		console.log("calling "+ sprocName);
		function processSproc(results) {
			dbServer.processSproc(results, response);
		};
		dbServer.sproc(sprocName, params, processSproc);
    }
};

module.exports = applicationState;
