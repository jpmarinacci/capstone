var mysql = require('mysql');
var fs = require('fs');

instantiateDbServer = function() {
	
	var dbSettings = JSON.parse(fs.readFileSync(__dirname + '/dbSettings.json'));
	var dbServer = {
	    attempts: 0,
		isConnectPending: false,
		
		connect: function() {
			if(!this.isConnectPending) {
				console.log("starging database server connection");
				this.connection = mysql.createConnection({
					charset: "utf8mb4",
					connectTimeout: 20000,
					database: dbSettings.dbName,
					host: dbSettings.dbServer,
					password: dbSettings.dbUserPassword,
					timezone: "utc",
					user: dbSettings.dbUserName
				});
				this.attempts++;
				this.isConnectPending = true;
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
				console.log("database connection-connect error:");
				consoel.log(error);
				if(thisDbServer.attempts <= 25) {
					console.log("attempts before retry" + thisDbServer.attempts);
					thisDbServer.retry();
				} else {
					/*thisDbServer.attempts = 0;
					console.log("attempts reached max tries of: " + thisDbServer.attempts);
					console.log("---throwing error---");
					response.send({"status": "erorr"});*/
					if(error.code ==='PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
						//attempting to handle the error
						this.connectError(error);
					} else {
						throw error;
						return;
					}
				}
			} else {
				console.log("database connected");
			}
		},
		
		connectError: function(error) {
			thisDbServer.isConnectPending = false;
			error = error || {};
			console.log("database connection-errorOnConnect error: ");
			console.log(error);
			if(error.code ==='PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
				this.close();
				this.connect();
			}
			console.log(error.code ? error.code : "gremlins");
			if(!error.code) {
				console.log("connection error: no error code -- throwing error");
				throw error;
			} else {
				console.log("connection error");
				thisDbServer.retry();
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
	    		thisDbServer.attempts = 0;
	    		this.connection.end();
	    	}
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
			this.connection.query(sql, sprocParams, function (error, results, fields) {
				//catches database errors
				if (error) {
					results = results || {};
					results.error = error;
					results.sql = sql;
					console.log("database sproc error: "+ sql);
					console.log(error.code ? error.code : ": gremlins");
				}
				results.fields = fields;
				if(callback) {
					callback(results);
				}
				return;
			});
	    },
	    
		processSprocError: function(results, response) {
			if(results.error.code === "ECONNRESET" || results.error.code === "ENOTFOUND") {
				results.errorMessage = "no database connection";
	  			response.status(500).send(results);
				this.connect();
				return;
			} else {
				if(results.sprocThatErrored) {
					console.log("sproc that errored: "+ results.sprocThatErrored);
				}
				response.status(400).send("database error occurred: " + results.sql);
			}
			return;
	    }
	};
	
	var thisDbServer = this;
	dbServer.connect();
	
  	return dbServer;
};

module.exports = instantiateDbServer();

