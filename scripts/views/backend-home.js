BeMe.Views.BackendHome = Parse.View.extend({
	initialize: function () {
		this.render();

		//Change to Firebase before un-commenting
    // if (BeMe.currentUser.get('userType') == 'business') {
    //   this.loadFollowers();
    // } else {
    //   this.loadFollowing();
    // }
	},

	template: _.template($('#backend-home-view').text()),

	render: function () {
		this.$el.html(this.template(this.model));
		$('.body-container').append(this.el);
		BeMe.renderedViews.push(this);
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
