BeMe.Views.BackendFeed = Parse.View.extend({
	initialize: function () {
		this.render();
		autosize($('#business-status'));
    this.collectionReference = new BeMe.Collections.Feeds();
	},

	template: _.template($('#backend-feed-view').text()),

	render: function () {
		this.$el.html(this.template(this.model));
		$('.body-container').append(this.el);
		BeMe.renderedViews.push(this);

		$('#backend-add-status').click(function(){
			$('.profile-tools').toggleClass('profile-tools-shift');
      $('#backend-myfeed-tab').removeClass('active-feed-type');
      $('#backend-mainfeed-tab').removeClass('active-feed-type');
      $('.bar-feed').addClass('hidden');
		});

    $('#backend-myfeed-tab').click(function(){
      $('.bar-feed').removeClass('hidden');
      $('#backend-myfeed-tab').addClass('active-feed-type');
      $('.profile-tools').toggleClass('profile-tools-shift');

    });
	},
});

BeMe.Collections.Feeds = Parse.Collection.extend({
	model: BeMe.Models.Status,
  initialize: function () {
    var self = this;
    this.views = [];
    this.on('add remove', this.render);
		FirebaseRef.child('statuses').orderByChild('createdBy').equalTo(BeMe.currentUser.authData.uid).once('value', function (snapshot) {
			snapshot.forEach(function (i) {
				self.add(i.val());
			});
			self.render();
		});
    // this.fetch(this.query).then(function (e) {
		// 	console.log(e);
    //   self.render();
    // });
  },

  query: new Parse.Query('status')
        .equalTo('createdBy', Parse.User.current())
        .include('createdBy')
        .descending('createdAt'),

  render: function () {
    var self = this;
    BeMe.removeGroup(this.views);
    this.each(function (i) {
      var feedPost = new BeMe.Views.Status({model:i, container: '.bar-feed'});
      self.views.push(feedPost);
    });
  }
});
