BeMe.Views.BarSearch = Parse.View.extend({
  initialize: function () {
    this.render();
  },

  template: _.template($('#bar-search-view').text()),

  render: function () {
    this.$el.html(this.template(this.options));
    $('.body-container').append(this.el);
    BeMe.renderedViews.push(this);
  },

  events: {
    'submit form' : 'search',
    'click .search-tabs li' : 'tabClickHandler'
  },

  tabClickHandler: function (e) {
    var $clickedElement = $(e.currentTarget);

    var matchObject = {Bars:"business", Friends:"consumer"};
    var type = matchObject[$clickedElement.text()];

    BeMe.Search.BarSearchResults.displayType(type);
  },

  search: function (e) {
    e.preventDefault();
    var searchString = $('input').val();
    BeMe.searchUsers(searchString);
  }
});

BeMe.Views.BarSearchResults = Parse.View.extend({
  initialize: function () {
    this.subViews = [];
    this.following = [];
    this.start();
  },

  start: function () {
    var self = this;
    Parse.User.current().relation('barsFollowing').query().find().then(function (users) {
      self.following = users;
      self.render();
    });
  },

  render: function () {
    BeMe.removeGroup(this.subViews);
    var self = this;
    if(this.collection.length === 0) {
      alert('No results found');
    } else {
      this.showAll();
    }
  },

  showAll: function () {
    BeMe.removeGroup(this.subViews);
    var self = this;

    this.collection.each(function (user) {
      var followingStatus = false;
      if (self.following.some(function(userFollowing) {return user.id === userFollowing.id})) {
        var followingStatus = true;
      }
      self.subViews.push(new BeMe.Views.BarSearchResult({model:user, following:followingStatus}));
    });
  },

  displayType: function (type) {
    var self = this;

    var $tabs = $('.search-tabs li');
    var barsTab = $tabs[0];
    var peopleTab = $tabs[1];

    var clickedTab;

    if(type === 'business') {
      clickedTab = barsTab;
    } else {
      clickedTab = peopleTab;
    }

    $tabs.removeClass('active-tab');
    $(clickedTab).addClass('active-tab');

    var usersToRender = this.collection.filter(function (bar) {
      return bar.get('userType') === type;
    });

    BeMe.removeGroup(this.subViews);

    _.each(usersToRender, function(user) {
      var followingStatus = false;
      if (self.following.some(function(userFollowing) {return user.id === userFollowing.id})) {
        var followingStatus = true;
      }

      self.subViews.push(new BeMe.Views.BarSearchResult({model:user, following:followingStatus}));
    });
  }
});

BeMe.Views.BarSearchResult = Parse.View.extend({
  tagName: 'li', 

  initialize: function () {
    this.render();
    if (this.options.following) {
      this.isFollowingUIUpdate();
    }
  },

  template: _.template($('#bar-search-results-view').text()),

  render: function () {
    this.$el.html(this.template(this.model));
    $('.bar-search-container').append(this.el);
    BeMe.renderedViews.push(this);
  },

  events: {
    'click .follow' : 'follow',
    'click .unfollow' : 'unfollow'
  },

  follow: function () {
    BeMe.FollowUser(this.model);
    this.isFollowingUIUpdate();
  },

  unfollow: function () {
    BeMe.UnfollowUser(this.model);
    this.isNotFollowingUIUpdate();
  },

  isFollowingUIUpdate: function () {
    var $followButton = this.$el.find('.follow');
    $followButton.css('color', 'rgba(1, 87, 155, 0.38)');
    $followButton.text('Following');
    $followButton[0].className = 'unfollow';
  },

  isNotFollowingUIUpdate: function () {
    var $followButton = this.$el.find('.unfollow');
    $followButton.css('color', 'rgba(1, 87, 155, 1)');
    $followButton.text('Follow');
    $followButton[0].className = 'follow';
  }

});