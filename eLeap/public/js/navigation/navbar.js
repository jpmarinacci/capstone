/**
 * @author: JP Marinacci, Sunny Wu
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'controllers/user', 'text!../../tmpl/navigation/navbar.tmpl'],
function (eLeap, $, _, Backbone, user, navbarTmpl) { 'use strict';
		
	eLeap.own.Navbar = Backbone.View.extend({
		
		navbarTmpl: _.template(navbarTmpl),
		
		events: {
			'click .btnLogout': 'logout'
		},
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.renderFramework();
		},
		
		renderFramework: function(){
			this.$el.html(this.navbarTmpl());
		},
		
		logout: function() {
			this.$(".btnLogout").hide();
			user.logout();
			require(['controllers/router'], function(router) {
				router.showLoggedOut();
			});
		},
		
		showLoggedIn: function() {
			this.$(".btnLogout").show();
			this.$(".bannerWrapper .headerBanner").removeClass("fixedCenter");
		},
		
		showLoggedOut: function() {
			this.$(".bannerWrapper .headerBanner").addClass("fixedCenter");
		}
	});
	return eLeap.own.Navbar;
});

