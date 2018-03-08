/**
  * @authors: JP Marinacci, Belete Zegeye, Sunny Wu, Aren Kasner, Leo Sinanian
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'text!../../tmpl/pages/accountProfilePage.tmpl'],
function (eLeap, $, _, Backbone, accountProfilePageTmpl) {
	'use strict';
		
	eLeap.own.AccountProfilePage = Backbone.View.extend({
		
		pageTmpl: _.template(accountProfilePageTmpl),
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.renderFramework();
		},
		
		renderFramework: function(){
			this.$el.html(this.pageTmpl({}));
		}
	});
	return eLeap.own.AccountProfilePage;
});
