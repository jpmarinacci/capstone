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
			if (results && results.error) {
				results.sprocThatErrored = "sprocAllCommunities";
				dbServer.processSprocError(results, response);
	    	} else {
	    		var returnResults = results[0];
	    		console.log("sprocAllCommunities successful");
	    		response.send(returnResults);
	    	}
		};
		dbServer.sproc(sprocName, params, processSproc);
    }
};

module.exports = communities;
