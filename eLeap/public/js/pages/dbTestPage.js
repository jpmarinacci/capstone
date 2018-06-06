/**
 * @authors: JP Marinacci, Belete Zegeye
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'text!../../tmpl/pages/dbTestPage.tmpl'],
	function (eLeap, $, _, Backbone, pageTmpl) {'use strict';
		
	eLeap.own.DBTestPage = Backbone.View.extend({
		
		pageTmpl: _.template(pageTmpl),
		
		events: {
			'click .createOpportunityButton':'runCreateOpportunityTest',
			'click .createPersonButton': 'runCreatePersonTest'
		},
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.renderFramework();
			this.runDbCollectionReadTests();
			//this.runDbModelReadTests();
		},
		
		renderFramework: function() {
			this.$el.html(this.pageTmpl());
		},
		
		runDbCollectionReadTests: function() {
			//not a traditional software unit test, just checking if the server retrieves data
			//this.runAchievementsCollectionTest();
			//this.runCommunitiesCollectionTest();
			this.runOpportunitiesCollectionTest();
			this.runPersonsCollectionTest();
			this.runRolesCollectionTest();
		},
				
		runDbModelReadTests: function() {
			this.runRoleModelTest();
		},
		
		/********************************************************************
		 *  	Tests
		 *******************************************************************/

		runAchievementsCollectionTest: function() {
			var thisPage = this;
			require(['collections/achievements'], function(Achievements) {
				thisPage.achievements = new Achievements();
				if(thisPage.achievements) {
					thisPage.stopListening(thisPage.achievements);
					thisPage.listenTo(thisPage.achievements, 'reset', thisPage.renderAchievements);
				}
				thisPage.achievements.fetch({
					reset: true 
				});
			});
		},
		
		runCommunitiesCollectionTest: function() {
			var thisPage = this;
			require(['collections/communities'], function(Communities) {
				thisPage.communities = new Communities();
				if(thisPage.communities) {
					thisPage.stopListening(thisPage.communities);
					thisPage.listenTo(thisPage.communities, 'reset', thisPage.renderCommunities);
				}
				thisPage.communities.fetch({
					reset: true 
				});
			});
		},
		
		runOpportunitiesCollectionTest: function() {
			var thisPage = this;
			require(['collections/opportunities'], function(Opportunities) {
				thisPage.opportunities = new Opportunities();
				if(thisPage.opportunities) {
					thisPage.stopListening(thisPage.opportunities);
					thisPage.listenTo(thisPage.opportunities, 'reset', thisPage.renderOpportunities);
				}
				thisPage.opportunities.fetch({
					reset: true 
				});
			});
		},
		
		runPersonsCollectionTest: function() {
			var thisPage = this;
			require(['collections/persons'], function(Persons) {
				thisPage.persons = new Persons();
				if(thisPage.persons) {
					thisPage.stopListening(thisPage.persons);
					thisPage.listenTo(thisPage.persons, 'reset', thisPage.renderPersons);
				}
				thisPage.persons.fetch({
					reset: true 
				});
			});
		},
		
		runRolesCollectionTest: function() {
			var thisPage = this;
			require(['collections/roles'], function(Roles) {
				thisPage.roles = new Roles();
				if(thisPage.roles) {
					thisPage.stopListening(thisPage.roles);
					thisPage.listenTo(thisPage.roles, 'reset', thisPage.renderRoles);
				}
				thisPage.roles.fetch({
					reset: true 
				});
			});
		},
		
		runRoleModelTest: function() {
			var thisPage = this;
			require(['models/role'], function(Role) {
				thisPage.role = new Role();
				if(thisPage.role) {
					thisPage.stopListening(thisPage.role);
					thisPage.listenTo(thisPage.role, 'sync', thisPage.renderRole);
				}
				thisPage.role.fetch();
			});
		},
		
		runCreatePersonTest: function() {
			var thisPage = this;
			require(['forms/signupForm'], function(SignupForm) {
				thisPage.signupForm = new SignupForm({
					el: thisPage.$(".signupForm")
				});
			});
		},
		
		runCreateOpportunityTest: function() {
			var thisPage = this;
			require(['forms/opportunityForm'], function(OpportunityForm) {
				thisPage.opportunityForm = new OpportunityForm({
					el: thisPage.$(".opportunityForm")
				});
			});
		},
		
		/********************************************************************
		 *  	RENDER
		 *******************************************************************/
				
		renderAchievements: function() {
			var thisPage = this;
			require(['text!../../tmpl/items/achievementItem.tmpl'], function(achItemTmpl) {
				thisPage.achItemTmpl = thisPage.achItemTmpl || _.template(achItemTmpl);
				if(thisPage.achievements) {
					thisPage.achievements.each(function(achievement) {
						var itemHtml = thisPage.achItemTmpl({
							achievement: achievement.toJSON()
						});
						thisPage.$(".achievementsList").append(itemHtml);
					});
				}
			});
		},
		
		renderCommunities: function() {
			var thisPage = this;
			require(['text!../../tmpl/items/communityItem.tmpl'], function(comItemTmpl) {
				thisPage.comItemTmpl = thisPage.comItemTmpl ||_.template(comItemTmpl);
				if(thisPage.communities) {
					thisPage.communities.each(function(community) {
						var itemHtml = thisPage.comItemTmpl({
							community: community.toJSON()
						});
						thisPage.$(".communitiesList").append(itemHtml);
					});
				}
			});
		},		
		
		renderOpportunities: function() {
			var thisPage = this;
			require(['text!../../tmpl/items/opportunityItem.tmpl'], function(oppItemTmpl) {
				thisPage.oppItemTmpl = thisPage.oppItemTmpl || _.template(oppItemTmpl);
				if(thisPage.opportunities) {
					thisPage.opportunities.each(function(opportunity) {
						var itemHtml = thisPage.oppItemTmpl({
							opportunity: opportunity.toJSON()
						});
						thisPage.$(".opportunitiesList").append(itemHtml);
					});
				}
			});
		},
		
		renderPersons: function() {
			var thisPage = this;
			require(['text!../../tmpl/items/personItem.tmpl'], function(personItemTmpl) {
				thisPage.personItemTmpl = thisPage.personItemTmpl || _.template(personItemTmpl);
				if(thisPage.persons) {
					thisPage.persons.each(function(person) {
						var itemHtml = thisPage.personItemTmpl({
							person: person.toJSON()
						});
						thisPage.$(".personsList").append(itemHtml);
					});
				}
			});
		},
				
		renderRole: function() {
			var thisPage = this;
			require(['text!../../tmpl/items/roleItem.tmpl'], function(roleItemTmpl) {
				thisPage.roleItemTmpl = thisPage.roleItemTmpl || _.template(roleItemTmpl);
				if(thisPage.role) {
					var itemHtml = thisPage.roleItemTmpl({
						role: role.toJSON()
					});
					thisPage.$(".roleDiv").append(itemHtml);
				}
			});
		},
				
		renderRoles: function() {
			var thisPage = this;
			require(['text!../../tmpl/items/roleItem.tmpl'], function(roleItemTmpl) {
				thisPage.roleItemTmpl = thisPage.roleItemTmpl || _.template(roleItemTmpl);
				if(thisPage.roles) {
					thisPage.roles.each(function(role) {
						var itemHtml = thisPage.roleItemTmpl({
							role: role.toJSON()
						});
						thisPage.$(".rolesList").append(itemHtml);
					});
				}
			});
		}
	});
	return eLeap.own.DBTestPage;
});

