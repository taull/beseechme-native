BeMe.Views.DashboardHome = BeMe.Views.DashboardBaseView.extend({
  initialize: function () {
    this.template = _.template($('#dashboard-home-view').text());
    this.render();
    // new BeMe.Views.DashboardFeedList();

    if (Parse.User.current().get('userType') == 'business') {
      this.loadFollowers();
    } else {
      this.loadFollowing();
    }
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
