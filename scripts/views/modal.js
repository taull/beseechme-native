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
    'click #post-modal-close' : 'close'
  },

  close: function () {
    this.remove();
  },
});
