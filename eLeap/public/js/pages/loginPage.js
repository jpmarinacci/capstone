/**
 * @authors: JP Marinacci, Belete Zegeye, Sunny Wu, Aren Kasner, Leo Sinanian
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'controllers/router', 'controllers/user',
	'text!../../tmpl/pages/loginPage.tmpl'],
	function (eLeap, $, _, Backbone, router, user, loginPageTmpl) { 'use strict';
		
	eLeap.own.LoginPage = Backbone.View.extend({
		
		pageTmpl: _.template(loginPageTmpl),
		
		events: {
			'click .loginButton': 'commandLogin',
			'click .signupLink': 'commandSignup'
		},
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.renderFramework();
			this.listenForEvents();
		},
		
		renderFramework: function(){
			this.$el.html(this.pageTmpl());
			$(".logoHeader").show();
		},
		
		listenForEvents: function() {
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
		
		commandSignup: function() {
			router.navigate('/signup', { trigger:true });
		}
	});
	return eLeap.own.LoginPage;
});

