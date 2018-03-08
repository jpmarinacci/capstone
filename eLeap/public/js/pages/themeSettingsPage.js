/**
 * @authors: JP Marinacci, Belete Zegeye, Sunny Wu, Aren Kasner, Leo Sinanian
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'text!../../tmpl/pages/themeSettingsPage.tmpl'],
function (eLeap, $, _, Backbone, themeSettingsPageTmpl) {
	'use strict';
		
	eLeap.own.ThemeSettingsPage = Backbone.View.extend({
		
		pageTmpl: _.template(themeSettingsPageTmpl),
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.renderFramework();
		},
		
		renderFramework: function(){
			this.$el.html(this.pageTmpl({}));
		}
	});
	return eLeap.own.ThemeSettingsPage;
});
