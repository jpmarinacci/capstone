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
		},
		
		
		renderFramework: function(){
			this.$el.html(this.pageTmpl());
			$(".logoHeader").show();
		},
		
		commandLogin: function() {
			this.$(".spinnerContainer").show();
			var email = this.$(".loginEmail").val();
			user.person.set({
				'email': email,
                'personName': 'Maricel Medina'
			});

			setTimeout(function(){
				router.lastRoute = '/dashboard';
				user.login();
			}, 800);
		},
		
		commandSignup: function() {
			router.navigate('/signup', { trigger:true });
		}
	});
	return eLeap.own.LoginPage;
});

