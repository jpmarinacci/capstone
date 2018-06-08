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
			'click .signupBtn': 'commandSignupPerson',
			'keyup .signupEmail': 'commandEmailKeyPress',
			'keyup .signupName': 'commandNameKeyPress',
			'keyup .signupPhone': 'commandPhoneKeyPress',
			'keyup .signupCredential': 'commandCredentialKeyPress',
			'keyup .signupRetypeCredential': 'commandRetypeCredentialKeyPress',
			'keyup .signupBtn': 'commandSignupBtnKeyPress'
		},
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.person = options.person || new Person();
			this.renderFramework();
			this.listenForEvents();
			cache.fetchRoles();
		},
		
		renderFramework: function() {
			this.$el.html(this.formTmpl());
			if(this.options.person){
				this.renderPerson();
			}
		},
		
		renderPerson: function() {
			this.$(".signupEmail").val(this.person.get('email'));
			this.$(".signupName").val(this.person.get('personName'));
			this.$(".signupPhone").val(this.person.get('phone'));
			this.$(".selectRolesContainer").hide();
			this.$(".signupRoleInfoContainer").show();
			var roleId = this.person.get('roleId');
			if(!cache.roles.isFetched) {
				this.listenToOnce(cache.roles, 'reset', this.renderPerson);
			} else {
				var role = cache.roles.get(roleId);
					if(role) {
					var roleName = role.get('roleName');
					this.$(".signupRoleName").html(roleName).show();
				}
			}
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
		
		commandEmailKeyPress: function(event) {
			var o = event.originalEvent;
			if(o.key === "Enter" || o.keyCode === 13 || o.key ==="ArrowDown") {
				this.$(".signupName").focus();
			}
			if(o.key ==="ArrowUp") {
				this.$(".selectRoles").focus();
			}
		},
		
		commandNameKeyPress: function(event) {
			var o = event.originalEvent;
			if(o.key === "Enter" || o.keyCode === 13 || o.key ==="ArrowDown") {
				this.$(".signupPhone").focus();
			}
			if(o.key ==="ArrowUp") {
				this.$(".signupEmail").focus();
			}
		},
		
		commandPhoneKeyPress: function(event) {
			var o = event.originalEvent;
			if(o.key === "Enter" || o.keyCode === 13 || o.key ==="ArrowDown") {
				this.$(".signupCredential").focus();
			}
			if(o.key ==="ArrowUp") {
				this.$(".signupName").focus();
			}
		},
		
		commandCredentialKeyPress: function(event) {
			var o = event.originalEvent;
			if(o.key === "Enter" || o.keyCode === 13 || o.key ==="ArrowDown") {
				this.$(".signupRetypeCredential").focus();
			}
			if(o.key ==="ArrowUp") {
				this.$(".signupPhone").focus();
			}
		},
		
		commandRetypeCredentialKeyPress: function(event) {
			var o = event.originalEvent;
			if(o.key === "Enter" || o.keyCode === 13) {
				this.commandSignupPerson();
			}
			if(o.key ==="ArrowUp") {
				this.$(".signupCredential").focus();
			}
			if(o.key ==="ArrowDown") {
				this.$(".signupBtn").focus();
			}
		},
		
		commandSignupBtnKeyPress: function(event) {
			var o = event.originalEvent;
			if(o.key === "Enter" || o.keyCode === 13) {
				this.commandSignupPerson();
			}
			if(o.key ==="ArrowUp") {
				this.$(".signupRetypeCredential").focus();
			}
		},
		
		checkUserFilledInputs: function() {
			if(this.isEmpty(this.$(".signupEmail").val())) {
				notifications.notifyUser("please enter email");
				this.$(".signupEmailWarning").html("email is required");
				return;
			}
			if(this.isEmpty(this.$(".signupCredential").val())) {
				notifications.notifyUser("please enter a password");
				this.$(".signupCredentialWarning").html("password is required");
				return;
			}
			if(this.isEmpty(this.$(".signupRetypeCredential").val())) {
				notifications.notifyUser("please re-type password");
				this.$(".signupRetypeCredentialWarning").html("retype password is required");
				return;
			}
			this.$(".signupEmailWarning, .signupCredentialWarning, .signupRetypeCredentialWarning").empty();
		},
		
		commandMatchPasswords: function(event) {
			if(this.$(".signupCredential").val() !== this.$(".signupRetypeCredential").val()) {
				notifications.notifyUser("passwords don't match");
				this.$(".signupCredentialWarning").html("passwords don't match");
				return;
			}
		},
		
		gatherInput: function() {
			var personJson = {
				email: this.$(".signupEmail").val(),
				personName: this.$(".signupName").val(),
				phone: this.$(".signupPhone").val(),
				roleId: Number(this.$(".selectRoles").val()),
				credential: this.$(".signupCredential").val()
			};
			this.person.set(personJson);
		},
		
		commandSignupPerson: function() {
			if(!this.signupPending) {
				this.signupPending = true;
				this.checkUserFilledInputs();
				this.gatherInput();
				if(this.person.get('email') && this.person.get('credential')) {
					var roleId = this.person.get('roleId'); 
					if(roleId > 2) {
						var basicVerifyCode = cache.roles.get(roleId).get('verificationCode');
						var thisForm = this;
						require(['bootbox'], function(bootbox) {
							bootbox.prompt({
								title: "Please enter a provided verification code",
							    callback: function (result) {
							    	if(result) {
							    		if(result == basicVerifyCode) {
							    			thisForm.submitNewPerson(); 
							    		} else {
							    			thisForm.signupPending = false;
							    			notifications.notifyUser("invalid code");
							    			thisForm.$(".selectRoles").focus();
							    		}
									}
							    }
							});
						});
					} else {
						this.submitNewPerson();
					}
				} else {
					notifications.notifyUser("email, name and password are required");
				}
			}
		},
		
		submitNewPerson: function() {
			var thisForm = this;
			var options = {
				success: function(person) {
					thisForm.signupPending = false;
					delete person.attributes.credential;
					if(person && person.get('personId')) {
						user.person.set(person.toJSON());
						if(thisForm.options.person){
							notifications.notifyUser("successfully updated your account");
						} else {
							notifications.notifyUser("Welcome "+ user.person.get('personName'));
						}
						
						router.lastRoute = '/dashboard';
						user.clientLogin();
					}
				},
				appError: function(response) {
					notifications.notifyUser("you could not be signed up with that email");
				},
				error: function(error) {
					thisForm.signupPending = false;
					//console.log(error);
					if(thisForm.options.person) {
						notifications.notifyUser("error -- update account failed :(   please try again.");
					} else {
						notifications.notifyUser("error -- sign up failed :(   please try again.");
					}
				},
				wait: true
			};
			this.person.save({}, options);
		}
	});
	
	return eLeap.own.SignForm;
});

