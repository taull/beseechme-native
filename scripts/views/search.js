BeMe.Views.Search = Parse.View.extend({
	initialize: function () {
		this.render();
	},

	template: _.template($('#search-view').text()),

	render: function () {
    var self = this;
    var user = Parse.User.current();
    user.fetch().then(function (i) {
      console.log(i);
      self.$el.html(self.template(i));
      $('.body-container').append(self.el);
    });
		
		BeMe.renderedViews.push(this);
	},

  events: {

  }

});