/**
 * @authors: JP Marinacci, Belete Zegeye, Sunny Wu, Aren Kasner, Leo Sinanian
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'controllers/notifications', 'controllers/router', 'controllers/user',
	'text!../../tmpl/pages/loginPage.tmpl'],
	function (eLeap, $, _, Backbone, notifications, router, user, loginPageTmpl) { 'use strict';
		
	eLeap.own.LoginPage = Backbone.View.extend({
		
		pageTmpl: _.template(loginPageTmpl),
		
		events: {
			'click .loginBtn': 'commandLogin',
			'click .signupLinkBtn': 'commandSignup',
			'keyup .loginEmail': 'commandEmailKeyPress',
			'keyup .loginCredential': 'commandCredentialKeyPress',
			'keyup .loginBtn': 'commandLoginBtnKeyPress',
			'keyup .signupLinkBtn': 'commandSignupBtnKeyPress',
		},
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.renderFramework();
			this.listenForEvents();
		},
		
		renderFramework: function(){
			this.$el.html(this.pageTmpl());
		},
		
		listenForEvents: function() {
			this.stopListening();
			if(user) {
				this.listenTo(user, 'user:loginInvalid', this.loginInvalid);
			}
		},
		
		loginInvalid: function() {
			this.$(".spinnerContainer").hide();
		},
		
		commandLogin: function() {
			this.$(".spinnerContainer").show();
			var email = this.$(".loginEmail").val();
			var credential = this.$(".loginCredential").val();
			user.person.set({
				'email': email,
				'credential': credential
			});
			router.lastRoute = '/dashboard';
			user.login();
			
			/*setTimeout(function(){
				router.lastRoute = '/dashboard';
				user.login();
			}, 800);*/
		},
		
		commandEmailKeyPress: function(event) {
			var o = event.originalEvent;
			if(o.key === "Enter" || o.keyCode === 13 || o.key ==="ArrowDown") {
				this.$(".loginCredential").focus();
			}
		},
		
		commandCredentialKeyPress: function(event) {
			var o = event.originalEvent;
			if(o.key === "Enter" || o.keyCode === 13) {
				this.commandLogin();
			}
			if(o.key ==="ArrowUp") {
				this.$(".loginEmail").focus();
			}
			if(o.key ==="ArrowDown") {
				this.$(".loginBtn").focus();
			}
		},
		
		commandLoginBtnKeyPress: function(event) {
			var o = event.originalEvent;
			if(o.key ==="ArrowUp") {
				this.$(".loginCredential").focus();
			}
			if(o.key ==="ArrowDown") {
				this.$(".signupLinkBtn").focus();
			}
		},
		
		commandSignupBtnKeyPress: function(event) {
			var o = event.originalEvent;
			if(o.key ==="ArrowUp") {
				this.$(".loginBtn").focus();
			}
		},
		
		commandSignup: function() {
			router.navigate('/signup', { trigger:true });
		}
	});
	return eLeap.own.LoginPage;
});

