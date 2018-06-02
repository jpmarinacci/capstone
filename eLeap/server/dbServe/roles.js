var dbServer = require('../dbServer');
var mysql = require('mysql');

var roles = {
	getRoles: function(request, response) { 'use strict';
		console.log("--- getRoles route called ---");
		console.log("calling sprocAllRole");
		
		dbServer.sproc("sprocAllRole", [], function processSproc(results) {
			if (results && results.error) {
				results.sprocThatErrored = "sprocAllRole";
				dbServer.processSprocError(results, response);
	    	} else {
	    		console.log("sprocAllRole successful");
	    		var returnResults = results[0] || {};
	    		returnResults.status = "success";
	    		response.send(returnResults);
	    	}
		});
    }
};

module.exports = roles;
