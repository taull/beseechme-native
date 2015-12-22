var Router = Parse.Router.extend({
	routes: {
		'' : 'home',

		'register/business' : 'registerBusiness',
		'register/consumer' : 'registerConsumer',

		'backend' : 'backend',
		'backend/feed' : 'backendFeed',
		'backend/beer' : 'backendBeerList',
		'backend/competition' : 'backendCompetition',
		'backend/calendar' : 'backendCalendar',
		'backend/settings' : 'backendSettings',

    'business/:handle' : 'businessHome',
    'business/:handle/feed' : 'businessFeed',
    'business/:handle/beer' : 'businessBeerList',
    'business/:handle/calendar' : 'businessCalendar',

    'dashboard' : 'dashboardHome',
    'dashboard/feed' : 'dashboardFeed',
    'dashboard/listing' : 'dashboardListing',
    'dashboard/map' : 'dashboardMap',
    'dashboard/following' : 'dashboardfollowing',
    'dashboard/friends' : 'dashboarrdFriends',

    'search/:query' : 'search',

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

	initialize: function () {
		BeMe.ApplicationView = new BeMe.Views.Application();
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

	backendSettings: function () {
		BeMe.removeAllViews();
		new BeMe.Views.Backend();
		new BeMe.Views.BackendSettings();
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

  location: function () {
    BeMe.removeAllViews();
    new BeMe.Views.Location();
  }
});