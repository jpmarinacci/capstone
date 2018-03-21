
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
	        var sql = "call " + sprocName + this.makeQs(sprocParams.length);
	        function processQuery (error, results, fields) {
	        	if (error) {
	        		results = results || {};
	            	results.error = error;
	            	results.sql = sql;
	            	console.log("database error:");
	            	console.log(error.code ? error.code : ": gremlins");
	            }
	            results.fields = fields;
	            if(callback) {
	            	callback(results);
	            }
	            return;
	        };
	        /* call a sproc:
	         let sql = `CALL filterTodo(?)`;
			connection.query(sql, true, (error, results, fields) => {
			  if (error) {
			    return console.error(error.message);
			  }
			  console.log(results[0]);
			});*/
			this.connection.query(sql, sprocParams, processQuery);
	    },
	    makeQs: function(numArgs) {
			var qs = "";
			for(var i = 0; i < numArgs; i++) {
				qs += (i < numArgs-1) ? "?," : "?";
			}
	        return "(" + qs + ");";
		},
	    processSproc: function(results, response) {
	    	if (!results.error) {
				results.status = "success";
				response.send(results[0]);
			} else {
				dbServer.processSprocError(results, response);
			}
	    },
		processSprocError: function(results, response) {
			if(results.error.code === "ECONNRESET" || results.error.code === "ENOTFOUND") {
	  			results.errorMessage = "no database connection";
	  			response.status(500).send(results);
				this.connect();
                return;
	    	} else {
	    		response.status(400).send("database error occurred: " + results.sql);
	    	}
	    	return;
	    },
	    attempts: 0,
		isConnectPending: false,
		connect: function() {
			if(!this.isConnectPending) {
				console.log("starting database server connection");
				this.connection = mysql.createConnection({
					charset: "utf8mb4",
					connectTimeout: 20000,
					database: dbSettings.dbName,
					host: dbSettings.dbServer,
					password: dbSettings.dbUserPassword,
					timezone: "utc",
					user: dbSettings.dbUserName,
				});
				this.attempts += 1;
				this.isConnectPending = true;
				this.connection.on('error', this.connectError);
				this.connection.connect(this.connectCallback);
			} else {
				return;
			}
		},
		connectCallback: function(response) {
			thisDbServer.isConnectPending = false;
			if(response) {
				console.log("database connection error");
				console.log("error output: ");
				console.log(response);
				if(thisDbServer.attempts > 25) {
					var error = response;
					throw error;
					return;
				} else {
					this.retry();
					//thisDbServer.retry();
				}
			} else {
				console.log("database connected.");
			}
		},
		connectError: function(error) {
			console.log("connectError");
			//console.log("this = ");
			//console.log(this);
			//console.log("thisDbServer = ");
			//console.log(thisDbServer);
			thisDbServer.isConnectPending = false;
			error = error || {};
			console.log("database connection error");
			console.log(error.code ? error.code : ": gremlins");
			if(!error.code){
				throw error;
			}
			thisDbServer.retry();
		},
		retry: function() {
			setTimeout(function() {
				console.log("connectCallback - setTimeout");
				//console.log("this = ");
				//console.log(this);
				//console.log("thisDbServer = ");
				//console.log(thisDbServer);
				thisDbServer.connect();	
			}, 3000);
		},
	    close: function() {
	    	console.log("closing db connection");
	    	//console.log("this = ");
			//console.log(this);
			//console.log("thisDbServer = ");
			//console.log(thisDbServer);
	    	if (this.connection) {
	    		this.connection.end();
	    	}
		}
	};
	
	var thisDbServer = this;
	dbServer.connect();
	
  	return dbServer;
};

module.exports = instantiateDbServer();

