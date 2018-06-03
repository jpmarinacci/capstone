/**
 * @author: JP Marinacci, Sunny Wu
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'text!../../tmpl/navigation/sidebar.tmpl'],
function (eLeap, $, _, Backbone, sidebarTmpl) { 'use strict';

	var thisView;

	eLeap.own.Sidebar = Backbone.View.extend({

        sidebarTmpl: _.template(sidebarTmpl),

		events: {
			'click .dashboardLink': 'commandNavigateToDashboard',
			'click .accountSettingsBtn': 'commandUpdateAccount',
			'click .createOppBtn': 'commandCreateNewOpportunity',
			'click .editOppBtn': 'commandEditOpportunity',
			'click .joinOppBtn': 'commandJoinOpportunity',
			'click .leaveOppBtn': 'commandLeaveOpportunity',
			'click .approveOppBtn': 'commandApproveOpportunity',
			'click .denyOppBtn': 'commandDenyOpportunity',
			'click .allOppsBtn': 'commandFilterAllOpps',
			'click .joinedOppsBtn': 'commandFilterJoinedOpps',
			'click .ownedOppsBtn': 'commandFilterOwnedOpps'
		},
		
		initialize: function (options) {
			thisView = this;
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
				this.listenTo(this.commandDispatcher, 'show:joined', this.showJoined);
				this.listenTo(this.commandDispatcher, 'show:owned', this.showOwned);
				this.listenTo(this.commandDispatcher, 'show:allOpps', this.showAllOpps);
				
				this.listenTo(this.commandDispatcher, 'show:create', this.showCreate);
				this.listenTo(this.commandDispatcher, 'show:edit', this.showEdit);
				this.listenTo(this.commandDispatcher, 'show:join', this.showJoin);
				this.listenTo(this.commandDispatcher, 'show:leave', this.showLeave);
				this.listenTo(this.commandDispatcher, 'show:approve', this.showApprove);
				this.listenTo(this.commandDispatcher, 'show:deny', this.showDeny);
				this.listenTo(this.commandDispatcher, 'show:approveDeny', this.showApproveDeny);
				
				this.listenTo(this.commandDispatcher, 'hide:oppViewBtns', this.hideOppViewBtns);
				this.listenTo(this.commandDispatcher, 'show:oppViewBtns', this.showOppViewBtns);
				this.listenTo(this.commandDispatcher, 'hide:oppFilterBtns', this.hideOppFilterBtns);
				
				this.listenTo(this.commandDispatcher, 'hide:approve', this.hideApprove);
				this.listenTo(this.commandDispatcher, 'hide:deny', this.hideDeny);
				this.listenTo(this.commandDispatcher, 'hide:approveDeny', this.hideApproveDeny);
				this.listenTo(this.commandDispatcher, 'hide:create', this.hideCreate);
				this.listenTo(this.commandDispatcher, 'hide:edit', this.hideEdit);
				this.listenTo(this.commandDispatcher, 'hide:join', this.hideJoin);
				this.listenTo(this.commandDispatcher, 'hide:leave', this.hideLeave);
			}
		},
		
		remove: function() {
			this.$el.off().empty();
			this.stopListening();
			return this;
		},
		
		showOppViewBtns: function(){
			this.$(".oppSettings").show();
		},
		
		showAllOpps: function(){
			this.$(".allOppsBtn").show();
		},
		
		showJoined: function() {
			this.$(".joinedOppsBtn").show();
		},
				
		showOwned: function() {
			this.$(".ownedOppsBtn").show();
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
		
		showApprove: function() {
			this.$(".approveOppBtn").show();
		},
		
		showDeny: function() {
			this.$(".denyOppBtn").show();
		},
		
		showApproveDeny: function() {
			this.$(".approveOppBtn").show();
			this.$(".denyOppBtn").show();
		},
		
		hideApproveDeny: function() {
			this.$(".approveOppBtn").hide();
			this.$(".denyOppBtn").hide();
		},
				
		hideJoined: function() {
			this.$(".joinedOppBtn").hide();
		},
		
		hideOwned: function() {
			this.$(".ownedOppBtn").hide();
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
		
		hideApprove: function() {
			this.$(".approveOppBtn").hide();
		},
		
		hideDeny: function() {
			this.$(".denyOppBtn").show();
		},

		hideOppFilterBtns: function(){
			this.$(".allOppsBtn, .joinedOppsBtn, .ownedOppsBtn").hide();
		},
		
		hideOppViewBtns: function(){
			this.$(".oppSettings").hide();
			this.$(".editOppBtn, .joinOppBtn, .leaveOppBtn, .approveOppBtn, .denyOppBtn").hide();
		},
		
		commandUpdateAccount: function() {
			this.$(".accountSettingsBtn i").addClass('fa-spin');
			setTimeout(function(){
				thisView.$(".accountSettingsBtn i").removeClass('fa-spin');
			}, 1000);
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
		
		commandFilterAllOpps: function() {
			this.commandDispatcher.trigger('filter:all');
		},
		
		commandFilterJoinedOpps: function() {
			this.commandDispatcher.trigger('filter:joined');
		},
		
		commandFilterOwnedOpps: function(){
			this.commandDispatcher.trigger('filter:owned');
		},
		
		commandEditOpportunity: function() {
			this.commandDispatcher.trigger('command:editOpp');
		},
		
		commandJoinOpportunity: function() {
			this.commandDispatcher.trigger('command:joinOpp');
		},
		
		commandLeaveOpportunity: function(){
			this.commandDispatcher.trigger('command:leaveOpp');
		},
		
		commandApproveOpportunity: function() {
			this.commandDispatcher.trigger('command:approveOpp');
		},
		
		commandDenyOpportunity: function() {
			this.commandDispatcher.trigger('command:denyOpp');
		}
	});
	return eLeap.own.Sidebar;

});

