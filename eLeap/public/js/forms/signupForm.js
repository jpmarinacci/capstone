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
			'change .signupRetypeCredential': 'commandMatchPasswords',
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
			this.stopListening();
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
		
		isEmpty: function(stringInput) {
			if(stringInput === "") {
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
		
		checkUserFilledInputs: function() {
			if(this.isEmpty(this.$(".signupEmail").val())) {
				notifications.notifyUser("please enter email");
				this.$(".signupEmailWarning").html("");
				return;
			}
			if(this.isEmpty(this.$(".signupCredential").val())) {
				notifications.notifyUser("please enter a password");
				this.$(".signupCredentialWarning").html("");
				return;
			}
			if(this.isEmpty(this.$(".signupRetypeCredential").val())) {
				notifications.notifyUser("please re-type password");
				this.$(".signupRetypeCredentialWarning").html("");
				return;
			}
		},
		
		commandMatchPasswords: function(event) {
			if(this.$(".signupCredential").val() !== this.$(".signupRetypeCredential").val()) {
				notifications.notifyUser("passwords don't match");
				this.$(".signupCredentialWarning").html("passwords don't match");
				return;
			}
		},
		
		gatherInput: function() {
			var email = this.$(".signupEmail").val();
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
			this.checkUserFilledInputs();
			this.gatherInput();
			var thisForm = this;
			var options = {
				success: function(person) {
					user.person.set(person);
					if(thisForm.options.person){
						notifications.notifyUser("successfully updated your account");
					} else {
						notifications.notifyUser("You successfully signed up");
					}
					
					router.lastRoute = '/dashboard';
					user.clientLogin();
				},
				error: function(error) {
					console.log(error);
					if(thisForm.options.person){
						notifications.notifyUser("error -- update account failed :(   please try again.");
					} else {
						notifications.notifyUser("error -- sign up failed :(   please try again.");
					}
					
				}
			};
			if(this.person.get('email') && this.person.get('credential')) {
				this.person.save({}, options);
			} else {
				notifications.notifyUser("email, name and password are required");
			}
		}
	});
	
	return eLeap.own.SignForm;
});
