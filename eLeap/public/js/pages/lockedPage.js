/**
 * @author: JP Marinacci
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'text!../../tmpl/pages/lockedPage.tmpl'],
	function (eLeap, $, _, Backbone, lockedPageTmpl) {
	'use strict';
		
	eLeap.own.LockedPage = Backbone.View.extend({
		
		pageTmpl: _.template(lockedPageTmpl),
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.renderFramework();
		},
		
		renderFramework: function(){
			this.$el.html(this.pageTmpl({}));
		}
	});
	return eLeap.own.LockedPage;
});

