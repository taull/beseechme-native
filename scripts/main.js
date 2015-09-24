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

/*
	End utility functions
	--------------------------
	Begin Views Section
*/

BeMe.Views.Application = Parse.View.extend({
	initialize: function () {
		this.render();
	},

	el: "#application",

	template: _.template($('#application-view').text()),

	render: function () {
		this.$el.html(this.template(this.model));
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
	}
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
	}
});

BeMe.Views.BackendFeed = Parse.View.extend({
	initialize: function () {
		this.render();
		autosize($('#business-status'));
	},

	template: _.template($('#backend-feed-view').text()),

	render: function () {
		this.$el.html(this.template(this.model));
		$('.body-container').append(this.el);
		BeMe.renderedViews.push(this);
	}
});

BeMe.Views.BackendBeerList = Parse.View.extend({
	initialize: function () {
		this.render();
	},

	template: _.template($('#backend-beer-view').text()),

	render: function () {
		this.$el.html(this.template(this.model));
		$('.body-container').append(this.el);
		BeMe.renderedViews.push(this);
	}
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

BeMe.Views.BackendCalendar = Parse.View.extend({
	initialize: function () {
		this.render();
		this.query();
	},

	query: function () {
		/* Also need to base it off of the current user as well
			Need to add a 'belongsTo' relationship column in Parse */


		var timeBasedQuery = new Parse.Query("weeklyComment");
		var beginningOfDay = new Date();
		beginningOfDay.setHours(0);
		beginningOfDay.setMinutes(0);
		beginningOfDay.setSeconds(0);
		timeBasedQuery.greaterThanOrEqualTo('date', beginningOfDay);

		var endOfLastDay = new Date();
		endOfLastDay.setTime(endOfLastDay.getTime() + 604800000); //a week later
		endOfLastDay.setHours(23);
		endOfLastDay.setMinutes(59);
		endOfLastDay.setSeconds(59);
		timeBasedQuery.lessThanOrEqualTo('date', endOfLastDay);

		var standingCommentQuery = new Parse.Query("weeklyComment");
		standingCommentQuery.exists('dayOfWeek');

		var query = Parse.Query.or(timeBasedQuery, standingCommentQuery);

		var self = this;
		query.find().then(function (e) {
			console.log(e);
			self.createViews(e);
		})
	},

	createViews: function (e) {
		for (var i = 0; i < 7; i++) {
			var dateObject = new moment();
			dateObject.add(i, 'days');

			var dayUpperBound = new moment();
			dayUpperBound.add(i, 'days');
			dayUpperBound = dayUpperBound.endOf('day');

			var dayLowerBound = new moment();
			dayLowerBound.add(i, 'days');
			dayLowerBound = dayLowerBound.startOf('day');

			var queryResults = e;
			var matchingObjects = queryResults.filter(function (i) {
				if (i.get('date') !== undefined) {
					var dateOfComment = moment(i.get('date'));
				} else {
					var dateOfComment = new moment();
					dateOfComment.day(i.get('dayOfWeek'));
					console.log(dateOfComment);
					if (dateOfComment.isBefore(new Date(),'day')) {
						dateOfComment.add(7,'days');
						console.log(dateOfComment);
					}
				}

				return dateOfComment.isBetween(dayLowerBound,dayUpperBound)
			});


			if (matchingObjects.length > 0) {
				new BeMe.Views.DayView({date: dateObject, model: matchingObjects});
			} else {
				new BeMe.Views.DayView({date: dateObject});
			}

		}
	},

	template: _.template($('#backend-calendar-view').text()),

	render: function () {
		this.$el.html(this.template(this.model));
		$('.body-container').append(this.el);
		BeMe.renderedViews.push(this);
	}
});

BeMe.Views.DayView = Parse.View.extend({
	tagName: 'li',

	initialize: function () {
		this.render();
		this.commentViews = [];
	},

	template: _.template($('#backend-week-view').text()),

	render: function () {
		this.$el.html(this.template(this));
		$('.seven-day-nav ul').append(this.el);
		BeMe.renderedViews.push(this);
	},

	events: {
		'click' : 'displayComments'
	},

	displayComments: function () {
		this.$el.siblings().removeClass('active-day');
		this.$el.addClass('active-day');

		var self = this;

		var calendarSublist = $('.calendar-sublist');
		calendarSublist.empty();


		_.each(this.commentViews, function (i) {
			i.removeRenderedView();
		});
		this.commentViews = [];


		if (this.model) {
			_.each(this.model, function (i) {
				self.commentViews.push(new BeMe.Views.CommentDisplay({model:i}));
			});
		} else {
			calendarSublist.append("<p>There are no comments to display for today!</p>");
		}

	}
});

BeMe.Views.CommentDisplay = Parse.View.extend({
	tagName:'li',

	initialize: function () {
		this.render();
	},

	template: _.template("<i class='fa fa-arrows'></i><p><%= attributes.content %></p>"),

	render: function () {
		this.$el.html(this.template(this.model));
		$('.calendar-sublist').append(this.el);
		BeMe.renderedViews.push(this);
	}
})

BeMe.Views.BackendSettings = Parse.View.extend({
	initialize: function () {
		this.render();
	},

	template: _.template($('#backend-settings-view').text()),

	render: function () {
		this.$el.html(this.template(this.model));
		$('.body-container').append(this.el);
		BeMe.renderedViews.push(this);
	}
});

/*
	End Views Section
	-----------------------------
	Begin Collections Section
*/



/*
	End Collections Section
	----------------------------
	Begin Router Section
*/

var Router = Backbone.Router.extend({
	routes: {
		'' : 'home',
		'backend' : 'backend',
		'backend/feed' : 'backendFeed',
		'backend/beer' : 'backendBeerList',
		'backend/competition' : 'backendCompetition',
		'backend/calendar' : 'backendCalendar',
		'backend/settings' : 'backendSettings'
	},

	initialize: function () {
		new BeMe.Views.Application();
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
		new BeMe.Views.BackendCalendar();
	},

	backendSettings: function () {
		BeMe.removeAllViews();
		new BeMe.Views.Backend();
		new BeMe.Views.BackendSettings();
	}
});

/*
	End Router Section
	--------------------------
	Begin Glue Code
*/

$(document).ready(function () {
	BeMe.Router = new Router();
	Backbone.history.start();
});

/*
	End Glue Code
*/
