BeMe.Views.Backend = Parse.View.extend({
	initialize: function () {
		this.render();
	},

	template: _.template($('#backend-view').text()),

	render: function () {
		this.$el.html(this.template(this.model));
		$('.body-container').append(this.el);
		BeMe.renderedViews.push(this);

    $('#slideout-trigger').click(function(){
      $('.backend-slideout').toggleClass('show');
    });

    $('.business-tabs-expand').click(function(){
      $('.business-tabs-container').toggleClass('business-tabs-container-expand');
    });

    $('#location-trigger').click(function(){
      $('.update-location').toggleClass('update-location-shift');
      $('.update-location-info').toggleClass('left-100');

    });

	},

  events: {
    'submit form[name="bar-search"]' : 'search'
  },

  search: function (e) {
    e.preventDefault();
    var searchString = $('input').val();
    BeMe.searchBars(searchString);
  }
});