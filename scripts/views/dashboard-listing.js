BeMe.Views.DashboardListing = BeMe.Views.DashboardBaseView.extend({
  initialize: function () {
    this.template = _.template($('#dashboard-listing-view').text());
    this.render();
    this.listingViews = [];
    this.loadListings();
  },

  loadListings: function () {
    var self = this;

    var user = Parse.User.current();

    var query = new Parse.Query('User');
    query.equalTo('userType', 'business');

    /* CHANGE TO user.get('maxDistance') WHENEVER WE GET THE SLIDER FOR SETTING maxDistance WORKING */
    query.withinMiles('location',user.get('location'), 100);
    query.find().then(function (e) {
      BeMe.removeGroup(this.listingViews);
      _.each(e, function (i) {
        var newListingView = new BeMe.Views.DashboardIndividualListing({model:i});
        console.log(i);
        self.listingViews.push(this);
      });
    }, function (error) {
      console.log(error);
    });
  },
});

BeMe.Views.DashboardIndividualListing = Parse.View.extend({
  tagName:'li',

  initialize: function () {
    this.render();
  },

  template: _.template($('#individual-listing-view').text()),

  render: function () {
    this.$el.html(this.template(this.model));
    $('.listing-container').append(this.el);
  }
});
