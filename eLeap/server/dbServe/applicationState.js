var dbServer = require('../dbServer');
var mysql = require('mysql');

var applicationState = {
	
	updateApplicationState: function(request, response) { 'use strict';	
		var sprocName = "sprocUpdateAppState";
		var params = [
			request.body.applicationStateId ? Number(request.body.applicationStateId): null,
			request.body.personId ? Number(request.body.personId): null,
		];
		console.log("updateApplicationState route called");
		console.log("calling "+ sprocName);
		dbServer.sproc(sprocName, params, function (results) {
			if (results && results.error) {
				results.sprocThatErrored = "sprocUpdateAppState";
				dbServer.processSprocError(results, response);
	    	} else {
	    		var returnResults = results[0];
	    		console.log("sprocUpdateAppState successful");
	    		response.send(returnResults);
	    	}
		});
    }
};

module.exports = applicationState;
