BeMe.Views.DashboardHome = BeMe.Views.DashboardBaseView.extend({
  initialize: function () {
    this.template = _.template($('#dashboard-home-view').text());
    this.render();
    new BeMe.Views.DashboardFeedList();

    if (Parse.User.current().get('userType') == 'business') {
      this.loadFollowers();
    } else {
      this.loadFollowing();
    }
  },


  loadListings: function () {
    var user = Parse.User.current();

    var query = new Parse.Query('User');
    query.equalTo('userType', 'business');

    /* CHANGE TO user.get('maxDistance') WHENEVER WE GET THE SLIDER FOR SETTING maxDistance WORKING */
    query.withinMiles('location',user.get('location'), 100);
    query.limit(5);
    query.find().then(function (e) {
      console.log(e);
      _.each(e, function (i) {
        var newListingView = new BeMe.Views.DashboardIndividualListing({model:i});
      });
    }, function (error) {
      alert('Error. Check console for details');
      console.log(error);
    });
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