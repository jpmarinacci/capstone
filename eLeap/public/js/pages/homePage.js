/**
 * @authors: JP Marinacci, Belete Zegeye, Sunny Wu, Aren Kasner, Leo Sinanian
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'text!../../tmpl/pages/homePage.tmpl'],
	function (eLeap, $, _, Backbone, homePageTmpl) {
	'use strict';
		
	eLeap.own.HomePage = Backbone.View.extend({
		
		pageTmpl: _.template(homePageTmpl),
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.commandDispatcher = options.commandDispatcher;
			this.renderFramework();
			this.commandDispatcher.trigger('hide:sidebar');
		},
		
		renderFramework: function(){
			this.$el.html(this.pageTmpl({}));
		},
		
		remove: function() {
			if(this.commandDispatcher) {
				this.commandDispatcher.trigger('show:sidebar');
			}
			this.$el.remove();
			this.stopListening();
			return this;
		}
	});
	return eLeap.own.HomePage;
});
