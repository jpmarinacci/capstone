/** 
 *	@authors: JP Marinacci
 */

define(['jquery', 'underscore', 'backbone', 'eLeap', 'controllers/cache', 'controllers/user', 'navigation/sidebar',
		'navigation/navbar'], 
function ($, _, Backbone, eLeap, cache, user, Sidebar, Navbar) { 'use strict';
	
	var thisRouter;
	
	eLeap.own.Router = Backbone.Router.extend({
		
		lastRoute: '/',
		
		initialize: function() {
			// router owns the routing mechanisms, logged in/logged out display
			// the page layout including the navbar and sidebar.
			// it owns the main command dispatcher that handles event triggers throghout the app 
			this.commandDispatcher = _.clone(Backbone.Events);
			this.navbar = new Navbar({
				commandDispatcher: this.commandDispatcher,
				el: "#navbar"
			});
			this.listenForEvents();
		},
		
		routes: {
			'/': 'home',
			'about': 'about',
			'accountsettings': 'accountSettings',
			'dashboard': 'dashboard',
			//'dbTest': 'dbTest',
			'home': 'home',
			'instructorsettings': 'instructorSettings',
			'login': 'loginPage',
			'opportunity/:id': 'opportunity',
			'signup':'signup',
			'team': 'team',
			'themesettings': 'themeSettings',
			'*path':  'home'
		},
		
		listenForEvents: function() {
			// always stop listening before listening to ensure
			// only one listener of a given event is active
			this.stopListening();
			if(user) {
				this.listenTo(user, 'user:loggedIn', this.successfulLogin);
				this.listenTo(user, 'user:loggedOut', this.showLoggedOut);
			}
		},
		
		successfulLogin: function() {
			this.navbar.showLoggedIn();
			if(!this.sidebar) {
				this.sidebar = new Sidebar({
					el: "#sidebar",
					commandDispatcher: this.commandDispatcher
				});
			}
			if (window.location.pathname === "/" + this.lastRoute) {
				window.location.assign("/" + this.lastRoute);
			} else {
				this.navigate(this.lastRoute, { trigger: true });
			}
			
			//fetch any neccessary data;
			require(['controllers/cache'], function(cache) {
				cache.fetchRoles();
			});
		},
		
		showLoggedOut: function () {
			this.navbar.showLoggedOut();
			if(this.sidebar) {
				this.sidebar.remove();
				this.sidebar = undefined;
			}
			cache.emptyCache();
			if(this.lastRoute !== '/home' && this.lastRoute !== '/login' && this.lastRoute !== '/signup' &&
				this.lastRoute !== '/team' && this.lastRoute !== '/about') {
				this.navigate('/home', { trigger: true });
			}
			
		},
		
		beginNewPage: function() {
			if(this.currentPage) {
				this.currentPage.remove();
				this.currentPage = undefined;
			}
		},
		
		pageDeploy: function(deployPage) {
			//user.logout();
			var loginState = user.checkLoginState();
			if(loginState === 'pending') {
				this.pageToDeploy = deployPage;
			} else {
				if(loginState) {
					deployPage.call(this);
				} else {
					user.clientLogout();
				}
			}
		},
		
		about: function() {
			this.lastRoute = '/about';
			this.beginNewPage();
			$("#pages").empty().append("<div id='aboutPage'></div>");
			require(['pages/aboutPage'], function(AboutPage) {
				thisRouter.currentPage = eLeap.run.aboutPage = new AboutPage({
					el: "#aboutPage"
				});
			});
		},
		
		accountSettings: function() {
			this.lastRoute = '/accountsettings';
			this.beginNewPage();
			this.pageDeploy(function() {
				$("#pages").empty().append("<div id='accountSettingsPage' class='mb10 pb40'></div>");
				require(['pages/accountSettingsPage'], function(AccountSettingsPage) {
					thisRouter.currentPage = eLeap.run.accountSettingsPage = new AccountSettingsPage({
						commandDispatcher: thisRouter.commandDispatcher,
						el: "#accountSettingsPage"
					});
				});
			});
		},
		
		dashboard: function () {
			this.lastRoute = '/dashboard';
			this.beginNewPage();
			this.pageDeploy(function() {				
				$("#pages").empty().append("<div id='dashboardPage'></div>");
				require(['pages/dashboardPage'], function(DashboardPage) {
					thisRouter.currentPage = eLeap.run.dashboardPage = new DashboardPage({
						commandDispatcher: thisRouter.commandDispatcher,
						el: "#dashboardPage"
					});
				});
			});
		},
		
		dbTest: function() {
			this.lastRoute = '/dbTest';
			this.beginNewPage();
			this.pageDeploy(function() {
				$("#pages").empty().append("<div id='dbTest'> DATA: </div>");
				require(['pages/dbTestPage'], function(DbTestPage) {
					thisRouter.currentPage = eLeap.run.dbTestPage = new DbTestPage({
						commandDispatcher: thisRouter.commandDispatcher,
						el: "#dbTest"
					});
				});
			});
		},
		
		home: function() {
			this.lastRoute = '/home';
			this.beginNewPage();
			$("#pages").empty().append("<div id='homePage'></div>");
			require(['pages/homePage'], function(HomePage) {
				thisRouter.currentPage = eLeap.run.homePage = new HomePage({
					commandDispatcher: thisRouter.commandDispatcher,
					el: "#homePage"
				});
			});
		},
		
		instructorSettings: function() {
			this.lastRoute = '/instructorsettings';
			this.beginNewPage();
			this.pageDeploy(function() {
				$("#pages").empty().append("<div id='instructorSettingsPage'></div>");
				require(['pages/instructorSettingsPage'], function(InstructorSettingsPage) {
					thisRouter.currentPage = eLeap.run.instructorSettingsPage = new InstructorSettingsPage({
						commandDispatcher: thisRouter.commandDispatcher,
						el: "#instructorSettingsPage"
					});
				});
			});
		},
		
		lockedPage: function () {
			this.beginNewPage();
			this.pageDeploy(function() {
				$("#pages").empty().append("<div id='lockedPage'></div>");
				require(['pages/lockedPage'], function(LockedPage) {
					thisRouter.currentPage = eLeap.run.lockedPage = new LockedPage({
						el: "#lockedPage"
					});
				});
			});
		},
		
		loginPage: function() {
			this.lastRoute = '/login';
			this.beginNewPage();
			$("#pages").empty().append("<div id='loginPage'></div>");
			require(['pages/loginPage'], function(LoginPage) {
				thisRouter.currentPage = eLeap.run.loginPage = new LoginPage({
					el: "#loginPage"
				});
			});
		},
		
		opportunity: function(id) {
			this.lastRoute = '/opportunity/' + id;
			this.beginNewPage();
			this.pageDeploy(function() {
				$("#pages").empty().append("<div id='opportunityPage'></div>");
				require(['pages/opportunityPage'], function(OpportunityPage) {
					thisRouter.currentPage = eLeap.run.opportunityPage = new OpportunityPage({
						commandDispatcher: thisRouter.commandDispatcher,
						el: "#opportunityPage",
						opportunityId: id
					});
				});
			});
		},
		
		signup: function() {
			this.lastRoute = '/signup';
			this.beginNewPage();
			$("#pages").empty().append("<div id='signupPage'></div>");
			require(['pages/signupPage'], function(SignupPage) {
				thisRouter.currentPage = eLeap.run.signupPage = new SignupPage({
					el: "#signupPage"
				});
			});
		},
		
		team: function() {
			this.lastRoute = '/team';
			this.beginNewPage();
			$("#pages").empty().append("<div id='teamPage'></div>");
			require(['pages/teamPage'], function(TeamPage) {
				thisRouter.currentPage = eLeap.run.teamPage = new TeamPage({
					el: "#teamPage"
				});
			});
		},
		
		themesettings: function () {
			this.lastRoute = '/themesettings';
			this.beginNewPage();
			this.pageDeploy(function() {
				$("#pages").empty().append("<div id='themeSettingsPage'></div>");
				require(['pages/themeSettingsPage'], function(ThemeSettingsPage) {
					thisRouter.currentPage = eLeap.run.themesettingsPage = new ThemeSettingsPage({
						el: "#themeSettingsPage"
					});
				});
			});
		}
	});
	
	function getRouter() {
		thisRouter = thisRouter || (eLeap.run.router = new eLeap.own.Router());
		return thisRouter;
	}
	return getRouter();
});

