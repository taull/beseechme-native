var Router = Backbone.Router.extend({
  initialize: function () {
    BeMe.ApplicationView = new BeMe.Views.Application();
    this.listenTo(this, 'route', this.secondaryRouteHandler);
  },

	routes: {
		'' : 'home',

		'register/business' : 'registerBusiness',
		'register/consumer' : 'registerConsumer',

		'backend' : 'backend',
		'backend/feed' : 'backendFeed',
		'backend/beer' : 'backendBeerList',
		'backend/competition' : 'backendCompetition',
		'backend/calendar' : 'backendCalendar',

    'business/:handle' : 'businessHome',
    'business/:handle/feed' : 'businessFeed',
    'business/:handle/beer' : 'businessBeerList',
    'business/:handle/calendar' : 'businessCalendar',

    'consumer/:handle' : 'consumerHome',

    'dashboard' : 'dashboardHome',
    'dashboard/feed' : 'dashboardFeed',
    'dashboard/listing' : 'dashboardListing',
    'dashboard/map' : 'dashboardMap',
    'dashboard/following' : 'dashboardfollowing',
    'dashboard/friends' : 'dashboardFriends',

    // 'search/:query' : 'search',
		
    'settings' : 'settings',
    'settings/basic' : 'settingsBasic',
    'settings/address' : 'settingsAddress',
    'settings/logos' : 'settingsLogos',

    'location' : 'location',

    'test' : 'test',
	},

  test: function () {
    BeMe.removeAllViews();
    var query = new Parse.Query('status');
    query.limit(5);
    query.find().then(function (e) {
      var collection = new Parse.Collection(e);
      var view = new BeMe.Views.StatusListView({collection:collection,container:'.body-container'});
    });

  },

  secondaryRouteHandler: function (routeName) {
    if (!!routeName.match(/dashboard\w*/g)) { //if it is one of the dashboard routes
      this.dashboardGlobal();
    } else if (!!routeName.match(/settings\w*/g)) { // if it is one of the settings routes
      this.settingsGlobal();
    } 
  },

	registerBusiness: function () {
		BeMe.removeAllViews();
		new BeMe.Views.BusinessRegister();
	},

	registerConsumer: function () {
		BeMe.removeAllViews();
		new BeMe.Views.ConsumerRegister();
	},

	home: function () {
		BeMe.removeAllViews();
		new BeMe.Views.Index();
	},

	backend: function () {
		BeMe.removeAllViews();
		new BeMe.Views.Backend();
	},

	backendFeed: function () {
		BeMe.removeAllViews();
		new BeMe.Views.Backend();
		new BeMe.Views.BackendFeed();
	},

	backendBeerList: function () {
		BeMe.removeAllViews();
		new BeMe.Views.Backend();
		new BeMe.Views.BackendBeerList();
	},

	backendCompetition: function () {
		BeMe.removeAllViews();
		new BeMe.Views.Backend();
		new BeMe.Views.BackendCompetition();
	},

	backendCalendar: function () {
		BeMe.removeAllViews();
		new BeMe.Views.Backend();
		BeMe.Calendar.CalendarView = new BeMe.Views.BackendCalendar();
	},

  businessHome: function (handle) {
    BeMe.removeAllViews();

    var query = new Parse.Query('User');
    query.equalTo('handle', handle);
    query.first().then(function (i) {
      if (i) {
        new BeMe.Views.Business({model:i});
        new BeMe.Views.BusinessHome({model:i});
      } else {
        new BeMe.Views.BusinessError(handle);
      }
    });
  },

  businessFeed: function (handle) {
    BeMe.removeAllViews();


    var query = new Parse.Query('User');
    query.equalTo('handle', handle);
    query.first().then(function (i) {
      if (i) {
        new BeMe.Views.Business({model:i});
        new BeMe.Views.BusinessFeed({model:i});
      } else {
        new BeMe.Views.BusinessError(handle);
      }
      console.log(i);
    });
  },

  businessBeerList: function (handle) {
    BeMe.removeAllViews();

    var query = new Parse.Query('User');
    query.equalTo('handle', handle);
    query.first().then(function (i) {
      if (i) {
        new BeMe.Views.Business({model:i});
        new BeMe.Views.BusinessBeerList({model:i});
      } else {
        new BeMe.Views.BusinessError(handle);
      }
      console.log(i);
    });
  },

  businessCalendar: function (handle) {
    BeMe.removeAllViews();

    var query = new Parse.Query('User');
    query.equalTo('handle', handle);
    query.first().then(function (i) {
      if (i) {
        new BeMe.Views.Business({model:i});
        new BeMe.Views.BusinessCalendar({model:i});
      } else {
        new BeMe.Views.BusinessError(handle);
      }
      console.log(i);
    });
  },

  consumerHome: function (handle) {
    BeMe.removeAllViews();

    var query = new Parse.Query('User');
    query.equalTo('handle', handle);
    query.first().then(function (user) {
      new BeMe.Views.ConsumerHome({model:user});
    });
  },

  search: function (queryString) {
    BeMe.removeAllViews();
    var queryString = decodeURIComponent(queryString);
    new BeMe.Views.BarSearch({query:queryString});
    var queryString = queryString.toLowerCase();

    var businessQuery = new Parse.Query('User');
    businessQuery.contains('businessNameLowercase', queryString);
    businessQuery.equalTo('userType', 'business');

    var handleQuery = new Parse.Query('User');
    handleQuery.contains('handle', queryString);

    var consumerQuery = new Parse.Query('User');
    consumerQuery.contains('fullNameLowercase', queryString);
    consumerQuery.equalTo('userType', 'consumer');

    var query = Parse.Query.or(businessQuery, consumerQuery, handleQuery);
    query.find().then(function (i) {
      console.log(i);
      var collection = new Parse.Collection(i);
      BeMe.Search.BarSearchResults = new BeMe.Views.BarSearchResults({collection:collection});
    });
  }, 

  dashboardHome: function () {
    BeMe.removeAllViews();
    new BeMe.Views.DashboardHome();
  },

  dashboardFeed: function () {
    BeMe.removeAllViews();
    new BeMe.Views.DashboardFeed();
  },

  dashboardListing: function () {
    BeMe.removeAllViews();
    new BeMe.Views.DashboardListing();
  },

  dashboardMap: function () {
    BeMe.removeAllViews();
    new BeMe.Views.DashboardMap();
  },

  dashboardfollowing: function () {
    BeMe.removeAllViews();
    new BeMe.Views.Dashboardfollowing();
  },

  dashboardFriends: function () {
    BeMe.removeAllViews();
    new BeMe.Views.DashboardFriends();
  },

  dashboardGlobal: function () {
    $('.header-left')[0].className = 'header-left header-left-1';
  },

  settings: function () {
    BeMe.removeAllViews();
    new BeMe.Views.Settings();
  },

  settingsBasic: function () {
    BeMe.removeAllViews();
    new BeMe.Views.SettingsBasic();
  },

  settingsAddress: function () {
    BeMe.removeAllViews();
    new BeMe.Views.SettingsAddress();
  },

  settingsLogos: function () {
    BeMe.removeAllViews();
    new BeMe.Views.SettingsLogos();
  },

  settingsGlobal: function () {
    $('.header-left')[0].className = 'header-left header-left-3';
  },

  location: function () {
    BeMe.removeAllViews();
    new BeMe.Views.Location();
  }
});