BeMe.Views.DashboardFeed = BeMe.Views.DashboardBaseView.extend({
  initialize: function () {
    this.template = _.template($('#dashboard-feed-view').text())
    this.render();
    new BeMe.Views.DashboardFeedList();
  },

  render: function () {
    var self = this;
    this.$el.html(this.template(this.model));
    $('.body-container').append(this.el);
    BeMe.renderedViews.push(this);

    // $('.dashboard-header').addClass('animated slideInDown');
  },
});

BeMe.Views.DashboardFeedList = Parse.View.extend({
  initialize: function () {
    this.collection = new Parse.Collection();
    this.pullNearStatuses();
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
      self.collection.add(statuses);
      self.render();
    });
  },

  render: function () {
    new BeMe.Views.StatusListView({collection:this.collection, container:'.bar-feed'})
  }

});
