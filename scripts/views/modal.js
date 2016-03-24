BeMe.Views.Modal = Backbone.View.extend({
  initialize: function () {
    this.render();
  },

  className: 'post-modal-wrap',

  template: _.template($('#post-modal-view').text()),

  render: function () {
    this.$el.html(this.template);
  },

  events: {
    'click #post-modal-close' : 'close',
    'click' : 'closeHandler',
    'click .post-modal-tabs li' : 'openStatusEditor',
    'submit form' : 'post'
  },

  closeHandler: function (e) {
    // if we click on the actual modal view as a whole instead of a nested element
    // close the modal (remove it);
    if (e.target == this.el) {
      this.close();
    }
  },

  close: function () {
    this.remove();
  },

  openStatusEditor: function (event) {
    var id = event.currentTarget.id;
    this.postType = id;

    var matchObject = {
      postText: '#post-status-text-view',
      postPhoto: '#post-status-photo-view',
      postComment: '#post-status-calendar-view',
      postVideo: '#post-status-video-view',
    };

    var statusType = matchObject[id];
    var compiledTemplate = _.template($(statusType).text())();
    $('.post-modal').html(compiledTemplate);
  },

  post: function (e) {
    e.preventDefault();
    this[this.postType]();
  },

  postText: function () {
    var content = $('textarea#text-status').val();
    var self = this;

    FirebaseRef.child('statuses').push({
      createdAt: new Date().toISOString(),
      statusType: 'Text',
      content:content,
      createdBy:BeMe.currentUser.authData.uid
    }, function (err) {
      if(!err) {
        self.close();
      } else {
        alert("Error " + err);
      }
    });
  },

  postPhoto: function () {
    console.log('postPhoto');
  },

  postComment: function () {
    console.log('postComment');
  },

  postVideo: function () {
    console.log('postVideo');
  }

});
