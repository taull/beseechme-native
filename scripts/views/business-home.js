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
      _.each(e, function (i) {
        new BeMe.Views.CommentDisplay({model:i});
      });
    }, function (error) {
      console.log(error);
      alert(error.message);
    });
  }
});