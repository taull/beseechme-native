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
    'dashboard/friends' : 'dashboardFriends',

    // 'search/:query' : 'search',

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
// 'use strict';


// $('.barback-breadcrumbs').click(function(){
// 	$('.barback-tabs').toggleClass('barback-tabs-shift');
// });

// from a jQuery collection
autosize($('#business-status'));

$('.accordion').accordion({
    "transitionSpeed": 400
});

$('#only-one [data-accordion]').accordion();
$('#barback-menu [data-accordion]').accordion();
$('#backend-settings [data-accordion]').accordion();



//Initialize Parse

Parse.initialize("oRWDYma9bXbBAgiTuvhh0n4xOtJU4mO5ifF1PuBH", "iNmHdD8huWDsHhtc50F9ddlQqx5hH6AkpWvPlQL9");

//namespacing

(function () {
	window.BeMe = {};
	BeMe.Views = {};
	BeMe.Models = {};
	BeMe.Collections = {};
	BeMe.Router = {};
	BeMe.renderedViews = [];


  //route object
  BeMe.Calendar = {};
  BeMe.Dashboard = {};
  BeMe.Search = {};
})();

/*
	Begin utility functions
*/

BeMe.searchUsers = function (searchString) {
  var encodedString = encodeURIComponent(searchString);

  BeMe.Router.navigate('search/' + encodedString, true);
}

BeMe.removeGroup = function (group) {
  _.each(group, function (i) {
    i.remove();
  });
  group = [];
}

BeMe.removeAllViews = function () {
  for (var i = BeMe.renderedViews.length - 1; i >= 0; i--) {
		BeMe.renderedViews[i].removeRenderedView();
	};
};

BeMe.removeViewFromRenderedViews = function (view) {
  var cid = view.cid;
  var index = _.findIndex(BeMe.renderedViews, function (n) {return n.cid === cid});
  BeMe.renderedViews.splice(index,1); //remove from the array
  if (view.subViews) {
    _.each(view.subViews, function (i) { //remove the subViews
      i.remove();
    });
    view.subViews = [];
  }
};

BeMe.createImageFile = function ($fileContainer) {
  var fileObject = $fileContainer[0].files;

  if(fileObject.length) {
    if (fileObject[0].type.search('image') == -1) {
      alert('Image type needs to be an image');
    } else {
     var name = fileObject[0].name;
     var file = fileObject[0];
     var image = new Parse.File(name, file);
    }
  } else {
   var image = undefined;
  }

  return image;
};

//Pass 'true' to redirect to dashboard
BeMe.setCurrentLocation = function (boolean) {
  var user = Parse.User.current();


    new Parse.GeoPoint.current().then(function (currentLocation) {
      user.set('location', currentLocation);
      user.set('lastUpdatedLocation', new Date());

      var latlng = {lat:  currentLocation._latitude , lng: currentLocation._longitude};

      var geocoder = new google.maps.Geocoder;


      geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {

          var locationComponents = results[0].address_components;

          function searchByComponentType(string) {
            return locationComponents.filter(function (i) {
              return !i.types.toString().search(string);
            })[0];
          }

          var address = [searchByComponentType('street_number').long_name, searchByComponentType('route').long_name].join(' ');
          var city = searchByComponentType('locality').long_name;
          var state = searchByComponentType('administrative_area_level_1').short_name;
          var zip = searchByComponentType('postal_code').long_name;

          user.set('address', address);
          user.set('city', city);
          user.set('state', state);
          user.set('zip', zip);
          user.save();
          if (boolean) {
            BeMe.Router.navigate('dashboard', true);
          }
        } else {
          alert("Error: " + status);
        }
      });

    });
};

BeMe.CheckIn = function (user, business) {
  var confirmed = confirm("Check in?");

  if (confirmed) {
    var checkInStatus = new Parse.Object('status');

    var thisMoment = new moment(new Date());
    var dateFormatted = thisMoment.format('h:mma [on] MMMM Do, YYYY');

    var content = '<h1>' + user.get('firstName') + '</h1>' + ' ' + '<h1>' + user.get('lastName') + '</h1>' + ' ' + '<p>' + 'checked into' + '</p>' + ' ' + '<a>' + business.get('businessName') + '</a>';

    checkInStatus.set('location', user.get('location'));
    checkInStatus.set('content', content);
    checkInStatus.set('createdBy', user);
    checkInStatus.set('statusType', 'Check In');

    checkInStatus.save();
  }
}

BeMe.FollowUser = function (user) {
  var currentUser = Parse.User.current();
  var relation = currentUser.relation("barsFollowing");
  if(user.id !== currentUser.id) {
    relation.add(user);
    currentUser.save();
  } else {
    alert("You can't follow yourself");
  }
};

BeMe.UnfollowUser = function (user) {
  var currentUser = Parse.User.current();
  var relation = currentUser.relation('barsFollowing');

  relation.remove(user);
  currentUser.save();
}

/*
	Prototype Manipulation
*/

/*
	View.removeRenderedView
	- removes the rendered View as well as removing it from the renderedViews array
*/

Parse.View.prototype.removeRenderedView = _.wrap(
  Parse.View.prototype.remove,
  function (originalFunction) {
    originalFunction.apply(this);
    BeMe.removeViewFromRenderedViews(this);
  }
);



$(document).ready(function () {
	BeMe.Router = new Router();
	Parse.history.start();
});

BeMe.Views.Application = Parse.View.extend({
	initialize: function () {
		this.render();
    this.on('route', this.render, this);
	},

	el: "#application",

	template: _.template($('#application-view').text()),

  events: {
    'click #logout' : 'logOut',
    'click #sign-in' : 'signIn'
  },

  logOut: function () {
    var self = this;
    Parse.User.logOut().then(function () {
      self.render();
      BeMe.Router.navigate('', true);
    });
  },

  signIn: function () {
    BeMe.Router.navigate('', true);
  },

	render: function () {
		this.$el.html(this.template(this.model));

    $('#search-trigger').click(function(){
      $('.search-container').toggleClass('search-container-shift');
      $('.wrapper-dropdown-2').removeClass('active');
      $('.body-container').toggleClass('body-container-shift');

      $('.search-results-wrap').toggleClass('search-results-fade');
      // setTimeout(function() {
      //   $('.search-results-wrap').toggleClass('search-results-shift');
      // }, 250);

    })


    // obj.dd.on('click', function(event){
    //   $(this).toggleClass('active');
    //   return false;
    // });


    function DropDown(el) {
        this.dd = el;
        this.placeholder = this.dd.children('span');
        this.opts = this.dd.find('ul.dropdown > li');
        this.val = '';
        this.index = -1;
        this.initEvents();
    }
    DropDown.prototype = {
        initEvents : function() {
            var obj = this;

            obj.dd.on('click', function(event){
                $(this).toggleClass('active');
                return false;
            });

            obj.opts.on('click',function(){
                var opt = $(this);
                obj.val = opt.text();
                obj.index = opt.index();
                obj.placeholder.text(obj.val);
            });
        },
        getValue : function() {
            return this.val;
        },
        getIndex : function() {
            return this.index;
        }
    }

    var dd = new DropDown( $('#dd') );

    $(document).click(function() {
      // all dropdowns
      $('.wrapper-dropdown-1').removeClass('active');
    });

    var self = this;
    //The search overlay feature
    $('.bar-search').submit(function(e) {
      e.preventDefault();

      if (self.barSearchResultsView) {
        self.barSearchResultsView.removeRenderedView();
      }

      var userType;
      if (dd.getValue() === 'Business') {
        userType = 'business';
      } else if (dd.getValue() === 'Friends') {
        userType = 'consumer';
      } else {
        alert('Please select a userType');
        return;
      }
      console.log(userType);
      var queryString = $('.bar-search input').val();

      var lowercaseField;
      if (userType === 'business') {
        lowerCaseField = 'businessNameLowercase';
      } else {
        lowerCaseField = 'fullNameLowercase';
      }

      var nameQuery = new Parse.Query('User');
      nameQuery.contains(lowerCaseField, queryString);
      nameQuery.equalTo('userType', userType);

      var handleQuery = new Parse.Query('User');
      handleQuery.contains('handle', queryString);
      handleQuery.equalTo('userType', userType);

      var query = Parse.Query.or(nameQuery, handleQuery);

      query.find().then(function (i) {
        console.log(i);
        var collection = new Parse.Collection(i);
        self.barSearchResultsView = BeMe.Search.BarSearchResults = new BeMe.Views.BarSearchResults({collection:collection});
      });
    });
  }
});













BeMe.Views.BackendBeerList = Parse.View.extend({
	initialize: function () {
    this.beerType = null;
    this.pageNumber = 1;
    this.views = [];
		this.render();

    var self = this;
    this.collection = new BeMe.Collections.BeerResults();
    this.addSpinner();
    Parse.User.current().fetch().then(function () {
      self.loadDraftBeers();
    });
	},

	template: _.template($('#backend-beer-view').text()),

	render: function () {
		this.$el.html(this.template(this.model));
		$('.body-container').append(this.el);
		BeMe.renderedViews.push(this);

		$('#backend-add-beer').click(function(){
			$('.beer-search').toggleClass('beer-search-shift');
			$('#backend-draft-tab').removeClass('active-beer-type');
			$('#backend-bottle-tab').removeClass('active-beer-type');
			$('.profile-beer-list').addClass('hidden');
		});
    $('#show-beer-tools').click(function(){
      $('.show-beer-cancel').addClass('beer-cancel-shift');
    });
    function resetSearchFunction() {
      $('.beer-search').removeClass('beer-search-shift');
      $('.profile-beer-list').removeClass('hidden');
    }

		$('#backend-draft-tab, #backend-bottle-tab').click(resetSearchFunction);

		$('#beer-submit').click(function(){
			$('.narrow-container').addClass('narrow-container-shift');
			$('.profile-beer-list').removeClass('hidden');
			$('.beer-results-cancel').addClass('show');
		});

    
	},

  events: {
    'submit .beer-search form' : 'searchBreweryDB',
    'click #backend-bottle-tab' : 'loadBottledBeers',
    'click #backend-draft-tab' : 'loadDraftBeers',
    'click .load-more-button' : 'loadMore'
  },

  routeBack: function () {
    BeMe.Router.navigate('backend/beer', true);
  },

  addSpinner: function () {
    $('.profile-beer-list').addClass('hidden');
    $('.beer-loading').removeClass('hidden');
  },

  removeSpinner: function () {
    $('.profile-beer-list').removeClass('hidden');
    $('.beer-loading').addClass('hidden');
  },

  emptyBeerList: function () {
    BeMe.removeGroup(this.views);
    $('.profile-beer-list ul').empty();
  },

  searchBreweryDB: function (e) {
    this.addSpinner();
    e.preventDefault();
    $("#backend-draft-tab, #backend-bottle-tab").removeClass('active-beer-type');
    var self = this;
    var queryString = $('.beer-search input').val();
    console.log(queryString);


    Parse.Cloud.run('searchBrewery', {queryString:queryString})
    .then(function (beers) {

      self.collection.remove();
      self.removeSpinner();
      self.collection.reset();

      self.emptyBeerList();
      $('.load-more-button').addClass('hidden');


      if (beers) {
        self.collection.add(beers);
        console.log(self.collection);

        self.collection.render();
      } else {
        //'no results found'
        var div = document.createElement("div");
        $(div).html('<h1>No results found</h1>');
        $('.profile-beer-list ul').append(div);
      }

      BeMe.Router.navigate('backend/beer/results');

    }, function (error) {
      BeMe.Router.navigate('backend/beer/results');
      alert('error');
      self.routeBack();
    });
  },

  loadDraftBeers:function () {
    this.addSpinner();
    this.pageNumber = 1;
    this.beerType = 'draftBeers';

    var self = this;
    $("#backend-bottle-tab").removeClass('active-beer-type');
    $("#backend-draft-tab").addClass('active-beer-type');

    var array = this.getIdArray(Parse.User.current().get('draftBeers'),1);
    if (array.length === 0) {
      this.emptyBeerList();
      this.removeSpinner();
      $('.profile-beer-list ul').append('<h1> No beers in list</h1>');
      return;
    };

    Parse.Cloud.run('getBeers', {array:array})
    .then(function (e) {
      self.emptyBeerList();
      self.removeSpinner();
      _.each(e, function (i) {
        var newView = new BeMe.Views.BackendBeer({model:i,type:'draftBeers'});
        self.views.push(newView);
      });
    });
  },

  loadBottledBeers: function () {
    this.addSpinner();
    this.pageNumber = 1;
    this.beerType = 'bottledBeers';

    var self = this;
    $("#backend-draft-tab").removeClass('active-beer-type');
    $("#backend-bottle-tab").addClass('active-beer-type');

    var array = this.getIdArray(Parse.User.current().get('bottledBeers'),1);
      if (array.length === 0) {
        this.emptyBeerList();
        this.removeSpinner();
        $('.profile-beer-list ul').append('<h1> No beers in list</h1>');
      return;
    };

    Parse.Cloud.run('getBeers', {array:array})
    .then(function (e) {
      self.emptyBeerList();
      self.removeSpinner();
      _.each(e, function (i) {
        var newView = new BeMe.Views.BackendBeer({model:i, type:'bottledBeers'});
        self.views.push(newView);
      });
    });
  },

  getIdArray: function (list, pageNumber) {
    //note the numbers passed around in these small calculations are effectively
    //the *index* number in the `list` array
    list = list || [];
    var max = list.length - (10 * (pageNumber - 1) + 1);
    var min = max - 9;
    var realMin = min >= 0 ? min : 0;

    if (min <= 0) { //if we hit the end of the results...
      $('.load-more-button').addClass('hidden'); //hide it
    } else {
      $('.load-more-button').removeClass('hidden'); //show it
    }
    //we are iterating in reverse order to make the ones added to the list most
    //recent appear first without having to store extra data in the array (addedAt date, etc...)
    var arrayOfIds = [];
    for(var i = max; i >= realMin; i--) {
      arrayOfIds.push(list[i]);
    }
    return arrayOfIds;
  },

  loadMore: function () {
    this.pageNumber++; //should increment AND store the value
    console.log(this);
    var pageNumber = this.pageNumber;
    var beerType = this.beerType;

    console.log(pageNumber);
    console.log(beerType);

    var self = this;

    Parse.Cloud.run('getBeers', {array:this.getIdArray(Parse.User.current().get(beerType),pageNumber)})
    .then(function (e) {
      self.removeSpinner();
      _.each(e, function (i) {
        var newView = new BeMe.Views.BackendBeer({model:i, type:'bottledBeers'});
        self.views.push(newView);
      });
    }, function (e) {
      alert(error);
    });

  }
});

BeMe.Views.BackendBeer = Parse.View.extend({
  tagName: 'li',

  initialize: function () {
    this.render();
  },

  template: _.template($('#backend-beer-list-view').text()),

  render: function () {
    this.$el.html(this.template(this.model));
    $('.profile-beer-list ul').append(this.el);
  },

  events: {
    'click #delete-beer' : 'removeFromList'
  },

  removeFromList: function () {
    var user = Parse.User.current();
    var list = this.options.type;
    var listToRemoveFrom = user.get(list);

    console.log(listToRemoveFrom);
    var self = this;

    var newList = _.reject(listToRemoveFrom, function (i) {
      return i === self.model.id;
    });

    console.log(newList);
    user.set(list, newList);
    user.save();
    this.remove();
  }
});

BeMe.Collections.BeerResults = Parse.Collection.extend({
  initialize: function () {
    this.views = [];
  },

  render: function () {
    var self = this;
    this.remove();
    this.views = [];
    this.each(function (i) {
      var view = new BeMe.Views.BeerResult({model:i, collection:self});
      self.views.push(view);
    });
  },

  remove: function () {
    BeMe.removeGroup(this.views);
  }
});

BeMe.Views.BeerResult = Parse.View.extend({
  tagName: 'li',

  initialize: function () {
    this.render();
  },

  template: _.template($('#backend-beer-result').text()),

  render: function () {
    this.$el.html(this.template(this.model));
    $('.profile-beer-list ul').append(this.el);

    $('#choose-beer-type').click(function(){
      $('.beer-type').removeClass('hidden');
    });
  },

  events: {
    'click #draft-select': 'addToDraft',
    'click #bottle-select': 'addToBottled'
  },

  addToDraft: function () {
    var id = this.model.id;
    var user = Parse.User.current();

    user.addUnique('draftBeers', id);
    user.save();

    this.routeBackToList();
  },

  addToBottled: function () {
    var id = this.model.id;
    var user = Parse.User.current();

    user.addUnique('bottledBeers', id);
    user.save();

    this.routeBackToList();
  },

  routeBackToList: function () {
    BeMe.Router.navigate('backend/beer', true);
  }
});
BeMe.Views.BackendCalendar = Parse.View.extend({
	initialize: function () {
		this.render();
    BeMe.Calendar.DaysView = new BeMe.Views.DaysView({collection:new BeMe.Collections.WeeklyComments(), user:Parse.User.current()});
	},

	template: _.template($('#backend-calendar-view').text()),

	render: function () {
		this.$el.html(this.template(this.model));
		$('.body-container').append(this.el);
    $('.datepicker').pickadate(); //initialize
    $('.datepicker').val(new moment().format('D MMMM, YYYY')); //set the default value to today
		BeMe.renderedViews.push(this);
	},

  events: {
    'submit form' : 'post'
  },

  post: function (e) {
    e.preventDefault();
    BeMe.Calendar.DaysView.postWeeklyComment(); //calls method on child view
  }

});

BeMe.Views.DaysView = Parse.View.extend({
  initialize: function () {
    this.dayViews = [];
    this.activeViewIndex = 0;
    this.query(this.options.user);
  },

  render: function () {
    BeMe.removeGroup(this.dayViews);
    this.dayViews = [];
		for (var i = 0; i < 7; i++) {
			var dateObject = new moment();
			dateObject.add(i, 'days');

			var dayUpperBound = new moment();
			dayUpperBound.add(i, 'days');
			dayUpperBound = dayUpperBound.endOf('day');

			var dayLowerBound = new moment();
			dayLowerBound.add(i, 'days');
			dayLowerBound = dayLowerBound.startOf('day');

			var queryResults = this.collection;
			var matchingObjects = queryResults.filter(function (i) {
				if (i.get('date') !== undefined) {
					var dateOfComment = moment(i.get('date'));
				} else {
					/* This function coerces the standing comment's dayOfWeek value into
					a usable date. If we coerce it to a day of the week, and that coerced
					day is in the past, we just add a week to put it in the current week */
					var dateOfComment = new moment();
					dateOfComment.day(i.get('dayOfWeek'));
					if (dateOfComment.isBefore(new Date(),'day')) {
						dateOfComment.add(7,'days');
					}
				}

				return dateOfComment.isBetween(dayLowerBound,dayUpperBound)
			});


			if (matchingObjects.length > 0) {
				var newObject = new Parse.Object({date: dateObject, models: matchingObjects})
				var newView = new BeMe.Views.DayView({model:newObject});
			} else {
				var newObject = new Parse.Object({date: dateObject});
				var newView = new BeMe.Views.DayView({model:newObject});
			}
			this.dayViews.push(newView);
		}
    this.dayViews[this.activeViewIndex].displayComments();
  },

  postWeeklyComment: function () {
    var self = this;

    var content = $('input[name="content"]').val(),
           dayOfWeek = Number($('select').val()),
           isChecked = $('input:radio')[0].checked,
           anyChecked = !!$('input:radio:checked').length,
           date = new moment($('input[name="date"]').val(),"D MMMM, YYYY");
           date.add(12,'hours');

    var post = new Parse.Object('weeklyComment', {
      createdBy: Parse.User.current(),
      content:content,
    });

    if (isChecked) {
      post.set('date', date._d);
    } else {
      post.set('dayOfWeek', dayOfWeek);
    }

    if (!content) {
      alert("You must write a comment");
    } else if(date.isBefore(moment(new Date()),'day')) {
      alert("You cannot post a past date");
    } else if (!anyChecked) {
      alert("You must choose one of the date options");
    } else {
     //if the set date is not before today
      post.save(null, {
        success: function (postObject) {
          $('input[name="content"]').val('');
          $('input[type="date"]').val(null);
          $('.datepicker').datepicker('refresh');
          $('select').val(0);
          $('input:radio').attr('checked', false);


          self.collection.add(postObject);
          self.render();
        },
        error: function (e,err) {alert(err.message)}
      });
    }

  },

  query: function (user) {

		var timeBasedQuery = new Parse.Query("weeklyComment");
		var beginningOfDay = new moment();
		beginningOfDay.startOf('day');
		timeBasedQuery.greaterThanOrEqualTo('date', beginningOfDay._d);

		var endOfLastDay = new moment();
		endOfLastDay.add(7, 'days');
		endOfLastDay.endOf('day');
		timeBasedQuery.lessThanOrEqualTo('date', endOfLastDay._d);

		var standingCommentQuery = new Parse.Query("weeklyComment");
		standingCommentQuery.exists('dayOfWeek');

    timeBasedQuery.equalTo('createdBy', user);
    standingCommentQuery.equalTo('createdBy', user);

		var query = Parse.Query.or(timeBasedQuery, standingCommentQuery);

		var self = this;
		query.find().then(function (e) {
      console.log("---- WeeklyComments returned from the server below ----");
			console.log(e);
      console.log("-------------------------------------------------------");
      self.collection.add(e);
			self.render();
		});
	},
});

BeMe.Views.DayView = Parse.View.extend({
	tagName: 'li',

	initialize: function () {
		this.render();
		this.commentViews = [];
	},

	template: _.template($('#backend-day-view').text()),

	render: function () {
		this.$el.html(this.template(this.model));
		$('.seven-day-nav ul').append(this.el);
		BeMe.renderedViews.push(this);
	},

	events: {
		'click' : 'clickHandler'
	},

  clickHandler: function () {
    var $ul = $('.seven-day-nav ul li');
    var index = _.indexOf($ul, this.el);

    BeMe.Calendar.DaysView.activeViewIndex = index;

    this.displayComments();
  },

	displayComments: function () {
		this.$el.siblings().removeClass('active-day');
		this.$el.addClass('active-day');

		var self = this;


		var calendarDaily = $('.calendar-daily');
    $('.calendar-standing').empty();
		calendarDaily.empty();

		BeMe.removeGroup(this.commentViews);

		if (this.model.get('models')) {
			_.each(this.model.get('models'), function (i) {
				self.commentViews.push(new BeMe.Views.CommentDisplay({model:i}));
			});
		} else {
			calendarDaily.append("<p>There are no comments to display for today!</p>");
		}
	}
});

BeMe.Views.CommentDisplay = Parse.View.extend({
	tagName:'li',

	initialize: function () {
		this.render();
	},

	template: _.template($('#comment-view').text()),

	render: function () {
		this.$el.html(this.template(this.model));
	    if (typeof this.model.get('dayOfWeek') !== 'undefined') {
	      $('.calendar-standing').append(this.el);
	    } else {
		    $('.calendar-daily').append(this.el);
	    }
		BeMe.renderedViews.push(this);
	},

  events: {
    'click .delete-comment' : 'deleteComment'
  },

  deleteComment: function () {
    this.model.destroy();
    BeMe.Calendar.DaysView.render();
  }
})

BeMe.Collections.WeeklyComments = Parse.Collection.extend({
  className: "weeklyComment",

  initialize: function () {
    console.log("New weekly comments collection");
  },
});
BeMe.Views.BackendCompetition = Parse.View.extend({
	initialize: function () {
		this.render();
	},

	template: _.template($('#backend-competition-view').text()),

	render: function () {
		this.$el.html(this.template(this.model));
		$('.body-container').append(this.el);
		BeMe.renderedViews.push(this);
	}
});
BeMe.Views.BackendFeed = Parse.View.extend({
	initialize: function () {
		this.render();
		autosize($('#business-status'));
    this.collectionReference = new BeMe.Collections.Feeds();
	},

	template: _.template($('#backend-feed-view').text()),

	render: function () {
		this.$el.html(this.template(this.model));
		$('.body-container').append(this.el);
		BeMe.renderedViews.push(this);

		$('#backend-add-status').click(function(){
			$('.profile-tools').toggleClass('profile-tools-shift');
      $('#backend-myfeed-tab').removeClass('active-feed-type');
      $('#backend-mainfeed-tab').removeClass('active-feed-type');
      $('.bar-feed').addClass('hidden');
		});

    $('#backend-myfeed-tab').click(function(){
      $('.bar-feed').removeClass('hidden');
      $('#backend-myfeed-tab').addClass('active-feed-type');
      $('.profile-tools').toggleClass('profile-tools-shift');

    });

    $('#standalone').popup({
      color: '#dfdfdf',
      opacity: 1,
      transition: '0.3s',
      scrolllock: true,
      autozindex: true
    });
	},

	events: {
		'submit form': 'postStatus',
	},

	postStatus: function (e) {
		e.preventDefault();
    var self = this;
    var $fileContainer = $("#camera-file");
    var contentHolder = $("#business-status");

    var fileIsChosen = !!$fileContainer[0].files.length;

    if (fileIsChosen) { //if there is a file chosen
      var image = BeMe.createImageFile($fileContainer); //create the image file
      if(image == undefined) {
        return false;
      }
    }

    //conditional where we check to see if there was a file chosen && it was processed correctly

    var user = Parse.User.current();

		var content = contentHolder.val();
		var status = new Parse.Object('status');
		status.set('content', content);
		status.set('image', image);
		status.set('createdBy', user);
    status.set('location', user.get('location'));
    status.set('statusType', 'Text');
		status.save().then(function (e){
			contentHolder.val('');
			$('#camera-file').val('');
      console.log(e);
      self.collectionReference.add(e, {at:0});
		});
	}
});

BeMe.Collections.Feeds = Parse.Collection.extend({
  initialize: function () {
    var self = this;
    this.views = [];
    this.on('add remove', this.render);
    this.fetch(this.query).then(function (e) {
      console.log(e);
      self.render();
    });
  },

  query: new Parse.Query('status')
        .equalTo('createdBy', Parse.User.current())
        .include('createdBy')
        .descending('createdAt'),

  render: function () {
    var self = this;
    BeMe.removeGroup(this.views);
    this.each(function (i) {
      var feedPost = new BeMe.Views.Status({model:i, container: '.bar-feed'});
      self.views.push(feedPost);
    });
  }
});

BeMe.Views.BackendSettings = Parse.View.extend({
	initialize: function () {
		this.render();
		$('#backend-settings [data-accordion]').accordion();

	},

	template: _.template($('#backend-settings-view').text()),

	render: function () {
    var self = this;
    var user = Parse.User.current();
    user.fetch().then(function (i) {
      console.log(i);
      self.$el.html(self.template(i));
      $('.body-container').append(self.el);
      $('option[value=' + user.get("state") + ']').attr('selected', true);
    });
		
		BeMe.renderedViews.push(this);
	},

  events: {
    'click #avatar-upload' : 'uploadAvatar',
    'click #cover-upload' : 'uploadCover',
    'click .save-button' : 'updateProfile'
  },

  updateProfile: function (e) {
    e.preventDefault();
    var user = Parse.User.current();

    var businessName = $('input[type="business-name"]').val();
    var handle = $('input[name="handle"]').val();
    var city = $('input[name="city"]').val();
    var state = $('select[name="state"]').val();
    var zip = $('input[name="zip"]').val();
    var phoneNumber = $('input[name="phone-number"]').val();
    var website = $('input[name="website"]').val();

    user.set('businessName', businessName);
    user.set('handle', handle);
    user.set('City',city);
    user.set('state',state);
    user.set('zip',zip);
    user.set('phoneNumber',phoneNumber);
    user.set('website',website);

    user.save().then(function() {
      alert('Saved!');
    });
  },

  uploadAvatar: function () {
    var image = BeMe.createImageFile($('input[name="avatar"]'));

    var user = Parse.User.current();

    user.set('avatar', image);
    //save and sync
    user.save().then(function () {
      user.fetch();
      var div = document.createElement('div');
      div.className = 'upload-confirm';
      $(div).html('<i class=“fa fa-check-circle”></i>');

      $('.settings-sublist form').append(div);

      _.delay(function () {
        $(div).fadeOut();
        div.remove();
      }, 4000);
    });
  },

  uploadCover: function () {
    var image = BeMe.createImageFile($('input[name="cover"]'));

    var user = Parse.User.current();

    user.set('coverPhoto', image);
    //save and sync
    user.save().then(function () {
      user.fetch();
      var div = document.createElement('div');
      div.className = 'upload-confirm';
      $(div).html('<i class=“fa fa-check-circle”></i>');

      $('.settings-sublist form').append(div);

      _.delay(function () {
        $(div).fadeOut();
        div.remove();
      }, 4000);
    });
  },
});

BeMe.Views.Backend = Parse.View.extend({
	initialize: function () {
		this.render();
	},

	template: _.template($('#backend-view').text()),

	render: function () {
		this.$el.html(this.template(this.model));
		$('.body-container').append(this.el);
		BeMe.renderedViews.push(this);

    $('#slideout-trigger').click(function(){
      $('.backend-slideout').toggleClass('show');
    });

    $('.business-tabs-expand').click(function(){
      $('.business-tabs-container').toggleClass('business-tabs-container-expand');
    });

    $('#location-trigger').click(function(){
      $('.update-location').toggleClass('update-location-shift');
      $('.update-location-info').toggleClass('left-100');

    });

	},

  events: {
    'submit form[name="bar-search"]' : 'search'
  },

  search: function (e) {
    e.preventDefault();
    var searchString = $('input').val();
    BeMe.searchBars(searchString);
  }
});
BeMe.Views.BarSearch = Parse.View.extend({
  initialize: function () {
    this.render();
  },

  template: _.template($('#bar-search-view').text()),

  render: function () {
    this.$el.html(this.template(this.options));
    $('.body-container').append(this.el);
    BeMe.renderedViews.push(this);
  },

  events: {
    'submit form' : 'search',
    'click .search-tabs li' : 'tabClickHandler'
  },

  tabClickHandler: function (e) {
    var $clickedElement = $(e.currentTarget);

    var matchObject = {Bars:"business", Friends:"consumer"};
    var type = matchObject[$clickedElement.text()];

    BeMe.Search.BarSearchResults.displayType(type);
  },

  search: function (e) {
    e.preventDefault();
    var searchString = $('input').val();
    BeMe.searchUsers(searchString);
  }
});

BeMe.Views.BarSearchResults = Parse.View.extend({
  initialize: function () {
    this.subViews = [];
    this.following = [];
    this.start();
  },

  start: function () {
    var self = this;
    Parse.User.current().relation('barsFollowing').query().find().then(function (users) {
      self.following = users;
      self.render();
    });
  },

  render: function () {
    BeMe.removeGroup(this.subViews);
    var self = this;
    if(this.collection.length === 0) {
      alert('No results found');
    } else {
      this.showAll();
    }
  },

  showAll: function () {
    BeMe.removeGroup(this.subViews);
    var self = this;

    this.collection.each(function (user) {
      var followingStatus = false;
      if (self.following.some(function(userFollowing) {return user.id === userFollowing.id})) {
        var followingStatus = true;
      }
      self.subViews.push(new BeMe.Views.BarSearchResult({model:user, following:followingStatus}));
    });
  },

  displayType: function (type) {
    var self = this;

    var $tabs = $('.search-tabs li');
    var barsTab = $tabs[0];
    var peopleTab = $tabs[1];

    var clickedTab;

    if(type === 'business') {
      clickedTab = barsTab;
    } else {
      clickedTab = peopleTab;
    }

    $tabs.removeClass('active-tab');
    $(clickedTab).addClass('active-tab');

    var usersToRender = this.collection.filter(function (bar) {
      return bar.get('userType') === type;
    });

    BeMe.removeGroup(this.subViews);

    _.each(usersToRender, function(user) {
      var followingStatus = false;
      if (self.following.some(function(userFollowing) {return user.id === userFollowing.id})) {
        var followingStatus = true;
      }

      self.subViews.push(new BeMe.Views.BarSearchResult({model:user, following:followingStatus}));
    });
  }
});

BeMe.Views.BarSearchResult = Parse.View.extend({
  tagName: 'li', 

  initialize: function () {
    this.render();
    if (this.options.following) {
      this.isFollowingUIUpdate();
    }
  },

  template: _.template($('#bar-search-results-view').text()),

  render: function () {
    this.$el.html(this.template(this.model));
    $('.bar-search-container').append(this.el);
    BeMe.renderedViews.push(this);
  },

  events: {
    'click .follow' : 'follow',
    'click .unfollow' : 'unfollow'
  },

  follow: function () {
    BeMe.FollowUser(this.model);
    this.isFollowingUIUpdate();
  },

  unfollow: function () {
    BeMe.UnfollowUser(this.model);
    this.isNotFollowingUIUpdate();
  },

  isFollowingUIUpdate: function () {
    var $followButton = this.$el.find('.follow');
    $followButton.css('color', 'rgba(1, 87, 155, 0.38)');
    $followButton.text('Following');
    $followButton[0].className = 'unfollow';
  },

  isNotFollowingUIUpdate: function () {
    var $followButton = this.$el.find('.unfollow');
    $followButton.css('color', 'rgba(1, 87, 155, 1)');
    $followButton.text('Follow');
    $followButton[0].className = 'follow';
  }

});
BeMe.Views.BusinessBeerList = Parse.View.extend({
  initialize: function () {
    this.beerType = null;
    this.pageNumber = 1;
    this.views = [];
    this.render();


    this.collection = new BeMe.Collections.BeerResults();
    this.loadDraftBeers();
    this.addSpinner();
    //added comment for test
  },

  template: _.template($('#business-beer-view').text()),

  render: function () {
    this.$el.html(this.template(this.model));
    $('.body-container').append(this.el);
    BeMe.renderedViews.push(this);
  },

  events: {
    'click #backend-bottle-tab' : 'loadBottledBeers',
    'click #backend-draft-tab' : 'loadDraftBeers',
    'click .tabs-loading' : 'addSpinner',
    'click .load-more-button' : 'loadMore'
  },

  routeBack: function () {
    BeMe.Router.navigate('backend/beer', true);
  },

  addSpinner: function () {
    $('.profile-beer-list').addClass('hidden');
    $('.beer-loading').removeClass('hidden')
  },

  removeSpinner: function () {
    $('.profile-beer-list').removeClass('hidden')
    $('.beer-loading').addClass('hidden');
  },

  emptyBeerList: function () {
    BeMe.removeGroup(this.views);
  },

  loadDraftBeers:function () {
    this.pageNumber = 1;
    this.beerType = 'draftBeers';

    var self = this;
    $("#backend-bottle-tab").removeClass('active-beer-type');
    $("#backend-draft-tab").addClass('active-beer-type');
    //Parse.User.fetch().then do what's below?
    Parse.Cloud.run('getBeers', {array:this.getIdArray(self.model.get('draftBeers'),1)})
    .then(function (e) {
      self.emptyBeerList();
      self.removeSpinner();
      _.each(e, function (i) {
        var newView = new BeMe.Views.BackendBeer({model:i,type:'draftBeers'});
        self.views.push(newView);
      });
    });
  },

  loadBottledBeers: function () {
    this.pageNumber = 1;
    this.beerType = 'bottledBeers';

    var self = this;
    $("#backend-draft-tab").removeClass('active-beer-type');
    $("#backend-bottle-tab").addClass('active-beer-type');
    //Parse.User.fetch().then do what's below?
    Parse.Cloud.run('getBeers', {array:this.getIdArray(self.model.get('bottledBeers'),1)})
    .then(function (e) {
      self.emptyBeerList();
      self.removeSpinner();
      _.each(e, function (i) {
        var newView = new BeMe.Views.BackendBeer({model:i, type:'bottledBeers'});
        self.views.push(newView);
      });
    });
  },

  getIdArray: function (list, pageNumber) {
    //note the numbers passed around in these small calculations are effectively
    //the *index* number in the `list` array
    var max = list.length - (10 * (pageNumber - 1) + 1);
    var min = max - 9;
    var realMin = min >= 0 ? min : 0;

    if (min <= 0) { //if we hit the end of the results...
      $('.load-more-button').addClass('hidden'); //hide it
    } else {
      $('.load-more-button').removeClass('hidden'); //show it
    }
    //we are iterating in reverse order to make the ones added to the list most
    //recent appear first without having to store extra data in the array (addedAt date, etc...)
    var arrayOfIds = [];
    for (var i = max; i >= realMin; i--) {
      arrayOfIds.push(list[i]);
    }
    console.log("Id's in array that are going to hit the BreweryDB API");
    console.log(arrayOfIds);
    return arrayOfIds;
  },

  loadMore: function () {
    this.pageNumber++; //should increment AND store the value
    console.log(this);
    var pageNumber = this.pageNumber;
    var beerType = this.beerType;

    console.log(pageNumber);
    console.log(beerType);

    var self = this;

    Parse.Cloud.run('getBeers', {array:this.getIdArray(self.model.get(beerType),pageNumber)})
    .then(function (e) {
      self.removeSpinner();
      _.each(e, function (i) {
        var newView = new BeMe.Views.BackendBeer({model:i, type:'bottledBeers'});
        self.views.push(newView);
      });
    });
  }
});
BeMe.Views.BusinessCalendar = Parse.View.extend({
  initialize: function () {
    this.render();
    BeMe.Calendar.DaysView = new BeMe.Views.DaysView({collection:new BeMe.Collections.WeeklyComments(), user: this.model});
  },

  template: _.template($('#business-calendar-view').text()),

  render: function () {
    this.$el.html(this.template(this.model));
    $('.body-container').append(this.el);
    BeMe.renderedViews.push(this);
  }
})
BeMe.Views.BusinessError = Parse.View.extend({
  initialize: function () {
    this.render();
  },

  template: _.template($('#business-error-view').text()),

  render: function () {
    this.$el.html(this.template(this.model));
    $('.body-container').append(this.el);
    BeMe.renderedViews.push(this);
  }
});
BeMe.Views.BusinessFeed = Parse.View.extend({
  initialize: function () {
    this.render();
    this.pullFeed();
    this.feedItems = [];
  },

  template: _.template($('#business-feed-view').text()),

  render: function () {
    this.$el.html(this.template(this.model));
    $('.body-container').append(this.el);
    BeMe.renderedViews.push(this);
  },

  pullFeed: function () {
    var self = this;
    var query = new Parse.Query('status');
    query.equalTo('createdBy',this.model);
    query.include('createdBy');
    query.find().then(function (e) {
      self.feedCollection = new Parse.Collection(e);
      self.renderFeed();
    });
  },

  renderFeed: function () {
    var self = this;
    this.feedCollection.each(function (i) {
      var newFeedItem = new BeMe.Views.BusinessPostView({model:i});
      self.feedItems.push(newFeedItem);
    });
  },

  removeFeed: function () {
    BeMe.removeGroup(this.feedItems);
  }
});

BeMe.Views.BusinessPostView = Parse.View.extend({
  initialize: function () {
    this.render();
    this.likeCount;
    this.getLikes();
    this.doesUserLike();
  },

  template: function (model) {
    var statusType = model.get('statusType');

    if (statusType === 'Text') {
      return _.template($('#status-text-view').text())(model);
    } else if (statusType === 'Photo') {
      return _.template($('#status-photo-view').text())(model);
    } else if (statusType === 'Event') {
      return _.template($('#status-event-view').text())(model);
    } else if (statusType === 'Check In') {
      return _.template($('#status-checkin-view').text())(model);
    } else if (statusType === 'Beer') {
      return _.template($('#status-beer-view').text())(model);
    }
  },

  render: function ()  {
    this.$el.html(this.template(this.model));
    $('.bar-feed ul').append(this.el);
    BeMe.renderedViews.push(this);
  },

  events: {
    'click .follow' : 'follow',
    'click .unfollow': 'unfollow',
    'click .like-button, .dislike-button' : 'toggleLike',
    'click .check-in' : 'checkIn'
  },

  follow: function () {
    BeMe.FollowUser(this.model.get('createdBy'), this.updateFollowButtons);
  },

  unfollow: function () {
    var self = this;
    var currentUser = Parse.User.current();
    var relation = currentUser.relation('barsFollowing');
    var createdBy = this.model.get('createdBy');
    relation.remove(createdBy);
    currentUser.save({},{success: function () {
      self.updateFollowButtons();
    }, error: function () {
      alert('Error saving');
    }})
  },

  isFollowing: function () {
    // Changes the follow button to unfollow button
    var $followButton = this.$el.find('.follow');
    if($followButton.length) {
      $followButton.css('color', '#0277BD');
      $followButton.text('Following');
      $followButton[0].className = 'unfollow';
    }
  },

  isNotFollowing: function () {
    var $unfollowButton = this.$el.find('.unfollow');
    if ($unfollowButton.length) {
      $unfollowButton.css('color', '#ccc');
      // $unfollowButton.css('border', '1px solid #f0f0f0');


      $unfollowButton.text('Follow');
      $unfollowButton[0].className = 'follow';
    }
  },

  updateFollowButtons: function () {
    if (BeMe.Dashboard.FeedList) {
      BeMe.Dashboard.FeedList.updateFollowButtons();
    }
  },

  getLikes: function () {
    var self = this;
    this.model.relation('likedBy').query().count().then(function (count) {
      self.likeCount = count;
      self.$el.find('.likes').append(count);
    });
  },

  doesUserLike: function () {
    var self = this;
    var query = this.model.relation('likedBy').query();
    query.equalTo('objectId',Parse.User.current().id);
    query.first().then(function (i) {
      if(i) {
        //user does like
        var likeButton = self.$el.find('.like-button')[0];
        likeButton.className = 'dislike-button';
        likeButton.textContent = 'Liked';
      }
    })
  },

  toggleLike: function (e) {
    var user = Parse.User.current();
    var likedBy = this.model.relation('likedBy');
    var currentTarget = e.currentTarget;
    var currentTargetClass = currentTarget.className;
    var likeCount = this.$el.find('.likes');

    if (currentTargetClass == 'like-button') {
      this.likeCount += 1;
      //Update the UI
      currentTarget.className = 'dislike-button';
      currentTarget.textContent = 'Liked';
      likeCount.text(this.likeCount);
      // Add this user to the likedBy relation of this post and save
      likedBy.add(user);
      this.model.save();
    } else if (currentTargetClass == 'dislike-button') {
      this.likeCount -=1;
      //Update the UI
      currentTarget.className = 'like-button';
      currentTarget.textContent = 'Like';
      likeCount.text(this.likeCount);
      // Remove this user from the likeBy relation of this post and save
      likedBy.remove(user);
      this.model.save();
    }
  },

  checkIn: function () {
    BeMe.CheckIn(Parse.User.current(),this.model.get('createdBy'));
  }

});

BeMe.Views.BusinessHome = Parse.View.extend({
  initialize: function () {
    this.render();
    this.loadRecentPosts();
    this.loadRandomBeers();
    this.loadWeeklyComments();
  },

  template: _.template($('#business-home-view').text()),

  render:function () {
    this.$el.html(this.template(this.model));
    $('.body-container').append(this.el);
    BeMe.renderedViews.push(this);
  },

  loadRecentPosts: function () {
    var query = new Parse.Query('status');
    query.equalTo('createdBy', this.model);
    query.limit(5);
    query.include('createdBy');
    query.descending('createdAt');
    query.find().then(function (e) {
      console.log(e);
      _.each(e, function (i) {
        var collection = new Parse.Collection(i);
        new BeMe.Views.StatusListView({collection:collection,container:'.bar-feed'});
      });
    });
  },

  loadRandomBeers: function () {
    var draftBeers = this.model.get('draftBeers');

    if (draftBeers.length === 0) {
      console.log('No beers to display');
    } else if (draftBeers.length <= 5) {
      Parse.Cloud.run('getBeers', {array:draftBeers}).then(function (e) {
        _.each(e, function (i) {
          new BeMe.Views.BackendBeer({model:i});
        });
      });
    } else {
      var array = [];
      for (var i = 0; i < 5; i++) {
        var randomNum = _.random(0, draftBeers.length - 1);
        array.push(draftBeers.splice(randomNum, 1)[0]);
      }

      Parse.Cloud.run('getBeers', {array:array}).then(function (e) {
        console.log(e);
        _.each(e, function (i) {
          new BeMe.Views.BackendBeer({model:i});
        });
      });
    }
  },

  loadWeeklyComments: function () {
    var beginningOfToday = new moment();
    beginningOfToday.startOf('day');
    beginningOfToday = beginningOfToday.toDate();

    var endOfToday = new moment();
    endOfToday.endOf('day');
    endOfToday = endOfToday.toDate();


    var timeBasedQuery = new Parse.Query('weeklyComment');
    timeBasedQuery.equalTo('createdBy', this.model);
    timeBasedQuery.greaterThanOrEqualTo('date', beginningOfToday);
    timeBasedQuery.lessThanOrEqualTo('date', endOfToday);

    var standingCommentQuery = new Parse.Query('weeklyComment');
    var dayOfWeek = moment();
    dayOfWeek = dayOfWeek.day();
    standingCommentQuery.equalTo('dayOfWeek', dayOfWeek);
    standingCommentQuery.equalTo('createdBy', this.model);

    var query = Parse.Query.or(timeBasedQuery, standingCommentQuery);
    query.find().then(function (e) {
      console.log(e);
      _.each(e, function (i) {
        new BeMe.Views.CommentDisplay({model:i});
      });
    }, function (error) {
      console.log(error);
      alert(error.message);
    });
  }
});
BeMe.Views.Business = Parse.View.extend({
  initialize: function () {
    this.render();
  },

  template: _.template($('#business-view').text()),

  render: function () {
    this.$el.html(this.template(this.model));
    $('.body-container').append(this.el);
    BeMe.renderedViews.push(this);

    $('#slideout-trigger').click(function(){
      $('.backend-slideout').toggleClass('show');
    });

    $('#search-trigger').click(function(){
      $('.bar-search-wrap').toggleClass('bar-search-shift');
    });

    $('#location-trigger').click(function(){
      $('.update-location').toggleClass('update-location-shift');
      $('.update-location-info').toggleClass('left-100');
    });
  }
});
BeMe.Views.DashboardBaseView = Parse.View.extend({
  render: function () {
    new BeMe.Views.Dashboard(); // the dependency template for the dashboard views
    this.$el.html(this.template(this.model));
    $('.body-container').append(this.el);
    BeMe.renderedViews.push(this);
  }
});
BeMe.Views.DashboardFeed = BeMe.Views.DashboardBaseView.extend({
  initialize: function () {
    this.template = _.template($('#dashboard-feed-view').text())
    this.render();
    new BeMe.Views.DashboardFeedList();
  },
});

BeMe.Views.DashboardFeedList = Parse.View.extend({
  initialize: function () {
    this.collection = new Parse.Collection();
    this.views = [];
    this.pullNearStatuses();
    BeMe.Dashboard.FeedList = this;
  },

  pullNearStatuses: function () {
    var self = this;
    var user = Parse.User.current();

    var query = new Parse.Query('status');
    query.withinMiles('location', user.get('location') ,100);
    query.descending('createdAt');
    query.include('createdBy');
    query.containedIn('statusType', ['Text', 'Photo', 'Event']);
    query.limit(20);
    query.find().then(function (statuses) {
      console.log(statuses);
      self.collection.add(statuses);
      self.render();
    });
  },

  render: function () {
    new BeMe.Views.StatusListView({collection:this.collection, container:'.bar-feed'})
  },

  updateFollowButtons: function () {
    var self = this;
    console.log("updateFollowButtons is running");

    var user = Parse.User.current();
    user.relation('barsFollowing').query().find().then(function (barsFollowing) {
      var barsFollowingIds = barsFollowing.map(function (i) {return i.id});

      _.each(self.views, function (view) {
        if (barsFollowingIds.some(function (i) {return i === view.model.get('createdBy').id}) ) {
          view.isFollowing();
        } else {
          view.isNotFollowing();
        }
      });
    });
  }
  
});
BeMe.Views.Dashboardfollowing = BeMe.Views.DashboardBaseView.extend({
  initialize: function () {
    this.template = _.template($('#dashboard-following-view').text());
    this.render();
    new BeMe.Views.DashboardfollowingListing();
  }
});

BeMe.Views.DashboardfollowingListing = Parse.View.extend({
  initialize: function () {
    this.views = [];
    this.beginLoadingStatuses();
  },

  beginLoadingStatuses: function () {
    var self = this;
    Parse.User.current().relation('barsFollowing').query().find().then(function (barsFollowing) {
      self.barsFollowing = barsFollowing;
      self.loadProfileFeed();
    });
  },

  loadProfileFeed: function () {
    var self = this;

    var query = new Parse.Query('status');
    query.containedIn('createdBy', this.barsFollowing);
    query.containedIn('statusType', ['Text', 'Photo', 'Video', 'Event']);
    query.include('createdBy');
    query.descending('createdAt');

    query.find().then(function(statuses) {
      var collection = new Parse.Collection(statuses);
      new BeMe.Views.StatusListView({collection:collection, container:'.bar-feed'});
    });
  },

  loadFriendsFeed: function () {
    var self = this;

    var query = new Parse.Query('status');
    query.containedIn('createdBy', this.barsFollowing);
    query.containedIn('statusType', ['Check In', 'Beer']);
    query.include('createdBy');
    query.descending('createdAt');

    query.find().then(function(statuses) {
      console.log(statuses);
      var collection = new Parse.Collection(statuses);
      new BeMe.Views.StatusListView({collection:collection, container:'.friends-feed'});
    });
  }
});

BeMe.Views.IndividualDashboardfollowing = Parse.View.extend({
  initialize: function () {
    this.render();
  },

  template: _.template($('#individual-following-view').text()),

  render: function () {
    this.$el.html(this.template(this.model));
    $('.following-container').append(this.el);
  }
});
BeMe.Views.DashboardFriends = BeMe.Views.DashboardBaseView.extend({
	initialize: function () {
		this.template = _.template($('#dashboard-friends-view').text());
		this.render();
		this.usersFollowing = null;
		this.loadFollowers();
	},

	loadFollowers: function () {
		var self = this;
		var query = Parse.User.current().relation('barsFollowing').query();
		query.equalTo('userType', 'consumer');
		query.find().then(function (e) {
			self.usersFollowing = e;
			self.loadFriendsFeed();
		});
	},

	loadFriendsFeed: function () {
		var query = new Parse.Query('status');
		query.containedIn('createdBy', this.usersFollowing);
		query.include('createdBy');
		query.descending('createdAt');
		query.find().then(function (statuses) {
			console.log(statuses);
			var collection = new Parse.Collection(statuses);
			new BeMe.Views.StatusListView({collection:collection,container:'.friends-feed'});
		});
	}
});
BeMe.Views.DashboardHome = BeMe.Views.DashboardBaseView.extend({
  initialize: function () {
    this.template = _.template($('#dashboard-home-view').text());
    this.render();
    new BeMe.Views.DashboardFeedList();

    if (Parse.User.current().get('userType') == 'business') {
      this.loadFollowers();
    } else {
      this.loadFollowing();
    }
  },

  loadListings: function () {
    var user = Parse.User.current();

    var query = new Parse.Query('User');
    query.equalTo('userType', 'business');

    /* CHANGE TO user.get('maxDistance') WHENEVER WE GET THE SLIDER FOR SETTING maxDistance WORKING */
    query.withinMiles('location',user.get('location'), 100);
    query.limit(5);
    query.find().then(function (e) {
      console.log(e);
      _.each(e, function (i) {
        var newListingView = new BeMe.Views.DashboardIndividualListing({model:i});
      });
    }, function (error) {
      alert('Error. Check console for details');
      console.log(error);
    });
  },

  loadFollowers: function () {
    var query = new Parse.Query('User');
    query.equalTo('barsFollowing', Parse.User.current());
    query.count().then(function (followerCount) {
      $('.follow-number').text(followerCount);
      $('.follow-text').text('Followers');
    });
  },

  loadFollowing: function () {
    var query = Parse.User.current().relation('barsFollowing').query();
    query.count().then(function (followingCount) {
      $('.follow-number').text(followingCount);
      $('.follow-text').text('Following');
    })
  }
});
BeMe.Views.DashboardListing = BeMe.Views.DashboardBaseView.extend({
  initialize: function () {
    this.template = _.template($('#dashboard-listing-view').text());
    this.render();
    this.listingViews = [];
    this.loadListings();
  },

  loadListings: function () {
    var self = this;

    var user = Parse.User.current();

    var query = new Parse.Query('User');
    query.equalTo('userType', 'business');

    /* CHANGE TO user.get('maxDistance') WHENEVER WE GET THE SLIDER FOR SETTING maxDistance WORKING */
    query.withinMiles('location',user.get('location'), 100);
    query.find().then(function (e) {
      BeMe.removeGroup(this.listingViews);
      _.each(e, function (i) {
        var newListingView = new BeMe.Views.DashboardIndividualListing({model:i});
        console.log(i);
        self.listingViews.push(this);
      });
    }, function (error) {
      console.log(error);
    });
  },
});

BeMe.Views.DashboardIndividualListing = Parse.View.extend({
  tagName:'li',

  initialize: function () {
    this.render();
  },

  template: _.template($('#individual-listing-view').text()),

  render: function () {
    this.$el.html(this.template(this.model));
    $('.listing-container').append(this.el);
  }
});

BeMe.Views.DashboardMap = BeMe.Views.DashboardBaseView.extend({
  initialize: function () {
    this.template = _.template($('#dashboard-map-view').text());
    this.render();
    this.initializeMap();
    this.initializeBarMarkers();
    this.infoWindow = new google.maps.InfoWindow({
      content:null,
    });
  },

  initializeMap: function () {
    var self = this;
    var user = Parse.User.current();
    var userLocation = {lat: user.get('location')._latitude, lng: user.get('location')._longitude};
    
    // Using this.map gives a reference to the map for the entire view
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: userLocation,
      zoom:14
    });

    var marker = new google.maps.Marker({
      position: userLocation,
      map: this.map,
      title: "You are here"
    });

    marker.addListener('click', function () {
      var infoWindow = self.infoWindow;
      infoWindow.setPosition(userLocation);
      infoWindow.setContent('You are here');
      infoWindow.open(self.map);
    });
  },

  initializeBarMarkers: function () {
    var self = this;
    var user = Parse.User.current();

    var query = new Parse.Query('User');
    //CHANGE THE DISTANCE TO user.get('maxDistance') AFTER WE GET THE SLIDER WORKING
    query.withinMiles("location", user.get('location'), 100);
    query.equalTo('userType', 'business');
    if (user.get('userType') == 'business') {
      query.notEqualTo('businessName', user.get('businessName'));
    }
    query.find().then(function (bars) {

      _.each(bars, function (i) {
        var userLocation = i.get('location');
        var position = {lat: userLocation._latitude, lng: userLocation._longitude};

        var marker = new google.maps.Marker({
          position:position,
          map: self.map,
          title: i.get('businessName'),
        });

        marker.addListener('click', function (markerObject) {
          var infoWindow = self.infoWindow;

          infoWindow.setPosition(position);
          var contentTemplate = _.template($("#map-popout-view").text());
          var renderedContent = contentTemplate(i);
          infoWindow.setContent(renderedContent);
          infoWindow.open(self.map);
        });

      });

    });
  }
});
BeMe.Views.Dashboard = Parse.View.extend({
  initialize: function () {
    this.render();
  },

  template: _.template($('#dashboard-view').text()),

  render: function () {
    var self = this;
    this.$el.html(this.template(this.model));
    $('.body-container').append(this.el);
    BeMe.renderedViews.push(this);

    $('.update-location').click(function(){
      $('.update-location').toggleClass('update-location-shift');
      $('.update-location-info').toggleClass('left-100');
      $('.arrow').toggleClass('rotate-arrow');

    });

    $('#location-trigger').click(function(){
      $('.update-location').toggleClass('update-location-shift');
      $('.update-location-info').toggleClass('left-100');
      $('.arrow').toggleClass('rotate-arrow');

    });

    $('.open-listing-container').click(function(){
      $('.listing-container').toggleClass('top0');
    });

    $('#left-column-trigger').click(function(){
      $('.left-column').toggleClass('left-column-shift');
      $('.middle-column').toggleClass('middle-column-shift');

    });

    $('header form[name="bar-search"').submit(function(e) {
      self.userSearch(e);
    });

    $(function() {

      var ddAlt = new DropDown( $('#ddAlt') );

      $(document).click(function() {
        // all dropdowns
        $('.wrapper-dropdown-1').removeClass('active');
      });

    });

    function DropDown(el) {
        this.ddAlt = el;
        this.initEvents();
    }
    DropDown.prototype = {
        initEvents : function() {
            var obj = this;

            obj.ddAlt.on('click', function(event){
                $(this).toggleClass('active');
                event.stopPropagation();
            }); 
        }
    }
  },

  events: {
    'click .update-location' : 'updateLocationInfo',
    'submit form[name="bar-search"]' : 'userSearch',
  },

  updateLocationInfo: function () {
    BeMe.setCurrentLocation();
  },

  userSearch: function (e) {
    e.preventDefault();
    var form = e.currentTarget;
    var searchString = $(form).find('input').val();
    BeMe.searchUsers(searchString);
  }
});
BeMe.Views.Index = Parse.View.extend({
	initialize: function () {
		this.render();
	},

	template: _.template($('#index-route').text()),

	render:function () {
		this.$el.html(this.template(this.model));
		$('#application').append(this.el);
		BeMe.renderedViews.push(this);
	},

	events: {
		'submit' : 'login'
	},

	login: function (e) {
		e.preventDefault();

		var email = $('input[name="email"]').val();
		var password = $('input[name="password"]').val();
		var stayLoggedIn = $('input[type="checkbox"]')[0].checked;
    var self = this;

		Parse.User.logIn(email,password, {
			success: function  (userObject) {
        BeMe.ApplicationView.render();
        if (userObject.get('userType') == 'consumer') {
          BeMe.Router.navigate('dashboard', true);
        } else {
          BeMe.Router.navigate('backend/feed', true);
        }
			},
			error: function (error) {
				console.log(error);
			}
		});
	}
});
BeMe.Views.Location = Parse.View.extend({
  initialize: function () {
    this.render();
  },

  template: _.template($('#location-view').text()),

  render: function () {
    this.$el.html(this.template(this.model));
    $('.body-container').append(this.el);
    BeMe.renderedViews.push(this);
  },

  events: {
    'click .location-button' : 'setCurrentLocation'
  },

  setCurrentLocation: function () {
    BeMe.setCurrentLocation(true);
  },
});
BeMe.Views.BusinessRegister = Parse.View.extend({
	initialize: function () {
		this.render();
	},

	template: _.template($('#business-register-route').text()),

	render: function () {
		this.$el.html(this.template(this.model));
		$('#application').append(this.el);
		BeMe.renderedViews.push(this);
	},

	events: {
		'submit' : 'register'
	},

	register: function (e) {
		e.preventDefault();

    var email = $('input[name="email"]').val(),
     password = $('input[name="password"]').val(),
     confirmPassword = $('input[name="confirm-password"]').val(),
     businessName = $('input[name="business-name"]').val(),
     firstName = $('input[name="first-name"]').val(),
     lastName = $('input[name="last-name"]').val();


    if (password == confirmPassword) {
      Parse.User.signUp(email, password, {
        businessName: businessName,
        firstName: firstName,
        lastName: lastName,
        userType:"business"
      }, {
        success: function (e) {
          BeMe.Router.navigate('location', true);
        }, error: function (obj, error) {
          alert("Error " + error.code + ": " + error.message);
        }
      });
    } else {
      alert('Passwords don\'t match');
    }
	}
});

BeMe.Views.ConsumerRegister = Parse.View.extend({
	initialize: function () {
		this.render();
	},

	template: _.template($('#consumer-register-route').text()),

	render: function () {
		this.$el.html(this.template(this.model));
		$('#application').append(this.el);
		BeMe.renderedViews.push(this);
	},

	events: {
		'submit' : 'register'
	},

	register: function (e) {
		e.preventDefault();

    var email = $('input[name="email"]').val(),
     password = $('input[name="password"]').val(),
     confirmPassword = $('input[name="confirm-password"]').val(),
     firstName = $('input[name="first-name"]').val(),
     lastName = $('input[name="last-name"]').val();

     console.log(email, password, confirmPassword, firstName, lastName);


    if(password == confirmPassword) {
      Parse.User.signUp(email, password, {
        firstName: firstName,
        lastName: lastName,
        userType:"consumer"
      }, {
        success: function (e) {
          BeMe.Router.navigate('location', true);
        }, error: function (obj, error) {
          alert("Error " + error.code + ": " + error.message);
        }
      });
    } else {
      alert('Passwords don\'t match');
    }
	}
});
//accepts a collection of status models and a container
//renders them 

BeMe.Views.StatusListView = Parse.View.extend({
	initialize: function () {
		this.views = [];
		this.render(this.options.container);
		this.initializeFollowButtons();
		this.barsFollowingIds;
	},

	render: function (container) {
		var self = this;
		BeMe.removeGroup(this.views);
		this.collection.each(function (status) {
			var statusView = new BeMe.Views.Status({model:status,container:container});
			self.views.push(statusView);
			statusView.on('follow', self.follow, self);
			statusView.on('unfollow', self.unfollow, self);
		});
	},

	follow: function (e) {
		BeMe.FollowUser(e);
		this.followUsers(e);
	},

	unfollow: function (e) {
		BeMe.UnfollowUser(e);
		this.unfollowUsers(e);
	},

	initializeFollowButtons: function () {
    var self = this;

    var user = Parse.User.current();
    user.relation('barsFollowing').query().find().then(function (barsFollowing) {
      self.barsFollowingIds = barsFollowing.map(function (i) {return i.id});

      _.each(self.views, function (view) {
        if (self.barsFollowingIds.some(function (i) {return i === view.model.get('createdBy').id}) ) {
          view.isFollowing();
        } else {
          view.isNotFollowing();
        }
      });
    });
  },

  unfollowUsers: function (user) {
  	_.each(this.views, function (view) {
  		if( view.model.get('createdBy').id === user.id) {
  			view.isNotFollowing();
  		}
  	});
  },

  followUsers: function (user) {
  	_.each(this.views, function (view) {
  		if( view.model.get('createdBy').id === user.id) {
  			view.isFollowing();
  		}
  	});
  },



});
BeMe.Views.Status = Parse.View.extend({
	initialize: function () {
		this.render();
		this.likeCount;
	    this.getLikes();
	    this.doesUserLike();
	    this.isFollowingStatus;
	},

	template: function (model) {
	    var statusType = model.get('statusType');

	    if (statusType === 'Text') {
	      return _.template($('#status-text-view').text())(model);
	    } else if (statusType === 'Photo') {
	      return _.template($('#status-photo-view').text())(model);
	    } else if (statusType === 'Event') {
	      return _.template($('#status-event-view').text())(model);
	    } else if (statusType === 'Check In') {
	      return _.template($('#status-checkin-view').text())(model);
	    } else if (statusType === 'Beer') {
	      return _.template($('#status-beer-view').text())(model);
	    }
	},

	render: function () {
		this.$el.html(this.template(this.model));
		$(this.options.container).append(this.el);
		BeMe.renderedViews.push(this); 
	},

	events: {
    'click .follow' : 'follow',
    'click .unfollow': 'unfollow',
    'click .like-button, .dislike-button' : 'toggleLike',
    'click .check-in' : 'checkIn'
	},

	follow: function () {
		this.trigger('follow', this.model.get('createdBy'));
		this.isFollowingStatus = true;
	},

	unfollow: function () {
		this.trigger('unfollow', this.model.get('createdBy'));
		this.isFollowingStatus = false;
	},

	isFollowing: function () {
		// Changes the follow button to unfollow button
		var $followButton = this.$el.find('.follow');
		if ($followButton.length) {
		  $followButton.css('color', '#0277BD');
		  $followButton.text('Following');
		  $followButton[0].className = 'unfollow';
		}
	},

  	isNotFollowing: function () {
	    var $unfollowButton = this.$el.find('.unfollow');
	    if ($unfollowButton.length) {
	      $unfollowButton.css('color', '#ccc');
	      // $unfollowButton.css('border', '1px solid #f0f0f0');

	      $unfollowButton.text('Follow');
	      $unfollowButton[0].className = 'follow';
	    }
 	},

 	getLikes: function () {
	    var self = this;
	    this.model.relation('likedBy').query().count().then(function (count) {
	      self.likeCount = count;
	      self.$el.find('.likes').append(count);
	    });
	},

 	doesUserLike: function () {
	    var self = this;
	    var query = this.model.relation('likedBy').query();
	    query.equalTo('objectId',Parse.User.current().id);
	    query.first().then(function (i) {
	      if(i) {
	        //user does like
	        var likeButton = self.$el.find('.like-button')[0];
	        likeButton.className = 'dislike-button';
	        likeButton.textContent = 'Liked';
	      }
	    });
  	},

  toggleLike: function (e) {
    var user = Parse.User.current();
    var likedBy = this.model.relation('likedBy');
    var currentTarget = e.currentTarget;
    var currentTargetClass = currentTarget.className;
    var likeCount = this.$el.find('.likes');

    if (currentTargetClass == 'like-button') {
      this.likeCount += 1;
      //Update the UI
      currentTarget.className = 'dislike-button';
      currentTarget.textContent = 'Liked';
      likeCount.text(this.likeCount);
      // Add this user to the likedBy relation of this post and save
      likedBy.add(user);
      this.model.save();
    } else if (currentTargetClass == 'dislike-button') {
      this.likeCount -=1;
      //Update the UI
      currentTarget.className = 'like-button';
      currentTarget.textContent = 'Like';
      likeCount.text(this.likeCount);
      // Remove this user from the likeBy relation of this post and save
      likedBy.remove(user);
      this.model.save();
    }
  },

  checkIn: function () {
    BeMe.CheckIn(Parse.User.current(),this.model.get('createdBy'));
  }

});