/**
 * @authors: JP Marinacci
 * 	
 */

require.config({
	baseUrl: 'js',
	paths: {
		"backbone": "../bower_components/backbone/backbone-min",
		"bootbox": "../bower_components/bootbox.js/bootbox",
		"bootstrap": "../bower_components/bootstrap/dist/js/bootstrap.min",
		"datetimepicker": "../bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min",
		"dropzone": "../bower_components/dropzone/dist/dropzone",
		"jquery": "../bower_components/jquery/dist/jquery.min",
		"jquery.autogrow-textarea": "node_modules/jquery.autogrow-textarea/jquery.autogrow-textarea",
		"jquery-ui": "../bower_components/jquery-ui/jquery-ui.min",
		"moment": "../bower_components/moment/min/moment.min",
		"spectrum": "../bower_components/spectrum/spectrum",
		"text": "../bower_components/text/text",
		"templates": "../../tmpl",
		"underscore": "../bower_components/underscore/underscore-min"
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
		}
	}
});

require(['jquery', 'eLeap', 'clientApp'], function ($, eLeap, ClientApp) { 'use strict';
	$(document).ready(function() {
		eLeap.run.clientApp = new ClientApp();
		eLeap.run.clientApp.startApp();
	});
});

