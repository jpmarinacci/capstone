/**
 * @author: JP Marinacci
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'text!../../tmpl/pages/samplePage.tmpl'],
function (eLeap, $, _, Backbone, samplePageTmpl) {
	'use strict';
		
	eLeap.own.SamplePage = Backbone.View.extend({
		
		pageTmpl: _.template(samplePageTmpl),
		hardCodedParam: "awesome!",
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.someObj = options.bringInObj;
			this.pixelString = options.bringInAParam;
			this.renderFramework();
		},
		
		renderFramework: function() {
			var get$ = this.someObj.amount();
			this.$el.html(this.pageTmpl({
				cssClass: "centerText",
				combinedSentenceText: get$ + this.pixelString.slice(0,6)+" in "+this.someObj.number,
				isCool: this.options.isCool,
				tempText: this.someObj.tempText,
				tempExclamation: this.hardCodedParam,
				whatever: this.someObj.letters
			}));
		}
	});
	return eLeap.own.SamplePage;
});
