BeMe.Views.Settings = Parse.View.extend({
	initialize: function () {
		this.render();
		$('#backend-settings [data-accordion]').accordion();

	},

	template: _.template($('#settings-view').text()),

	render: function () {
    var self = this;
    var user = Parse.User.current();
    user.fetch().then(function (i) {
      console.log(i);
      self.$el.html(self.template(i));
      $('.body-container').append(self.el);
      $('option[value=' + user.get("state") + ']').attr('selected', true);
    });
		
		BeMe.renderedViews.push(this);
	},

  events: {
    'click #avatar-upload' : 'uploadAvatar',
    'click #cover-upload' : 'uploadCover',
    'click .save-button' : 'updateProfile'
  },

  updateProfile: function (e) {
    e.preventDefault();
    var user = Parse.User.current();

    var businessName = $('input[type="business-name"]').val();
    var handle = $('input[name="handle"]').val();
    var city = $('input[name="city"]').val();
    var state = $('select[name="state"]').val();
    var zip = $('input[name="zip"]').val();
    var phoneNumber = $('input[name="phone-number"]').val();
    var website = $('input[name="website"]').val();

    user.set('businessName', businessName);
    user.set('handle', handle);
    user.set('City',city);
    user.set('state',state);
    user.set('zip',zip);
    user.set('phoneNumber',phoneNumber);
    user.set('website',website);

    user.save().then(function() {
      alert('Saved!');
    });
  },

  uploadAvatar: function () {
    var image = BeMe.createImageFile($('input[name="avatar"]'));

    var user = Parse.User.current();

    user.set('avatar', image);
    //save and sync
    user.save().then(function () {
      user.fetch();
      var div = document.createElement('div');
      div.className = 'upload-confirm';
      $(div).html('<i class=“fa fa-check-circle”></i>');

      $('.settings-sublist form').append(div);

      _.delay(function () {
        $(div).fadeOut();
        div.remove();
      }, 4000);
    });
  },

  uploadCover: function () {
    var image = BeMe.createImageFile($('input[name="cover"]'));

    var user = Parse.User.current();

    user.set('coverPhoto', image);
    //save and sync
    user.save().then(function () {
      user.fetch();
      var div = document.createElement('div');
      div.className = 'upload-confirm';
      $(div).html('<i class=“fa fa-check-circle”></i>');

      $('.settings-sublist form').append(div);

      _.delay(function () {
        $(div).fadeOut();
        div.remove();
      }, 4000);
    });
  },
});
