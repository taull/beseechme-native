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
    'click .post-modal-tabs li' : 'openStatusEditor'
  },

  closeHandler: function (e) {
    if (e.target == this.el) {
      this.close();
    }
  },

  close: function () {
    this.remove();
  },

  openStatusEditor: function (event) {
    var id = event.currentTarget.id;
    console.log(id);

    var matchObject = {
      postText: '#post-status-text-view',
      postPhoto: '#post-status-photo-view',
      postComment: '#post-status-calendar-view',
      postVideo: '#post-status-video-view',

    };

    var compiledTemplate = _.template($(matchObject[id]).text())();
    $('.post-modal').html(compiledTemplate);
  }

});
