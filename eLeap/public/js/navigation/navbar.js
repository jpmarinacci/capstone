/**
 * @author: JP Marinacci, Sunny Wu
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'text!../../tmpl/navigation/navbar.tmpl'],
function (eLeap, $, _, Backbone, navbarTmpl) { 'use strict';
		
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
			require(['controllers/router'], function(router) {
				router.logout();
			});
		},
		
		showLogOutBtn: function() {
			this.$(".btnLogout").show();
		}
	});
	return eLeap.own.Navbar;
});

