/**
 * @authors: JP Marinacci, Belete Zegeye, Sunny Wu, Aren Kasner, Leo Sinanian
 */

/*jshint devel:true, jquery:true, browser:true, strict: true */
/*global eLeap:true */

define(['eLeap', 'jquery', 'underscore', 'backbone', 'controllers/cache', 'controllers/notifications',
		'controllers/router', 'controllers/user', 'collections/collegeClasses',
		'collections/opportunities', 'items/opportunityItem', 'text!../../tmpl/pages/dashboardPage.tmpl'],
	function (eLeap, $, _, Backbone, cache, notifications, router, user, CollegeClasses, Opportunities,
		OpportunityItem, dashboardPageTmpl) {'use strict';

	eLeap.own.DashboardPage = Backbone.View.extend({
		
		pageTmpl: _.template(dashboardPageTmpl),
		
		events: {
			'click .cardModeBtn': 'commandCardView',
			'click .listModeBtn': 'commandListView',
			'click .oppItemApproveBtn': 'commandApproveOpp',
			'click .oppItemDenyBtn': 'commandDenyOpp'
		},
		
		initialize: function (options) {
			this.options = _.extend({}, options);
			this.commandDispatcher = options.commandDispatcher;
			this.allOpps = cache.allOpps;
			this.joinedOpps = cache.joinedOpps;
			this.ownedOpps = cache.ownedOpps;
			this.renderFramework();
			this.listenForEvents();
			
			if(user.person.get('roleId')) {
				this.gotPerson();
			}
			this.fetchOpps();
		},
		
		renderFramework: function() {
			this.$el.html(this.pageTmpl());
			this.commandDispatcher.trigger('show:allOpps');
		},
		
		listenForEvents: function() {
			this.stopListening();
			if(user && user.person) {
				this.listenTo(user.person, 'sync change', this.gotPerson);
			}
			if(this.commandDispatcher) {
				this.listenTo(this.commandDispatcher, 'filter:all', this.gotAllOpps);
				this.listenTo(this.commandDispatcher, 'filter:joined', this.renderJoinedOpps);
				this.listenTo(this.commandDispatcher, 'filter:owned', this.renderOwnedOpps);
			}
			if(this.allOpps) {
				this.listenTo(this.allOpps, 'reset', this.gotAllOpps);
			}
			if(this.joinedOpps) {
				this.listenTo(this.joinedOpps, 'reset', this.gotJoinedOpps);
			}
			if(this.ownedOpps) {
				this.listenTo(this.ownedOpps, 'reset', this.gotOwnedOpps);
			}
		},
		
		listenForClassesEvents: function() {
			if(user && user.person && user.person.classes) {
				this.stopListening(user.person.classes);
				this.listenTo(user.person.classes, 'reset', this.gotClasses);
			}
		},
		
		fetchOpps: function() {
			//based on role type we will show different opportunites
			cache.fetchAllOpps({reset: true});
			cache.fetchJoinedOpportunities({reset:true});
			cache.fetchOwnedOpportunities({reset:true});
		},
		
		getClasses: function() {
			user.person.classes = new CollegeClasses();
			this.listenForClassesEvents();
			var personId = user.person.get('personId');
			var options = this.roleId === 2 ? {studentId: personId} : { ownerId: personId};
			user.fetchClasses(options);
		},
		
		gotPerson: function() {
			this.roleId = user.person.get('roleId');
			if(this.roleId === 2 || this.roleId === 5) {
				this.getClasses();
			}
			if(this.roleId > 2) {
				if(this.commandDispatcher) {
					this.commandDispatcher.trigger('show:create');
				}
			}
			if(this.roleId === 5) {
				if(this.commandDispatcher) {
					this.commandDispatcher.trigger('show:instructor');
				}
			}
			if(user.person.get('personName') !== "") {
				this.$(".welcomeName").text(user.person.get('personName'));
			}
		},
		
		gotAllOpps: function() {
			this.allOppsFetched = true;
			if(this.roleId === 2 || this.roleId === 5) {
				this.decideReadyRender();
			} else {
				this.renderAllOpps();	
			}
		},
		
		gotJoinedOpps: function() {
			this.isJoinedOppsFetched = true;
			if(this.joinedOpps.length) {
				this.commandDispatcher.trigger('show:joined');
			}
			if(this.roleId === 2) {
				this.decideReadyRender();
			}
		},
		
		gotOwnedOpps: function() {
			this.isOwnedOppsFetched = true;
			if(this.ownedOpps.length) {
				this.commandDispatcher.trigger('show:owned');
			}
			if(this.roleId === 5) {
				this.decideReadyRender();
			}
		},
		
		gotClasses: function() {
			this.isClassesFetched = true;
			this.decideReadyRender();
		},
		
		decideReadyRender: function() {
			if(this.allOppsFetched && this.isClassesFetched) {
				if(this.roleId === 5 && this.isOwnedOppsFetched) {
					if(this.ownedOpps.length) {
						this.renderOwnedOpps();
					} else {
						this.renderAllOpps();
					}
				} else if(this.roleId === 2 && this.isJoinedOppsFetched) { 
					if(this.joinedOpps.length) {
						this.renderJoinedOpps();
					} else {
						this.renderAllOpps();
					}
				}
			}
		},
		
		renderOpp: function(opp) {
			var isShow = false;
			if(opp.get('opportunityId')) {
				var classId = opp.get('classId'); 
				if(classId) {
					isShow = false;
					if((this.roleId === 2 || this.roleId === 5) && user.person.classes.get(classId)) {
						isShow = true;
					}
				}
				//needs to updates dateTime to 00:00 
				//to show opps on that day after now (ie past end time on that day)
				isShow = opp.get('endDateTime') && opp.get('endDateTime') > new Date() ? true: false;
				isShow = this.roleId === 7 ? true: isShow;
				if(isShow) {
					var oppItem = new OpportunityItem({
						opportunity: opp
					});
					this.$(".opportunitiesList").append(oppItem.render());
				}
				this.renderApprovalButtons(opp);
			}
		},
		
		renderAllOpps: function() {
			this.$(".dashboardBreadCrumbTitle").text("All Opportunities");
			this.$(".opportunitiesList").empty();
			if(this.allOpps) {
				var thisPage = this;
				this.allOpps.sort().each(function(opp) {
					thisPage.renderOpp(opp);
				});
			} else {
				this.$(".opportunitiesList").html("No Opporunities to display");
			}
		},
		
		renderJoinedOpps: function() {
			this.$(".dashboardBreadCrumbTitle").text("Joined Opportunities");
			this.$(".opportunitiesList").empty();
			if(this.joinedOpps) {
				var thisPage = this;
				this.joinedOpps.sort().each(function(opp) {
					thisPage.renderOpp(opp);
				});
			} else {
				this.$(".opportunitiesList").html("No joined opporunities to display");
			}
		},
		
		renderOwnedOpps: function(){
			this.$(".dashboardBreadCrumbTitle").text("My Created Opportunities");
			this.$(".opportunitiesList").empty();
			if(this.ownedOpps) {
				var thisPage = this;
				this.ownedOpps.sort().each(function(opp) {
					thisPage.renderOpp(opp);
				});
			} else {
				this.$(".opportunitiesList").html("No owned opporunities to display");
			}
		},
		
		renderApprovalButtons: function(opp) {
			if(this.roleId > 5) {
				this.$("[data-oppId='"+opp.get('opportunityId') +"']").show();
				var status = opp.get('status'); 
				if(status === 'approved') {
					this.$(".oppItemApproveBtn[data-oppId='"+opp.get('opportunityId') +"']").hide();
				} else if(status === 'denied') {
					this.$(".oppItemDenyBtn[data-oppId='"+opp.get('opportunityId') +"']").hide();
				}
			}
		},
				
		commandCardView: function() {
			notifications.notifyUser('viewing card view');
		},
		
		commandListView: function() {
			notifications.notifyUser('list view not implemented yet');
		},
		
		commandApproveOpp: function() {
			this.opp.save({'status':'approved'});
		},
		
		commandDenyOpp: function() {
			this.opp.save({'status':'denied'});
		},
		
		remove: function() {
			if(this.commandDispatcher) {
				this.commandDispatcher.trigger('hide:oppFilterBtns');
			}
			this.$el.remove();
			this.stopListening();
			return this;
		}
	});
	return eLeap.own.DashboardPage;
});

