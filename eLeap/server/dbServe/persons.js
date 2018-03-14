var dbServer = require('../dbServer');
var mysql = require('mysql');

var persons = {
	signupPerson: function(request, response) { 'use strict';
		var sprocName = "sprocAddPer";
		var params = [
			request.body.RoleID ? request.body.RoleID : null,
			request.body.PersonName ? request.body.PersonName : null,
			request.body.Email ? request.body.Email : null,
			request.body.Phone ? request.body.Phone : null,
			request.body.ThemeID ? request.body.ThemeID : null,
			request.body.PicID ? request.body.PicID : null
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
			request.body.Email ? request.body.Email : null
		];
		console.log("getPerson route called");
		console.log("calling "+ sprocName);
		console.log("sproc params:");
		console.log(params);
		function processSproc(results) {
			results = results[0];
			dbServer.processSproc(results, response);
		};
		dbServer.sproc(sprocName, params, processSproc);
    }, 
    
    updatePerson: function(request, response) { 'use strict';
    	var sprocName = "sprocName";
		var params = [
			request.body.PersonID ? request.body.PersonID : null,
		];
		console.log("updatePerson route called");
		console.log("calling "+ sprocName);
		function processSproc(results) {
			dbServer.processSproc(results, response);
		};
		dbServer.sproc(sprocName, params, processSproc);
	},
	 
	getAllPersons: function(request, response) { 'use strict';
		var sprocName = "sprocAllPer";
		var params = [];
		console.log("getAllPersons route called");
		console.log("calling "+ sprocName);
		function processSproc(results) {
			dbServer.processSproc(results, response);
		};
		dbServer.sproc(sprocName, params, processSproc);
	}
};

module.exports = persons;

