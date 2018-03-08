/**
 * @author: JP Marinacci
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'text!../../tmpl/pages/blankPage.tmpl'],
function (eLeap, $, _, Backbone, blankPageTmpl) {
	'use strict';
		
	eLeap.own.BlankPage = Backbone.View.extend({
		
		pageTmpl: _.template(blankPageTmpl),
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.renderFramework();
		},
		
		renderFramework: function(){
			this.$el.html(this.pageTmpl({}));
		}
	});
	return eLeap.own.BlankPage;
});
