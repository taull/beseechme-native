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
		  $followButton.css('color', '#FFC107');
		  $followButton.removeClass('follow');
	      $followButton.addClass('unfollow');
		}
	},

  	isNotFollowing: function () {
	    var $unfollowButton = this.$el.find('.unfollow');
	    if ($unfollowButton.length) {
	      $unfollowButton.css('color', '#ddd');
	      // $unfollowButton.css('border', '1px solid #f0f0f0');
	      $unfollowButton.removeClass('unfollow');
	      $unfollowButton.addClass('follow');
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
	        $(likeButton).addClass('dislike-button');
	      	$(likeButton).removeClass('like-button');
	      	likeButton.style.color = '#66BB6A';
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

		/*
			This if statement has the dislike section first because of the .includes()
			method on the currentTargetClass string. Searching for just 'like-button'
			matches on both 'dislike-button' and 'like-button' alike. Searching for
			'dislike-button' first ensures we don't get a false match because it will
			only run the dislike section if it matches the entire 'dislike-button' phrase.
		*/
	    if (currentTargetClass.includes('dislike-button')) { //dislike
	      this.likeCount -=1;
	      //Update the UI
	      currentTarget.style.color = '#ddd';
	      $(currentTarget).removeClass('dislike-button');
	      $(currentTarget).addClass('like-button');
	      $likeCount.text(this.likeCount);
	      // Remove this user from the likeBy relation of this post and save
	      likedBy.remove(user);
	      this.model.save().then(function () {
	      	var createdBy = self.model.get('createdBy');
	      });
	    } else if (currentTargetClass.includes('like-button')) { //like
	      this.likeCount += 1;
	      //Update the UI
	      currentTarget.style.color = '#66BB6A';
	      $(currentTarget).removeClass('like-button');
	      $(currentTarget).addClass('dislike-button');
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