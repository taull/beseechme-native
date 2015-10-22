'use strict';


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
  BeMe.BackendCalendarRoute = {};
})();

/*
	Begin utility functions
*/

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


/* Application Section */


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
	}
});


/* Index Section */


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
				console.log(userObject);
        BeMe.ApplicationView.render();
        if(userObject.get('userType') == 'consumer') {
          BeMe.Router.navigate('dashboard/feed', true);
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


/* Register Section */


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
          console.log(e);
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
          console.log(e);
        }, error: function (obj, error) {
          alert("Error " + error.code + ": " + error.message);
        }
      });
    } else {
      alert('Passwords don\'t match');
    }
	}
});


/* ------- BACKEND SECTION -------- */


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
      $('.header-slideout').toggleClass('slideout-shift');
    });
	}
});


/* Backend Feed */


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
      $('.profile-feed').addClass('hidden');
		});

    $('#backend-myfeed-tab').click(function(){
      $('.profile-feed').removeClass('hidden');
      $('#backend-myfeed-tab').addClass('active-feed-type');
      $('.profile-tools').toggleClass('profile-tools-shift');

    });

	},

	events: {
		'submit form': 'postBusinessStatus',
	},

	postBusinessStatus: function (e) {
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
    //if fileIsChosen && image != 'undefined'....

		var content = contentHolder.val();
		var businessStatus = new Parse.Object('businessStatus');
		businessStatus.set('content', content);
		businessStatus.set('image', image);
		businessStatus.set('createdBy', Parse.User.current());
		businessStatus.save().then(function (e){
			contentHolder.val('');
			$('#camera-file').val('');
      self.collectionReference.add(e, {at:0});
		});
	}
});

BeMe.Collections.Feeds = Parse.Collection.extend({
  initialize: function () {
    var self = this;
    this.views = [];
    this.on('add remove', this.render);
    console.log(Parse.User.current());
    this.fetch(this.query).then(function (e) {
      console.log(e);
      self.render();
    });
  },

  query: new Parse.Query('businessStatus')
        .equalTo('createdBy', Parse.User.current())
        .include('createdBy')
        .descending('createdAt'),

  render: function () {
    var self = this;
    _.each(this.views, function (i) {
      i.remove();
    });
    this.views = [];
    this.each(function (i) {
      var feedPost = new BeMe.Views.FeedPost({model:i});
      self.views.push(feedPost);
    });
  }
});

BeMe.Views.FeedPost = Parse.View.extend({
  tagName:'li',

  initialize: function () {
      this.render();
  },

  template: _.template($('#businessStatus-post-view').text()),

  render: function () {
    this.$el.html(this.template(this.model));
    $('.profile-feed ul').append(this.el);
  }
});


/* Backend Beer List Section */


BeMe.Views.BackendBeerList = Parse.View.extend({
	initialize: function () {
    this.beerType = null;
    this.pageNumber = 1;
		this.render();

    this.loadDraftBeers();
    this.addSpinner();
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

		$('#backend-draft-tab').click(function(){
			$('.beer-search').removeClass('beer-search-shift');
			$('.profile-beer-list').removeClass('hidden');
		});

		$('#backend-bottle-tab').click(function(){
			$('.beer-search').removeClass('beer-search-shift');
			$('.profile-beer-list').removeClass('hidden');
		});

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
    $('.profile-beer-list ul').empty();
    $('.beer-search-results ul').empty();
  },

  searchBreweryDB: function (e) {
    this.addSpinner();
    e.preventDefault();
    $("#backend-draft-tab, #backend-bottle-tab").removeClass('active-beer-type');
    var self = this;
    var queryString = $('.beer-search input').val();

    if(!this.collection) {
      this.collection = new BeMe.Collections.BeerResults();
    }


    Parse.Cloud.run('searchBrewery', {queryString:queryString})
    .then(function (beers) {
      // self.collection.remove();
      self.removeSpinner();
      self.collection.reset();
      console.log(self.collection);

      self.emptyBeerList();
      $('.beer-search input').val('');


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
      console.log(error);
    });
  },

  loadDraftBeers:function () {
    this.pageNumber = 1;
    this.beerType = 'draftBeers';

    var self = this;
    $("#backend-bottle-tab").removeClass('active-beer-type');
    $("#backend-draft-tab").addClass('active-beer-type');
    //Parse.User.fetch().then do what's below
    Parse.Cloud.run('getBeers', {array:this.getIdArray(Parse.User.current().get('draftBeers'),1)})
    .then(function (e) {
      self.emptyBeerList();
      self.removeSpinner();
      _.each(e, function (i) {
        new BeMe.Views.BackendBeer({model:i,type:'draftBeers'});
      });
    });
  },

  loadBottledBeers: function () {
    this.pageNumber = 1;
    this.beerType = 'bottledBeers';

    var self = this;
    $("#backend-draft-tab").removeClass('active-beer-type');
    $("#backend-bottle-tab").addClass('active-beer-type');
    //Parse.User.fetch().then do what's below
    Parse.Cloud.run('getBeers', {array:this.getIdArray(Parse.User.current().get('bottledBeers'),1)})
    .then(function (e) {
      self.emptyBeerList();
      self.removeSpinner();
      _.each(e, function (i) {
        new BeMe.Views.BackendBeer({model:i, type:'bottledBeers'});
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
      $('.load-more-button').addClass('hidden'); //show it
    } else {
      $('.load-more-button').removeClass('hidden'); //hide it
    }
    //we are iterating in reverse order to make the ones added to the list most
    //recent appear first without having to store extra data in the array (addedAt date, etc...)
    var arrayOfIds = [];
    for(var i = max; i >= realMin; i--) {
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

    Parse.Cloud.run('getBeers', {array:this.getIdArray(Parse.User.current().get(beerType),pageNumber)})
    .then(function (e) {
      self.removeSpinner();
      _.each(e, function (i) {
        new BeMe.Views.BackendBeer({model:i, type:'bottledBeers'});
      });
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
    _.each(this.views, function (i) {
      i.remove();
    });
    this.views = [];
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


/* Backend Competition Section */


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


/* Backend Calendar Section */


BeMe.Views.BackendCalendar = Parse.View.extend({
	initialize: function () {
		this.render();
    BeMe.BackendCalendarRoute.DaysView = new BeMe.Views.DaysView({collection:new BeMe.Collections.WeeklyComments()});
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
    BeMe.BackendCalendarRoute.DaysView.postWeeklyComment(); //calls method on child view
  }

});

BeMe.Views.DaysView = Parse.View.extend({
  initialize: function () {
    this.dayViews = [];
    this.query();
    this.activeViewIndex = 0;
  },

  render: function () {
    _.each(this.dayViews, function (i) {
      i.removeRenderedView();
    });
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

    var ACL = new Parse.ACL();
    ACL.setPublicReadAccess(true);
    ACL.setWriteAccess(Parse.User.current(),true);
    post.setACL(ACL);

    if (isChecked) {
      post.set('date', date._d);
    } else {
      post.set('dayOfWeek', dayOfWeek);
    }

    if (!anyChecked) {
      alert("You must choose one of the date options");
    } else if(date.isBefore(moment(new Date()),'day')) {
      alert("You cannot post a past date");
    } else if (!content) {
      alert("You must write a comment");
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

  query: function () {

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

    timeBasedQuery.equalTo('createdBy', Parse.User.current());
    standingCommentQuery.equalTo('createdBy', Parse.User.current());

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

    BeMe.BackendCalendarRoute.DaysView.activeViewIndex = index;

    this.displayComments();
  },

	displayComments: function () {
		this.$el.siblings().removeClass('active-day');
		this.$el.addClass('active-day');

		var self = this;


		var calendarDaily = $('.calendar-daily');
    $('.calendar-standing').empty();
		calendarDaily.empty();

		/* Not working properly? */
		_.each(this.commentViews, function (i) {
			i.removeRenderedView();
		});
		this.commentViews = [];

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
    BeMe.BackendCalendarRoute.DaysView.render();
  }
})

BeMe.Collections.WeeklyComments = Parse.Collection.extend({
  className: "weeklyComment",

  initialize: function () {
    console.log("New weekly comments collection");
  },
});

/* Backend Settings */

BeMe.Views.BackendSettings = Parse.View.extend({
	initialize: function () {
		this.render();
		$('#backend-settings [data-accordion]').accordion();

	},

	template: _.template($('#backend-settings-view').text()),

	render: function () {
		this.$el.html(this.template(this.model));
		$('.body-container').append(this.el);
		BeMe.renderedViews.push(this);
	},

  events: {
    'click #avatar-upload' : 'uploadAvatar'
  },

  uploadAvatar: function () {
    var image = BeMe.createImageFile($('input[type="file"]'));

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
  }
});

/* ------- Business SECTION --------- */

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
      $('.header-slideout').toggleClass('slideout-shift');
    });
  }
});

/* Business Home */

BeMe.Views.BusinessHome = Parse.View.extend({
  initialize: function () {
    console.log(this.model);

    if (this.model) {
      this.template = _.template($('#business-home-view').text());
    } else {
      this.template = _.template($('#business-error-view').text());
    }
    this.render();
  },

  render:function () {
    this.$el.html(this.template(this.model));
    $('.body-container').append(this.el);
    console.log(this.el);
    BeMe.renderedViews.push(this);
  }
});

/* Business Feed */

BeMe.Views.BusinessFeed = Parse.View.extend({
  initialize: function () {
    this.render();
  },

  template: _.template($('#business-feed-view').text()),

  render: function () {
    this.$el.html(this.template(this.model));
    $('.body-container').append(this.el);
    BeMe.renderedViews.push(this);
  }
});

/* Business Beer List */

BeMe.Views.BusinessBeerList = Parse.View.extend({
  initialize: function () {
    this.render();
  },

  template: _.template($('#business-beer-list-view').text()),

  render: function () {
    this.$el.html(this.template(this.model));
    $('.body-container').append(this.el);
    BeMe.renderedViews.push(this);
  }
});

/* Router */

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
    'business/:handle' : 'businessHome'
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
		console.log('Index route fired');
		BeMe.removeAllViews();
		new BeMe.Views.Index();
	},

	backend: function () {
		console.log('Backend route fired');
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
		BeMe.BackendCalendarRoute.CalendarView = new BeMe.Views.BackendCalendar();
	},

	backendSettings: function () {
		BeMe.removeAllViews();
		new BeMe.Views.Backend();
		new BeMe.Views.BackendSettings();
	},

  businessHome: function (handle) {
    BeMe.removeAllViews();
    new BeMe.Views.Business();

    var query = new Parse.Query('User');
    query.equalTo('handle', handle);
    query.find().then(function (i) {
      new BeMe.Views.BusinessHome({model:i[0]});
      console.log(i);
    });
  },

  businessFeed: function () {
    BeMe.removeAllViews();
    new BeMe.Views.Business();
    new BeMe.Views.BusinessFeed();
  },

  businessBeerList: function () {
    BeMe.removeAllViews();
    new BeMe.Views.Business();
    new BeMe.Views.BusinessBeerList();
  },

  businessCalendar: function () {
    BeMe.removeAllViews();
    new BeMe.Views.Business();
    new BeMe.Views.BusinessCalendar();
  }
});



$(document).ready(function () {
	BeMe.Router = new Router();
	Parse.history.start();
});
