/**
 * @author: JP Marinacci, Sunny Wu
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'text!../../tmpl/navigation/sidebar.tmpl'],
function (eLeap, $, _, Backbone, sidebarTmpl) {
	'use strict';
		
	eLeap.own.Sidebar = Backbone.View.extend({
		
		sidebarTmpl: _.template(sidebarTmpl),
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.renderFramework();
		},
		
		renderFramework: function(){
			this.$el.html(this.sidebarTmpl());
		},
		
		remove: function() {
			this.$el.off().empty();
			this.stopListening();
			return this;
		}
	});
	return eLeap.own.Sidebar;
});
