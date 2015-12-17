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
    this.render();
  },

  render: function () {
    var self = this;

    Parse.Cloud.run('pullFollowingStatuses').then(function(statuses) {
      var collection = new Parse.Collection(statuses);
      new BeMe.Views.StatusListView({collection:collection, container:'.bar-feed'});
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