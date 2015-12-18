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
      self.loadFriendsFeed();
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