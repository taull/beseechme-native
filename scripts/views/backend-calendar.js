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