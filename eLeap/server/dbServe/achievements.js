var dbServer = require('../dbServer');
var mysql = require('mysql');

var achievements = {
	createAchievement: function(request, response) { 'use strict';
		var sprocName = "sprocName";
		var params = [];
		console.log("createAchievement route called");
		console.log("calling "+ sprocName);
		function processSproc(results) {
			dbServer.processSproc(results, response);
		};
		dbServer.sproc(sprocName, params, processSproc);
	},
	 
	getAchievements: function(request, response) { 'use strict';
		var sprocName = "sprocAllAchievement";
		var params = [];
		console.log("getAchievements route called");
		console.log("calling "+ sprocName);
		function processSproc(results) {
			dbServer.processSproc(results, response);
		};
		dbServer.sproc(sprocName, params, processSproc);
	}
};

module.exports = achievements;
