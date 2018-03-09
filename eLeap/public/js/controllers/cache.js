/** 
 * @author: JP Marinacci
 */


define(['jquery', 'underscore', 'backbone', 'eLeap', 'collections/roles'],
	function ($, _, Backbone, eLeap, Roles) { 'use strict';
	
	var thisCache = undefined;
	
	eLeap.own.Cache = Backbone.Model.extend({
		
		initialize: function(options) {
			options = options || {};
			this.roles = new Roles();
		},
		
		fetchRoles: function(options) {
			options = options || {};
			if(this.roles.isFetched) {
				this.roles.trigger('reset');
			} else if(!this.roles.isFetchPending) {
				this.roles.isFetchPending = true;
				options.chainedSuccess = options.success;
				options.chainedError = options.error;
				options.success = function(response) {
					thisCache.isFetchPending = false;
					thisCache.isFetched = true;
					if(options.chainedSuccess) {
						if(options.context) {
							options.chainedSuccess.call(options.context, response);
						}
					}
				};
				options.error = function(error) {
					//console.log(error);
				};
				options.reset = true;
				this.roles.fetch(options, {});
			}
			
		}
	});
	
	function getCache() {
		thisCache = thisCache || (eLeap.run.cache = new eLeap.own.Cache());
		return thisCache;
	}
	return getCache();
});


