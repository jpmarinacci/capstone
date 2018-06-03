var dbServer = require('../dbServer');
var mysql = require('mysql');

var achievements = {
	createAchievement: function(request, response) { 'use strict';
		var sprocName = "sprocAddAchieve";
		var params = [];
		console.log("createAchievement route called");
		console.log("calling "+ sprocName);
		function processSproc(results) {
			if (results && results.error) {
				dbServer.processSprocError(results, response);
	    	} else {
	    		var returnResults = results[0];
	    		console.log("sprocAddAchieve successful");
	    		response.send(returnResults);
	    	}
		};
		dbServer.sproc(sprocName, params, processSproc);
	},
	 
	getAchievements: function(request, response) { 'use strict';
		var sprocName = "sprocAllAchievement";
		var params = [];
		console.log("getAchievements route called");
		console.log("calling "+ sprocName);
		function processSproc(results) {
			if (results && results.error) {
				
				dbServer.processSprocError(results, response);
	    	} else {
	    		var returnResults = results[0];
	    		console.log("sprocAllAchievement successful");
	    		response.send(returnResults);
	    	}
		};
		dbServer.sproc(sprocName, params, processSproc);
	}
};

module.exports = achievements;

