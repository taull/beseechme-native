BeMe.Views.Business = Parse.View.extend({
  initialize: function () {
    this.render();
  },

  template: _.template($('#business-view').text()),

  render: function () {
    this.$el.html(this.template(this.model));
    $('.body-container').append(this.el);
    BeMe.renderedViews.push(this);

    $('#slideout-trigger').click(function(){
      $('.backend-slideout').toggleClass('show');
    });

    $('#search-trigger').click(function(){
      $('.bar-search-wrap').toggleClass('bar-search-shift');
    });

    $('#location-trigger').click(function(){
      $('.update-location').toggleClass('update-location-shift');
      $('.update-location-info').toggleClass('left-100');
    });
  }
});