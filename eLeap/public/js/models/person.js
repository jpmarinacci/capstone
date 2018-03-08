/**
* @authors: JP Marinacci
* 			Belete Zegeye 
*/

define(['jquery', 'underscore', 'backbone', 'eLeap', 'controllers/restServer'],
	function ($, _, Backbone, eLeap, server) { 'use strict';
		
		eLeap.own.Person = Backbone.Model.extend({
		
		idAttribute: "personId",

		defaults: {
			email:"",
			personName: "",
			phone:"",
			picID:"",
			roleID: "",
			themeID:"",
		},
		
		routes: {
			signupPerson: "/signupPerson",
			getPerson: "/getPerson",			
			updatePerson: "/updatePerson",
			deletePerson: "/deletePerson"
		},
		
		sync: function (method, thisModel, options) {
			options = options || {};
			if(method === 'create') {
				server.postRoute(this.routes.signupPerson, this.translatePersonToDB(this.toJSON()), function (response) {
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
				server.postRoute(this.routes.getPerson, this.toJSON(), function (response) {
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
			} else if(method === 'update'){
				server.postRoute(this.routes.updatePerson, this.toJSON(), function (response) {
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
		
		parse: function (dbPerson) {
			return this.translatePersonFromDB(dbPerson);
		},
		
		translatePersonFromDB: function(dbPerson){
			var jsonPerson = {};
			if(dbPerson.PersonID)					jsonPerson.personId = dbPerson.PersonID;
			if(dbPerson.PersonName)					jsonPerson.personName = dbPerson.PersonName;
			if(dbPerson.RoleID)						jsonPerson.roleId = dbPerson.RoleID;
			if(dbPerson.Email)						jsonPerson.email = dbPerson.Email;
			if(dbPerson.Phone)						jsonPerson.phone = dbPerson.Phone;
			if(dbPerson.ThemeID)					jsonPerson.themeId = dbPerson.ThemeID;
			if(dbPerson.PicID)						jsonPerson.picId = dbPerson.PicID;
			return jsonPerson;
		},
		
		translatePersonToDB: function(jsonPerson) {
			var dbPerson = {};
			//do the opposite for translate to db type language
			if(jsonPerson.personId)					dbPerson.ClassID = jsonPerson.classId;
			if(jsonPerson.personName)				dbPerson.PersonName = jsonPerson.personName;
			if(jsonPerson.roleId)					dbPerson.RoleID = jsonPerson.roleId;
			if(jsonPerson.email)					dbPerson.Email = jsonPerson.email;
			if(jsonPerson.phone)					dbPerson.Phone = jsonPerson.phone;
			if(jsonPerson.themeId)					dbPerson.ThemeID = jsonPerson.themeId;
			return dbPerson;
		}

	});

	return eLeap.own.Person;
});

