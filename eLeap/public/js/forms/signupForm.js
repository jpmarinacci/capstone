/**
 * @author: JP Marinacci
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['jquery', 'underscore', 'backbone', 'eLeap', 'controllers/user', 'controllers/cache', 
		'controllers/router', 'controllers/notifications',
		'models/person', 'text!../../tmpl/forms/signupForm.tmpl'],
function ( $, _, Backbone, eLeap, user, cache, router, notifications, Person, signupFormTmpl) { 'use strict';
		
	eLeap.own.SignForm = Backbone.View.extend({
		
		formTmpl: _.template(signupFormTmpl),
		
		events: {
			'change .signupEmail': 'commandChangedSignupEmail',
		
			'change .signupPhone': 'commandChangedSignupPhone',
			
			'change .selectRoles': 'commandChangedSelectRoles',
			'click .signupButton': 'createNewPerson'
		},
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.person = options.person || new Person();
			this.renderFramework();
			this.listenForEvents();
			cache.fetchRoles();
		},
		
		renderFramework: function(){
			this.$el.html(this.formTmpl());
		},
		
		listenForEvents: function() {
			if(cache.roles) {
				this.listenTo(cache.roles, 'reset', this.renderRoles);
			}
		},
		
		renderRoles: function(roles) {
			//render roles
			var thisForm = this;
			cache.roles.each(function(role) {
				if(role.get("roleId") !== 7) {
					thisForm.$(".selectRoles").append("<option value='"+role.get("roleId")+"'>"+role.get("roleName")+"</option>");
				}
			});
			if(cache.roles.length > 1) {
				thisForm.$(".selectRoles").val(2);
			}
		},
		
		isValidEmail: function (email){
			 if (email && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/+email)){
			    return true;
			 } else {
			 	return false;
			 }
		},
		
		isValidPhone: function (phone){
			if(phone&& (/^\d{10}$/) + phone){
				return true;
			} else {
				return false;
			}
		},
		
		isRequired: function(stringInput) {
			if(stringInput !== "") {
				return true;
			} else {
				return false;
			}
		},
	
		isValidPassword: function(password){
			if(password&&(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)+ password){
				return true;
			} else {
				return false;
			}
		},
	
		commandChangedSignupEmail: function(event){
			var inputValue = this.$(".signupEmail").val();
			if(this.isValidEmail(inputValue)) {
				this.$(".signupEmailWarning").empty();
				return;
			} else {
				this.$(".signupEmailWarning").html("valid email address is required");
				return;
			}
		},
		
		commandChangedSignupPhone: function(event){
			var inputValue = this.$(".signupPhone").val();
			if(this.isValidPhone(inputValue)) {
				this.$(".signupPhoneWarning").empty();
				return;
			} else {
				this.$(".signupPhoneWarning").html("valid phone number is required");
				return;
			}
		},
		commandChangedSelectRoles: function(event) {
			var inputValue = this.$(".selectRoles").val();
			if(this.isRequired(inputValue)) {
				this.$(".selectRolesWarning").empty();
				return;
			} else {
				this.$(".selectRolesWarning").html("choose your role");
				return;
			}
		},

		gatherInput: function() {
			var email = this.$(".signupEmail").val();
			//validate inputs
			//if(validate.isValid(email));
			var personJson = {
				email: email,
				personName: this.$(".signupName").val(),
				phone: this.$(".signupPhone").val(),
				roleId: Number(this.$(".selectRoles").val()),
				credential: this.$(".signupCredential").val()
			};
			this.person.set(personJson);
		},
		
		createNewPerson: function() {
			this.gatherInput();
			var options = {
				success: function(person) {
					user.person.set(person);
					notifications.notifyUser("You successfully signed up");
					router.lastRoute = '/dashboard';
					user.clientLogin();
				},
				error: function() {
					notifications.notifyUser("error -- sign up failed :(   please try again.");
				}
			};
			if(this.person.get('email') && this.person.get('credential'))
			this.person.save({}, options);
		}
	});
	
	return eLeap.own.SignForm;
});
