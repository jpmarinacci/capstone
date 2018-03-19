/** 
 * @authors: JP Marinacci
 */

define(['jquery', 'underscore', 'backbone', 'eLeap'],
	function ($, _, Backbone, eLeap) { 'use strict';
	
	var thisServer = undefined;
	
	eLeap.own.RestServer = Backbone.View.extend({
		
		initialize: function(options) {
			options = options || {};
		},
			
		navigateOut: function(route, options) {
			options = options || {};
			window.location.href = route;
		},
		
		navigateWithin: function(route, options) {
			options = options || {};
			window.location.href = window.location.origin + route;
		},
		
		postRoute: function(route, dbInput, success, error, options) {
			
			$.ajax({
				type: 'POST',
				cache: false,
				async: true,
				contentType: "application/json;charset=utf-8",
				url: window.location.origin + route,
				dataType: 'json',
				processData: false,
				timeout: 15000,
				data: JSON.stringify(dbInput),
				success: ajaxSuccess,
				error: ajaxError
			});
			
			function ajaxSuccess (dbOut) {
				if(success) {
					if(options && options.context) {
						success.call(options.context, dbOut);
					} else {
						success(dbOut);
					}
				}
			};
			
			function ajaxError(jqXHR, errorText, errorThrown){
				var errorMessage = jqXHR.responseText ? jqXHR.responseText:  (typeof errorThrown === 'string') ? errorThrown : (typeof errorText === 'string') ? errorText: 'unknown ajax error';
				if(error) {
					if(options && options.context) {
						error.call(options.context, errorMessage);
					} else {
						error(errorMessage);
					}
				}
			};
		}
	});
	
	function getServer() {
		thisServer = thisServer || (eLeap.run.server = new eLeap.own.RestServer());
		return thisServer;
	}
	return getServer();
});

