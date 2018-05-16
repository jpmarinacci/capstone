var dbServer = require('../dbServer');
var mysql = require('mysql');

var persons = {
	signupPerson: function(request, response) { 'use strict';
		var sprocName = "sprocAddPer";
		var params = [
			request.body.email ? request.body.email : null,
			request.body.password ? request.body.password: null,
			request.body.personName ? request.body.personName : null,
			request.body.phone ? request.body.phone : null,
			request.body.roleId ? request.body.roleId : null,
			//request.body.themeId ? request.body.themeId : null,
			//request.body.picId ? request.body.picId : null
		];
		console.log("signupPerson route called");
		console.log("calling "+ sprocName);
		console.log("sproc params:");
		console.log(params);
		function processSproc(results) {
			dbServer.processSproc(results, response);
		};
		dbServer.sproc(sprocName, params, processSproc);
    },
    
    getPerson: function(request, response) { 'use strict';
		var sprocName = "sprocFindPer";
		var params = [
			//request.body.PersonID ? request.body.PersonID : null,
			request.body.email ? request.body.email : null
		];
		console.log("getPerson route called");
		console.log("calling "+ sprocName);
		//console.log("sproc params:");
		//console.log(params);
        console.log("Session check: " + request.session.name);

		function processSproc(results) {
			results = results[0];
			dbServer.processSproc(results, response);
		};
		dbServer.sproc(sprocName, params, processSproc);
    }, 
    
    updatePerson: function(request, response) { 'use strict';
    	var sprocName = "sprocName";
		var params = [
			request.body.personId ? Number(request.body.personId): null,
		];
		console.log("updatePerson route called");
		console.log("calling " + sprocName);
		function processSproc(results) {
			dbServer.processSproc(results, response);
		};
		dbServer.sproc(sprocName, params, processSproc);
	},
	 
	getAllPersons: function(request, response) { 'use strict';
		var sprocName = "sprocAllPer";
		var params = [];
		console.log("getAllPersons route called");
		console.log("calling " + sprocName);
		function processSproc(results) {
			dbServer.processSproc(results, response);
		};
		dbServer.sproc(sprocName, params, processSproc);
	}
};

module.exports = persons;

