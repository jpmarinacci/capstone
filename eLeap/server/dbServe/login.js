
var login = {
	
	isUserLoggedIn: function(request, response) { 'use strict';
		console.log("isUserLoggedIn route called");
		//login tbd
		var session = request.session;
		if(session.email) {
			response.send(session.email);
		} else {
			response.send("session is :" + session);
		}
	},
	
	login: function(request, response) { 'use strict';
		console.log("login route called");
		//login tbd
		var sessions = request.session;
		sessions.email = "user1@none.com";
		response.send("logged in as:" + sessions.email);
	},
	
	logout: function(request, response) { 'use strict';
		console.log("logoff route called");
		req.session.destroy(function(err) {
	  		if(err) {
	  			console.log(err);
	  		} else {
	  			//res.redirect('/');
	  			console.log("session destroyed");
	  		}
		});
	}
};

module.exports = login;

