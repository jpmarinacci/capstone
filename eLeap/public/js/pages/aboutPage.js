/**
 * @authors: JP Marinacci, Belete Zegeye, Sunny Wu, Aren Kasner, Leo Sinanian
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'text!../../tmpl/pages/aboutPage.tmpl'],
	function (eLeap, $, _, Backbone, aboutPageTmpl) {
	'use strict';
		
	eLeap.own.AboutPage = Backbone.View.extend({
		
		pageTmpl: _.template(aboutPageTmpl),
		
		events: {
			'click .nextBtn': 'commandClickNextBtn',
			'click .prevBtn': 'commandClickPrevBtn'
		},
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.renderFramework();
			this.loadSlideShow();
		},
		
		renderFramework: function(){
			this.$el.html(this.pageTmpl({}));
		},
		
		loadSlideShow: function() {
			this.slides = $(".aboutSlides").toArray();
		},
		
		commandClickNextBtn: function(event) {
			this.$(this.slides[0]).hide();
			this.$(this.slides[1]).show();
		},
		
		commandClickPrevBtn: function(event) {
			
		}
	});
	return eLeap.own.AboutPage;
});

