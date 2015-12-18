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

    $('#standalone').popup({
      color: '#dfdfdf',
      opacity: 1,
      transition: '0.3s',
      scrolllock: true,
      autozindex: true
    });
	},

	events: {
		'submit form': 'postStatus',
	},

	postStatus: function (e) {
		e.preventDefault();
    var self = this;
    var $fileContainer = $("#camera-file");
    var contentHolder = $("#business-status");

    var fileIsChosen = !!$fileContainer[0].files.length;

    if (fileIsChosen) { //if there is a file chosen
      var image = BeMe.createImageFile($fileContainer); //create the image file
      if(image == undefined) {
        return false;
      }
    }

    //conditional where we check to see if there was a file chosen && it was processed correctly

    var user = Parse.User.current();

		var content = contentHolder.val();
		var status = new Parse.Object('status');
		status.set('content', content);
		status.set('image', image);
		status.set('createdBy', user);
    status.set('location', user.get('location'));
    status.set('statusType', 'Text');
		status.save().then(function (e){
			contentHolder.val('');
			$('#camera-file').val('');
      console.log(e);
      self.collectionReference.add(e, {at:0});
		});
	}
});

BeMe.Collections.Feeds = Parse.Collection.extend({
  initialize: function () {
    var self = this;
    this.views = [];
    this.on('add remove', this.render);
    this.fetch(this.query).then(function (e) {
      console.log(e);
      self.render();
    });
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
