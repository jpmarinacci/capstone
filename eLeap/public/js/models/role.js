/** 
* @authors: JP Marinacci
* 			Belete Zegeye 
*/

define(['jquery', 'underscore', 'backbone', 'eLeap', 'controllers/restServer'],
	function ($, _, Backbone, eLeap, server) { 'use strict';
		
	eLeap.own.Role = Backbone.Model.extend({
		
		idAttribute: "roleId",

		defaults: {
			roleName: "",
			roleDescription: ""
		},
		
		routes: {
			createRole: "/createRole",
			readRole: "/readRole",
			updateRole: "/updateRole",
			deleteRole: "/deleteRole"
		},
		
		sync: function (method, thisModel, options) {
			options = options || {};
			if(method === 'create') {
				server.postRoute(this.routes.readRole, this.toJSON(), function (response) {
					if (response.status && response.status !== "success") {
						if (options.appError) {
							options.appError(response);
						}
					} else {
						if (options.success) {
							if(options.context) {
								options.call(options.success, context);
							} else {
								options.success(response);
							}
						}
					}
				}, function (error) {
					if (options.error) {
						options.error(error);
					}
				});
			} else if(method === 'read') {
				server.postRoute(this.routes.updateRole, this.toJSON(), function (response) {
					if (response.status && response.status !== "success") {
						if (options.appError) {
							options.appError(response);
						}
					} else {
						if (options.success) {
							if(options.context) {
								options.call(options.success, context);
							} else {
								options.success(response);
							}
						}
					}
				}, function (error) {
					if (options.error) {
						options.error(error);
					}
				});
			} else if(method === 'update') {
				server.postRoute(this.routes.readRole, this.toJSON(), function (response) {
					if (response.status && response.status !== "success") {
						if (options.appError) {
							options.appError(response);
						}
					} else {
						if (options.success) {
							if(options.context) {
								options.call(options.success, context);
							} else {
								options.success(response);
							}
						}
					}
				}, function (error) {
					if (options.error) {
						options.error(error);
					}
				});
			} else if(method === 'delete') {
				server.postRoute(this.routes.updateRole, this.toJSON(), function (response) {
					if (response.status && response.status !== "success") {
						if (options.appError) {
							options.appError(response);
						}
					} else {
						if (options.success) {
							if(options.context) {
								options.call(options.success, context);
							} else {
								options.success(response);
							}
						}
					}
				}, function (error) {
					if (options.error) {
						options.error(error);
					}
				});
			}
		},
		
		parse: function (dbRole) {
			return this.translateRoleFromDB(dbRole);
		},
		
		translateRoleFromDB: function(dbRole){
			var jsonRole = {};
			if(dbRole.RoleID)					jsonRole.roleId = dbRole.RoleID;
			if(dbRole.RoleDescription)			jsonRole.roleDescription = dbRole.RoleDescription;
			if(dbRole.RoleName)					jsonRole.roleName = dbRole.RoleName;
			return jsonRole;
		},
		
		translateRoleToDB: function(){
			var dbRole = {};
			if(dbRole.roleId)					jsonRole.RoleID = dbRole.roleId;
			if(dbRole.roleDescription)			jsonRole.RoleDescription = dbRole.roleDescription;
			if(dbRole.roleName)					jsonRole.RoleName = dbRole.roleName;
			return dbRole;
		}
	});

	return eLeap.own.Role;
});

