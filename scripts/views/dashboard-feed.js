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