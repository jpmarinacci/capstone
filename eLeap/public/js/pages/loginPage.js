/**
 * @authors: JP Marinacci, Belete Zegeye, Sunny Wu, Aren Kasner, Leo Sinanian
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'controllers/router', 'controllers/user', 'text!../../tmpl/pages/loginPage.tmpl'],
function (eLeap, $, _, Backbone, router, user, loginPageTmpl) {
	'use strict';
		
	eLeap.own.LoginPage = Backbone.View.extend({
		
		pageTmpl: _.template(loginPageTmpl),
		
		events: {
			'click .loginButton': 'login'
		},
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.renderFramework();
		},
		
		
		renderFramework: function(){
			this.$el.html(this.pageTmpl());
			$(".logoHeader").show();
		},
		
		login: function() {
			this.$(".spinnerContainer").show();
			setTimeout(function(){
				router.lastRoute = '/dashboard';
				user.login();
			}, 800);
		}
	});
	return eLeap.own.LoginPage;
});
