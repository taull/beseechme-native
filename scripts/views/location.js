BeMe.Views.Location = Parse.View.extend({
  initialize: function () {
    this.render();
  },

  template: _.template($('#location-view').text()),

  render: function () {
    this.$el.html(this.template(this.model));
    $('.body-container').append(this.el);
    BeMe.renderedViews.push(this);
  },

  events: {
    'click .location-button' : 'setCurrentLocation'
  },

  setCurrentLocation: function () {
    BeMe.setCurrentLocation(true);
  },
});