BeMe.Views.DashboardFriends = BeMe.Views.DashboardBaseView.extend({
	initialize: function () {
		this.template = _.template($('#dashboard-friends-view').text());
		this.render();
	},

	loadFriendsFeed: function () {
		console.log('something');
	}
});