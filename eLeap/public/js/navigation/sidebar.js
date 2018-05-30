/**
 * @author: JP Marinacci, Sunny Wu
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'text!../../tmpl/navigation/sidebar.tmpl'],
function (eLeap, $, _, Backbone, sidebarTmpl) { 'use strict';



	eLeap.own.Sidebar = Backbone.View.extend({

        sidebarTmpl: _.template(sidebarTmpl),

		events: {
			'click .dashboardLink': 'commandNavigateToDashboard',
			'click .accountSettingsBtn': 'commandUpdateAccount',
			'click .createOppBtn': 'commandCreateNewOpportunity',
			'click .editOppBtn': 'commandEditOpportunity',
			'click .joinOppBtn': 'commandJoinOpportunity',
			'click .leaveOppBtn': 'commandLeaveOpportunity'
		},
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.commandDispatcher = options.commandDispatcher;
			this.renderFramework();
			this.listenForEvents();
		},
		
		renderFramework: function(){
			this.$el.html(this.sidebarTmpl());
		},
		
		listenForEvents: function() {
			this.stopListening();
			if(this.commandDispatcher) {
				this.listenTo(this.commandDispatcher, 'showCreate', this.showCreate);
				this.listenTo(this.commandDispatcher, 'showEdit', this.showEdit);
				this.listenTo(this.commandDispatcher, 'showJoin', this.showJoin);
				this.listenTo(this.commandDispatcher, 'showLeave', this.showLeave);
				this.listenTo(this.commandDispatcher, 'hideCreate', this.hideCreate);
				this.listenTo(this.commandDispatcher, 'hideEdit', this.hideEdit);
				this.listenTo(this.commandDispatcher, 'hideJoin', this.hideJoin);
				this.listenTo(this.commandDispatcher, 'hideLeave', this.hideLeave);
				this.listenTo(this.commandDispatcher, 'hideOppViewBtns', this.hideOppViewBtns);
			}
		},
		
		remove: function() {
			this.$el.off().empty();
			this.stopListening();
			return this;
		},
		
		showCreate: function() {
			this.$(".createOppBtn").show();
		},
		
		showEdit: function() {
			this.$(".editOppBtn").show();
		},
		
		showJoin: function() {
			this.$(".joinOppBtn").show();
		},
		
		showLeave: function() {
			this.$(".leaveOppBtn").show();
		},
		
		hideCreate: function() {
			this.$(".createOppBtn").hide();
		},
		
		hideEdit: function() {
			this.$(".editOppBtn").hide();
		},
		
		hideJoin: function() {
			this.$(".joinOppBtn").hide();
		},
		
		hideLeave: function(){
			this.$(".leaveOppBtn").hide();
		},
		
		hideOppViewBtns: function(){
			this.$(".editOppBtn, .joinOppBtn, .leaveOppBtn").hide();
			this.$(".createOppBtn").show();
		},
		
		commandUpdateAccount: function() {
			require(['controllers/router',], function(router) {
				router.navigate('/accountsettings', {trigger: true});
			});
		},
		
		commandNavigateToDashboard: function() {
			require(['controllers/router',], function(router) {
				router.navigate('/dashboard', {trigger: true});
			});
		},
		
		commandCreateNewOpportunity: function() {
			require(['controllers/router',], function(router) {
				router.navigate('/opportunity/create', {trigger: true});
			});
		},
		
		commandEditOpportunity: function() {
			this.commandDispatcher.trigger('command:editOpp');
		},
		
		commandJoinOpportunity: function() {
			this.commandDispatcher.trigger('command:joinOpp');
		},
		
		commandLeaveOpportunity: function(){
			this.commandDispatcher.trigger('command:leaveOpp');
		}
	});
	return eLeap.own.Sidebar;

});

