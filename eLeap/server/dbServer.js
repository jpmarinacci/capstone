
var mysql = require('mysql');
var fs = require('fs');

instantiateDbServer = function() {
	var dbSettings = JSON.parse(fs.readFileSync(__dirname + '/dbSettings.json'));
	var dbServer = {
		isValidParam: function(param, type) {
			if(typeof param === type){
				
			}
			else return false;
		},
		sproc: function(sprocName, sprocParams, callback) {
	        
	    },
	    makeQs: function(numArgs) {
			var qs = "";
			for(var i = 0; i < numArgs; i++) {
				qs += (i < numArgs-1) ? "?," : "?";
			}
	        return "(" + qs + ");";
		},
	    processSproc: function(results, response) {
	    	
	    },
		processSprocError: function(results, response) {
			
	    },
	    attempts: 0,
		isConnectPending: false,
		connect: function() {
			
		},
		connectCallback: function(response) {
			
		},
		connectError: function(error) {
			
		},
		retry: function() {
			
		},
	    close: function() {
	    	
		}
	};
	
	var thisDbServer = this;
	dbServer.connect();
	
  	return dbServer;
};

module.exports = instantiateDbServer();

