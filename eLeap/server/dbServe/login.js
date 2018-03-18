
var login = {
	
	isUserLoggedIn: function(request, response) { 'use strict';
		console.log("isUserLoggedIn route called");
		//login tbd
		var session = request.session;
		response.send(true);//or false;
	},
	
	login: function(request, response) { 'use strict';
		console.log("login route called");
		//login tbd
		var sessions = request.session;
		response.send("logged in");
	},
	
	logout: function(request, response) { 'use strict';
		console.log("logoff route called");
		//logout tbd
	}
};

module.exports = login;
