/**
 * @authors: JP Marinacci, Belete Zegeye, Sunny Wu, Aren Kasner, Leo Sinanian
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'forms/signupForm', 'text!../../tmpl/pages/signupPage.tmpl'],
	function (eLeap, $, _, Backbone, SignupForm, signupTmpl) { 'use strict';
	
	eLeap.own.SignupPage = Backbone.View.extend({
		
		pageTmpl: _.template(signupTmpl),
		
		initialize: function () {
			
			this.renderFramework();
			
			this.signupForm = new SignupForm({
				el: this.$(".signupForm")
			});
		},
		
		renderFramework: function(){
			this.$el.html(this.pageTmpl());
		}
	});
	return eLeap.own.SignupPage;
});

