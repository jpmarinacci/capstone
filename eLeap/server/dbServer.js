
var mysql = require('mysql');
var fs = require('fs');

instantiateDbServer = function() {
	var dbSettings = JSON.parse(fs.readFileSync(__dirname + '/dbSettings.json'));
	var dbServer = {
	    attempts: 0,
		isConnectPending: false,
		connect: function() {
			if(!this.isConnectPending) {
				this.isConnectPending = true;
				this.attempts++;
				this.connection = mysql.createConnection({
					charset: "utf8mb4",
					connectTimeout: 20000,
					database: dbSettings.dbName,
					host: dbSettings.dbServer,
					password: dbSettings.dbUserPassword,
					timezone: "utc",
					user: dbSettings.dbUserName
				});
				this.connection.on('error', this.connectError);
				this.connection.connect(this.connectCallback);
			} else {
				return;
			}
		},
		connectCallback: function(response) {
			thisDbServer.isConnectPending = false;
			var error = response;
			if(error) {
				console.log("database connection error: " + error);
				if(thisDbServer.attempts <= 20) {
					thisDbServer.retry();
				} else {
					throw error;
					return;
				}
			} else {
				console.log("database connected");
			}
		},
		connectError: function(error) {
			error = error || {};
			console.log("database connection error: ");
			console.log(error.code ? error.code : "gremlins");
			if(!error.code) {
				throw error;
			}
		},
		retry: function() {
			console.log('-- retry --');
			setTimeout(function() {
				thisDbServer.connect();
			}, 3000);
		},
	    close: function() {
	    	console.log("closing database connection");
	    	if(this.connection) {
	    		this.connection.end();
	    	}
		},
		isValidParam: function(param, type) {
			if(typeof param === type) {
				
			}
			else return false;
		},
	    makeQs: function(numArgs) {
			var qs = "";
			for(var i = 0; i < numArgs; i++) {
				qs += (i < numArgs-1) ? "?," : "?";
			}
	        return "(" + qs + ");";
		},
		sproc: function(sprocName, sprocParams, callback) {
			var sql = "call " + sprocName + this.makeQs(sprocParams.length);

			console.log ("SQL: " + sql);

			function processQuery (error, results, fields) {
				if (error) {
					results = results || {};
					results.error = error;
					console.log("database error:");
					console.log(error.code ? error.code : ": gremlins");
				}
				results.fields = fields;
				if(callback) {
					callback(results);
				}
				return;
			};
			this.connection.query(sql, sprocParams, processQuery);
	    },
		processSprocError: function(results, response) {
			console.log("database error occurred: ");
			if(results && results.error) {
				console.log(results.error);
				response.send("database error occurred: " + results.error);
			}
			return;
	    }
	};
	
	var thisDbServer = this;
	dbServer.connect();
	
  	return dbServer;
};

module.exports = instantiateDbServer();

