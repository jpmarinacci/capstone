/**
 * @authors: JP Marinacci, Belete Zegeye, Sunny Wu, Aren Kasner, Leo Sinanian
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'text!../../tmpl/pages/opportunityPage.tmpl'],
function (eLeap, $, _, Backbone, opportunityPageTmpl) {
	'use strict';
		
	eLeap.own.OpportunityPage = Backbone.View.extend({
		
		pageTmpl: _.template(opportunityPageTmpl),
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.renderFramework();
			this.opportunityId = options.opportunityId;
		},
		
		renderFramework: function(){
			this.$el.html(this.pageTmpl({}));
		}
	});
	return eLeap.own.OpportunityPage;
});
