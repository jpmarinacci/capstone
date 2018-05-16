/** 
 *	@authors: JP Marinacci
 */

define(['jquery', 'underscore', 'backbone', 'eLeap', 'controllers/user', 'navigation/sidebar', 'navigation/navbar'], 
function ($, _, Backbone, eLeap, user, Sidebar, Navbar) { 'use strict';
	
	var thisRouter;
	
	eLeap.own.Router = Backbone.Router.extend({
		
		lastRoute: '/',
		
		initialize: function() {
			this.navbar = new Navbar({
				el: "#navbar"
			});
			this.listenForEvents();
		},
		
		routes: {
			'/': 'loginPage',
			'about': 'about',
			'account/settings': 'accountSettings',
			'account/profile': 'accountProfile',
			'dashboard': 'dashboard',
			'dbTest': 'dbTest',
			'home': 'home',
			'login': 'loginPage',
			'opportunity/:id': 'opportunity',
			'signup':'signup',
			'team': 'team',
			'themesettings': 'themeSettings',
			'*path':  'loginPage'
		},
		
		listenForEvents: function() {
			this.stopListening();
			if(user) {
				this.listenTo(user, 'user:loggedIn', this.successfulLogin);
				this.listenTo(user, 'user:loggedOut', this.showLoggedOut);
			}
		},
		
		successfulLogin: function() {
			this.navbar.showLogOutBtn();
			if(!this.sidebar) {
				this.sidebar = new Sidebar({
					el: "#sidebar"
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
			if(this.sidebar) {
				this.sidebar.remove();
				this.sidebar = undefined;
			}
			this.navigate('/login', { trigger: true });
		},
		
		pageDeploy: function(deployPage) {
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
		
		beginNewPage: function() {
			if(this.currentPage) {
				this.currentPage.remove();
				this.currentPage = undefined;
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
			this.lastRoute = '/accountSettings';
			this.beginNewPage();
			this.pageDeploy(function() {
				$("#pages").empty().append("<div id='accountSettingsPage'></div>");
				require(['pages/accountSettingsPage'], function(AccountSettingsPage) {
					thisRouter.currentPage = eLeap.run.accountSettingsPage = new AccountSettingsPage({
						el: "#accountSettingsPage"
					});
				});
			});
		},
		
		accountProfile: function() {
			this.lastRoute = '/accountProfile';
			this.beginNewPage();
			this.pageDeploy(function() {
				$("#pages").empty().append("<div id='accountProfilePage'></div>");
				require(['pages/accountProfilePage'], function(AccountProfilePage) {
					thisRouter.currentPage = eLeap.run.accountProfilePage = new AccountProfilePage({
						el: "#accountProfilePage"
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
						el: "#dbTest"
					});
				});
			});
		},
		
		home: function() {
			this.lastRoute = '/home';
			this.beginNewPage();
			this.pageDeploy(function() {
				$("#pages").empty().append("<div id='homePage'></div>");
				require(['pages/homePage'], function(HomePage) {
					thisRouter.currentPage = eLeap.run.homePage = new HomePage({
						el: "#homePage"
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
						el: "#opportunityPage",
						opportunityId: id
					});
				});
			});
		},
		
		signup: function() {
			this.lastRoute = '/signup';
			this.beginNewPage();
			this.pageDeploy(function() {
				$("#pages").empty().append("<div id='signupPage'></div>");
				require(['pages/signupPage'], function(SignupPage) {
					thisRouter.currentPage = eLeap.run.signupPage = new SignupPage({
						el: "#signupPage"
					});
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
