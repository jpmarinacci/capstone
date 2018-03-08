/**
 * @authors: JP Marinacci
 * 	
 */

require.config({
	baseUrl: 'js',
	paths: {
		"backbone": "../bower_components/backbone/backbone-min",
		"bootbox": "../bower_components/bootbox/bootbox.min",
		"bootstrap": "../bower_components/bootstrap/dist/js/bootstrap.min",
		"dropzone": "../bower_components/dropzone/dist/dropzone",
		"jquery": "../bower_components/jquery/dist/jquery.min",
		"jquery.autogrow-textarea": "node_modules/jquery.autogrow-textarea/jquery.autogrow-textarea",
		"spectrum": "../bower_components/spectrum/spectrum",
		"text": "../bower_components/text/text",
		"templates": "../../tmpl",
		"underscore": "../bower_components/underscore/underscore-min",
		/*"wijmo.data.ajax": "../assets/javascript/wijmo.data.ajax.3.20141.34",
		"wijmo-pro.all": "../assets/javascript/jquery.wijmo-pro.all.3.20141.34.min",
		"wijmo-open.all": "../assets/javascript/jquery.wijmo-open.all.3.20141.34.min"*/
	},

	shim: {
		"bootstrap": {
			deps: ["jquery"]
		},
		"bootbox": {
			deps: ["bootstrap"]
		},
		"dropzone": {
			exports: 'Dropzone'
		},
		"jquery.autogrow-textarea": {
			deps: ["jquery"]
		},
		/*"wijmo.data.ajax": {
			deps: ["jquery"]
		},
		"wijmo-pro.all": {
			deps: ["jquery"]
		},
		"wijmo-open.all": {
			deps: ["jquery"]
		}*/
	}
});

require(['jquery', 'eLeap', 'clientApp'], function ($, eLeap, ClientApp) { 'use strict';
	$(document).ready(function() {
		eLeap.run.clientApp = new ClientApp();
	});
});

