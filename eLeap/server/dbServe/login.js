var login = {
	
	isUserLoggedIn: function(request, response) { 'use strict';
		console.log("isUserLoggedIn route called");
		//login tbd
		var session = request.session;
		console.log(session.email);
		if(session.email){
		response.send(true);
		}
		else{response.send(false);
		}
	},
	
	login: function(request, response) { 'use strict';
		console.log("login route called");
		//login tbd
	request.session.email = "user1@none.com";
		console.log(request.session.email);
		response.send("logged in");
	},
	
	logout: function(request, response) { 'use strict';
		console.log("logoff route called");
		req.session.destroy(function(err) {
	  		if(err) {
	    	console.log(err);
	  		} else {
	    	res.redirect('/');
  		}
	});
	}
};

module.exports = login;
