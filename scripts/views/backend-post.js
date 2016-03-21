BeMe.Views.BackendPost = Parse.View.extend({
	initialize: function () {
		this.render();
	},

	template: _.template($('#backend-post-view').text()),

	render: function () {
		this.$el.html(this.template(this.model));
		$('.body-container').append(this.el);
		BeMe.renderedViews.push(this);

		// $('#business-status').emojiPicker({
		//   height: '300px',
		//   width:  '450px',
		//   button: true,
		//   iconBackgroundColor: '#fff'
		// });
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

		//conditional where we check to see if there was a file chosen && it was processed correctly
    if (fileIsChosen) { //if there is a file chosen
      var image = BeMe.createImageFile($fileContainer); //create the image file
      if(image == undefined) {
        return false;
      }
    }

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
