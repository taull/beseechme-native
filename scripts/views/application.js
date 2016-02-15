BeMe.Views.Application = Backbone.View.extend({
	initialize: function () {
		this.render();
		// May be useful when routing from login or registration route
    // this.listenTo(BeMe.Router, "route" , this.render);
	},

	el: "#application",

	template: _.template($('#application-view').text()),

  events: {
    'click #logout' : 'logOut',
    'click #sign-in' : 'signIn',
  },

  logOut: function () {
    var self = this;
    Parse.User.logOut().then(function () {
      self.render();
      BeMe.Router.navigate('', true);
    });
  },

  signIn: function () {
    BeMe.Router.navigate('', true);
  },

  clear: function () {
    this.$el.find('.bar-search input').val('');
    this.barSearchResultsView.removeRenderedView();
  },

	render: function () {
		this.$el.html(this.template(this.model));
    this.opened = false;
    var self = this;
  }
});
