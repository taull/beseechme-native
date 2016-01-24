BeMe.Views.Status = Parse.View.extend({
	initialize: function () {
		this.render();
		this.likeCount;
	    this.getLikes();
	    this.doesUserLike();
	    this.isFollowingStatus;
	},

	template: function (model) {
	    var statusType = model.get('statusType');

	    if (statusType === 'Text') {
	      return _.template($('#status-text-view').text())(model);
	    } else if (statusType === 'Photo') {
	      return _.template($('#status-photo-view').text())(model);
	    } else if (statusType === 'Event') {
	      return _.template($('#status-event-view').text())(model);
	    } else if (statusType === 'Check In') {
	      return _.template($('#status-checkin-view').text())(model);
	    } else if (statusType === 'Beer') {
	      return _.template($('#status-beer-view').text())(model);
	    }
	},

	render: function () {
		this.$el.html(this.template(this.model));
		$(this.options.container).append(this.el);
		BeMe.renderedViews.push(this); 
	},

	events: {
    'click .follow' : 'follow',
    'click .unfollow': 'unfollow',
    'click .like-button, .dislike-button' : 'toggleLike',
    'click .check-in' : 'checkIn',
    'click .likes-trigger' : 'likesTriggerHandler'
	},

	follow: function () {
		this.trigger('follow', this.model.get('createdBy'));
		this.isFollowingStatus = true;
	},

	unfollow: function () {
		this.trigger('unfollow', this.model.get('createdBy'));
		this.isFollowingStatus = false;
	},

	isFollowing: function () {
		// Changes the follow button to unfollow button
		var $followButton = this.$el.find('.follow');
		if ($followButton.length) {
		  $followButton.css('color', '#0277BD');
		  $followButton.text('Following');
		  $followButton[0].className = 'unfollow';
		}
	},

  	isNotFollowing: function () {
	    var $unfollowButton = this.$el.find('.unfollow');
	    if ($unfollowButton.length) {
	      $unfollowButton.css('color', '#ccc');
	      // $unfollowButton.css('border', '1px solid #f0f0f0');

	      $unfollowButton.text('Follow');
	      $unfollowButton[0].className = 'follow';
	    }
 	},

 	getLikes: function () {
	    var self = this;
	    this.model.relation('likedBy').query().count().then(function (count) {
	      self.likeCount = count;
	      self.$el.find('.likes').append(count);
	    });
	},

 	doesUserLike: function () {
	    var self = this;
	    var query = this.model.relation('likedBy').query();
	    query.equalTo('objectId',Parse.User.current().id);
	    query.first().then(function (i) {
	      if(i) {
	        //user does like
	        var likeButton = self.$el.find('.like-button')[0];
	        likeButton.className = 'dislike-button';
	        likeButton.textContent = 'Liked';
	      }
	    });
  	},

  	toggleLike: function (e) {
	    var user = Parse.User.current();
	    var likedBy = this.model.relation('likedBy');
	    var currentTarget = e.currentTarget;
	    var currentTargetClass = currentTarget.className;
	    var $likeCount = this.$el.find('.likes');
	    var self = this;

	    var initialFontSize = $likeCount.css('font-size');
		$likeCount.css('font-size', '1.7em');
		setTimeout(function () {
			$likeCount.css('font-size', initialFontSize);
		},150);

	    if (currentTargetClass == 'like-button') {
	      this.likeCount += 1;
	      //Update the UI
	      currentTarget.className = 'dislike-button';
	      currentTarget.textContent = 'Liked';
	      $likeCount.text(this.likeCount);
	      // Add this user to the likedBy relation of this post and save
	      likedBy.add(user);
	      this.model.save().then(function () {
	      	var createdBy = self.model.get('createdBy');
	      	if (createdBy.get('userType') == 'consumer') {
	      		BeMe.showConfirmation('You liked ' + createdBy.get('firstName') + " " + createdBy.get('lastName') + "'s post!");
	      	} else {
	      		BeMe.showConfirmation('You liked ' + createdBy.get('businessName') + "'s post");
	      	}
	      });
	    } else if (currentTargetClass == 'dislike-button') {
	      this.likeCount -=1;
	      //Update the UI
	      currentTarget.className = 'like-button';
	      currentTarget.textContent = 'Like';
	      $likeCount.text(this.likeCount);
	      // Remove this user from the likeBy relation of this post and save
	      likedBy.remove(user);
	      this.model.save().then(function () {
	      	var createdBy = self.model.get('createdBy');
	      });
	    }
	  },

	checkIn: function () {
		BeMe.CheckIn(Parse.User.current(),this.model.get('createdBy'));
	},

	likesTriggerHandler: function () {
		this.$el.find('.likes-results-container').toggleClass('likes-results-shift'); // open/close

  		if (!this.usersWhoLikedData) { //if we don't already have the data
  			this.loadUsersWhoLiked();
  		}
  	},

	loadUsersWhoLiked: function () {
		var self = this;
	    var query = this.model.relation('likedBy').query()
	    query.limit(5);
	    query.select('avatar');
	    query.select('firstName');
	    query.select('lastName');
	    query.select('businessName');
	    query.select('handle');
	    query.find().then(function (users) {
	    	self.usersWhoLikedData = users;
	    	self.renderUsersWhoLiked();
	    });
	},

	renderUsersWhoLiked: function () {
		var $likesResults = this.$el.find('.likes-results');
		_.each(this.usersWhoLikedData, function (user) {
			//fallback for those users without a handle (temporary)
    		if (user.get('handle') == undefined) {
	    		user.set('handle', 'testHandle');
	    	}

	    	var templateFunction = _.template($('#likes-results-view').text());
	    	var compiledTemplate = templateFunction(user.attributes);
	    	$likesResults.append(compiledTemplate);
    	});
	}

});