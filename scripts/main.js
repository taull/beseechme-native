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
		this.isApplicationView = true;
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
		$(function() {

		    // Now
	    var now = moment();

			$('.current-date').append([
			  now.format('dddd, MMMM Do')
			].join('<br/>'));

			var oneDateLater = moment().add('days', 1);

			$('.one-date-later').append([
			  oneDateLater.format('dddd, MMMM Do')
			].join('<br/>'));

			var twoDateLater = moment().add('days', 2);

			$('.two-date-later').append([
			  twoDateLater.format('dddd, MMMM Do')
			].join('<br/>'));

			var threeDateLater = moment().add('days', 3);

			$('.three-date-later').append([
			  threeDateLater.format('dddd, MMMM Do')
			].join('<br/>'));

			var fourDateLater = moment().add('days', 4);

			$('.four-date-later').append([
			  fourDateLater.format('dddd, MMMM Do')
			].join('<br/>'));

			var fiveDateLater = moment().add('days', 5);

			$('.five-date-later').append([
			  fiveDateLater.format('dddd, MMMM Do')
			].join('<br/>'));

			var sixDateLater = moment().add('days', 6);

			$('.six-date-later').append([
			  sixDateLater.format('dddd, MMMM Do')
			].join('<br/>'));

		    // Now
	    var now = moment();

			$('#current-day').append([
			  now.format('ddd')
			].join('<br/>'));

			// 1 day
		    var oneDayLater = moment().add('days', 1);

			$('#one-day-later').append([
			  oneDayLater.format('Do')
			].join('<br/>'));

			// 2 days
	    var twoDayLater = moment().add('days', 2);

			$('#two-day-later').append([
			  twoDayLater.format('Do')
			].join('<br/>'));

			// 3 days
	    var threeDayLater = moment().add('days', 3);

			$('#three-day-later').append([
			  threeDayLater.format('Do')
			].join('<br/>'));

			// 4 day
	    var fourDayLater = moment().add('days', 4);

			$('#four-day-later').append([
			  fourDayLater.format('Do')
			].join('<br/>'));

			// 5 day
	    var fiveDayLater = moment().add('days', 5);

			$('#five-day-later').append([
			  fiveDayLater.format('Do')
			].join('<br/>'));

			// 6 day
	    var sixDayLater = moment().add('days', 6);

			$('#six-day-later').append([
			  sixDayLater.format('Do')
			].join('<br/>'));

			// Week Day Now
	    var weeklyZero = moment();

			$('#weekly-zero').append([
			  weeklyZero.format('MMMM Do, YYYY')
			].join('<br/>'));

			// Week Day 1
	    var weeklyOne = moment().add('days', 1);

			$('#weekly-one').append([
			  weeklyOne.format('dddd')
			].join('<br/>'));


			// Week Day 2
	    var weeklyTwo = moment().add('days', 2);

			$('#weekly-two').append([
			  weeklyTwo.format('dddd')
			].join('<br/>'));

			// Week Day 3
	    var weeklyThree = moment().add('days', 3);

			$('#weekly-three').append([
			  weeklyThree.format('dddd')
			].join('<br/>'));

			// Week Day 4
	    var weeklyFour = moment().add('days', 4);

			$('#weekly-four').append([
			  weeklyFour.format('dddd')
			].join('<br/>'));

			// Week Day 5
	    var weeklyFive = moment().add('days', 5);

			$('#weekly-five').append([
			  weeklyFive.format('dddd')
			].join('<br/>'));

			// Week Day 6
	    var weeklySix = moment().add('days', 6);

			$('#weekly-six').append([
			  weeklySix.format('dddd')
			].join('<br/>'));


			// Seven Day Nav

			// Now
    	var sevenDay1 = moment();

			$('#seven-day-1').append([
			  sevenDay1.format('dddd')
			].join('<br/>'));

			// Current Day Heading
	    var currentDayHeading = moment();

			$('#current-day-heading').append([
			  currentDayHeading.format('dddd, MMM Do')
			].join('<br/>'));



			// 1 day
	    var sevenDay2 = moment().add('days', 1);

			$('#seven-day-2').append([
			  sevenDay2.format('dddd')
			].join('<br/>'));

			// 2 days
	    var sevenDay3 = moment().add('days', 2);

			$('#seven-day-3').append([
			  sevenDay3.format('dddd')
			].join('<br/>'));

			// 3 days
	    var sevenDay4 = moment().add('days', 3);

			$('#seven-day-4').append([
			  sevenDay4.format('dddd')
			].join('<br/>'));

			// 4 day
	    var sevenDay5 = moment().add('days', 4);

			$('#seven-day-5').append([
			  sevenDay5.format('dddd')
			].join('<br/>'));

			// 5 day
	    var sevenDay6 = moment().add('days', 5);

			$('#seven-day-6').append([
			  sevenDay6.format('dddd')
			].join('<br/>'));

			// 6 day
	    var sevenDay7 = moment().add('days', 6);

			$('#seven-day-7').append([
			  sevenDay7.format('dddd')
			].join('<br/>'));


			// Now
	    var sevenMonth1 = moment();

			$('#seven-month-1').append([
			  sevenMonth1.format('MMMM Do')
			].join('<br/>'));

			// 1 day
	    var sevenMonth2 = moment().add('days', 1);

			$('#seven-month-2').append([
			  sevenMonth2.format('MMMM Do')
			].join('<br/>'));

			// 2 days
	    var sevenMonth3 = moment().add('days', 2);

			$('#seven-month-3').append([
			  sevenMonth3.format('MMMM Do')
			].join('<br/>'));

			// 3 days
	    var sevenMonth4 = moment().add('days', 3);

			$('#seven-month-4').append([
			  sevenMonth4.format('MMMM Do')
			].join('<br/>'));

			// 4 day
	    var sevenMonth5 = moment().add('days', 4);

			$('#seven-month-5').append([
			  sevenMonth5.format('MMMM Do')
			].join('<br/>'));

			// 5 day
	    var sevenMonth6 = moment().add('days', 5);

			$('#seven-month-6').append([
			  sevenMonth6.format('MMMM Do')
			].join('<br/>'));

			// 6 day
	    var sevenMonth7 = moment().add('days', 6);

			$('#seven-month-7').append([
			  sevenMonth7.format('MMMM Do')
			].join('<br/>'));

		});
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
				var dateOfComment = moment(i.get('date'));
				return dateOfComment.isBetween(dayLowerBound,dayUpperBound)
			});
		}
	},

	template: _.template($('#backend-calendar-view').text()),

	render: function () {
		this.$el.html(this.template(this.model));
		$('.body-container').append(this.el);
		BeMe.renderedViews.push(this);
	}
});

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
