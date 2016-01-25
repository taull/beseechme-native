//accepts a collection of status models and a container
//renders them 

BeMe.Views.StatusListView = Parse.View.extend({
	initialize: function () {
		this.views = [];
		this.render(this.options.container);
		this.initializeFollowButtons();
		this.barsFollowingIds;
	},

	render: function (container) {
		var self = this;
		BeMe.removeGroup(this.views);
		this.collection.each(function (status) {
			var statusView = new BeMe.Views.Status({model:status,container:container});
			self.views.push(statusView);
			statusView.on('follow', self.follow, self);
			statusView.on('unfollow', self.unfollow, self);
		});
	},

	follow: function (e) {
		BeMe.FollowUser(e);
		this.followUsers(e);
	},

	unfollow: function (e) {
		BeMe.UnfollowUser(e);
		this.unfollowUsers(e);
	},

	initializeFollowButtons: function () {
    var self = this;

    var user = Parse.User.current();
    user.relation('barsFollowing').query().find().then(function (barsFollowing) {
      self.barsFollowingIds = barsFollowing.map(function (i) {return i.id});

      _.each(self.views, function (view) {
        if (self.barsFollowingIds.some(function (i) {return i === view.model.get('createdBy').id}) ) {
          view.isFollowing();
        } else {
          view.isNotFollowing();
        }
      });
    });
  },

  unfollowUsers: function (user) {
  	_.each(this.views, function (view) {
  		if( view.model.get('createdBy').id === user.id) {
  			view.isNotFollowing();
  		}
  	});
  },

  followUsers: function (user) {
  	_.each(this.views, function (view) {
  		if( view.model.get('createdBy').id === user.id) {
  			view.isFollowing();
  		}
  	});
  },
});