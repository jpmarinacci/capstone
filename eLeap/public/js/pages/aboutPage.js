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
			this.currentSlideId = 0;
		},
		
		commandClickNextBtn: function(event) {
			this.$(this.slides[this.currentSlideId]).hide();
			if(this.currentSlideId === this.slides.length-1) {
				this.currentSlideId = 0;
			} else {
				this.currentSlideId ++;
			}
			this.$(this.slides[this.currentSlideId]).show();
			this.showHideTeamLink();
		},
		
		commandClickPrevBtn: function(event) {
			this.$(this.slides[this.currentSlideId]).hide();
			if(this.currentSlideId === 0) {
				this.currentSlideId = this.slides.length-1;
			} else {
				this.currentSlideId --;
			}
			this.$(this.slides[this.currentSlideId]).show();
			this.showHideTeamLink();
		},
		
		showHideTeamLink: function() {
			if(this.currentSlideId === 7) {
				this.$(".teamLink").show();
			} else {
				this.$(".teamLink").hide();
			}
		}
	});
	return eLeap.own.AboutPage;
});

