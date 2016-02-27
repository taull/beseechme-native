BeMe.Views.DashboardFriends = BeMe.Views.DashboardBaseView.extend({
	initialize: function () {
		this.template = _.template($('#dashboard-friends-view').text());
		this.render();
		this.usersFollowing = null;
		this.loadFollowing();
	},

	loadFollowing: function () {
		var self = this;
		var query = Parse.User.current().relation('barsFollowing').query();
		query.equalTo('userType', 'consumer');
		query.find().then(function (e) {
			self.usersFollowing = e;
			self.loadFriendsFeed();
		});
	},

	loadFriendsFeed: function () {
		var query = new Parse.Query('status');
		query.containedIn('createdBy', this.usersFollowing);
		query.include('createdBy');
		query.descending('createdAt');
		query.find().then(function (statuses) {
			console.log(statuses);
			var collection = new Parse.Collection(statuses);
			new BeMe.Views.StatusListView({collection:collection,container:'.friends-feed'});
		});
	}
});
