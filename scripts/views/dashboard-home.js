BeMe.Views.DashboardHome = BeMe.Views.DashboardBaseView.extend({
  initialize: function () {
    this.template = _.template($('#dashboard-home-view').text());
    this.render();

    this.loadLocalFeed();

    this.localFeedCollection;
    this.followingFeedCollection;
    this.friendsFeedCollection;

    this.feedContainer = '.bar-feed';

    if (Parse.User.current().get('userType') == 'business') {
      this.loadFollowers();
    } else {
      this.loadFollowing();
    }
  },

  events: {
    'click .tab-select li' : 'toggleActiveFeed'
  },

  toggleActiveFeed: function (e) {
    $currentTarget = $(e.currentTarget);
      if (!$currentTarget.hasClass('active-user')) { // if it's not the currently selected $currentTarget
			$currentTarget.siblings().removeClass('active-user');
			$currentTarget.addClass('active-user');
      var activeTabVal = $currentTarget.text(); // The value is determined by the HTML text! Watch for changes if errors occur

      // this object will match the proper view to be posted when
      var feedMatchObject = {
        Local: "loadLocalFeed",
        Following: "loadFollowingFeed",
        Friends: "loadFriendsFeed"
      }

      this.activeFeedView.removeViews();
      var functionToCall = feedMatchObject[activeTabVal];
      this[functionToCall]();
    }
  },

  loadLocalFeed: function () {
    var self = this;
    if(!this.localFeedCollection) { // if we don't have the info, query for it
      var collection = new Parse.Collection();
      var query = new Parse.Query('status');
      query.withinMiles('location', Parse.User.current().get('location') ,100);
      query.descending('createdAt');
      query.include('createdBy');
      query.containedIn('statusType', ['Text', 'Photo', 'Event']);
      query.limit(20);
      query.find().then(function (statuses) {
        collection.add(statuses);
        self.localFeedCollection = collection;
        self.activeFeedView = new BeMe.Views.StatusListView({collection: collection, container: self.feedContainer});
      });
    } else {
      this.activeFeedView = new BeMe.Views.StatusListView({
        collection: this.localFeedCollection,
        container: self.feedContainer
      });
    }

  },

  loadFollowingFeed: function () {
    var self = this;

    if (!this.followingFeedCollection) { // if we don't have the info, query for it
      Parse.User.current().relation('barsFollowing').query().find().then(function (barsFollowing) {
        loadFollowerFeed(barsFollowing);
      });

      function loadFollowerFeed(barsFollowing) {
        console.log(barsFollowing);
        var query = new Parse.Query('status');
        query.containedIn('createdBy', barsFollowing);
        query.containedIn('statusType', ['Text', 'Photo', 'Video', 'Event']);
        query.include('createdBy');
        query.descending('createdAt');

        query.find().then(function(statuses) {
          var collection = new Parse.Collection(statuses);
          self.followingFeedCollection = collection;
          self.activeFeedView = new BeMe.Views.StatusListView({collection:collection, container:self.feedContainer});
        });
      }
    } else {
      this.activeFeedView = new BeMe.Views.StatusListView({
        collection: this.followingFeedCollection,
        container: self.feedContainer
      });
    }
  },

  loadFriendsFeed: function () {
    var self = this;

    if (!this.friendsFeedCollection) { //if we don't have the info, query for it
      var query = Parse.User.current().relation('barsFollowing').query();
      query.equalTo('userType', 'consumer');
      query.find().then(function (usersFollowing) {
        loadFriendsFeed(usersFollowing);
      });

      function loadFriendsFeed(usersFollowing) {
        var query = new Parse.Query('status');
        query.containedIn('createdBy', usersFollowing);
        query.include('createdBy');
        query.descending('createdAt');
        query.find().then(function (statuses) {
          var collection = new Parse.Collection(statuses);
          self.friendsFeedCollection = collection;
          self.activeFeedView = new BeMe.Views.StatusListView({collection:collection,container: self.feedContainer});
        });
      }
    } else {
      this.activeFeedView = new BeMe.Views.StatusListView({
        collection: this.friendsFeedCollection,
        container: self.feedContainer
      });
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
