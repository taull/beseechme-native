BeMe.Views.Application = Parse.View.extend({
	initialize: function () {
		this.render();
    this.on('route', this.render, this);
	},

	el: "#application",

	template: _.template($('#application-view').text()),

  events: {
    'click #logout' : 'logOut',
    'click #sign-in' : 'signIn'
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

	render: function () {
		this.$el.html(this.template(this.model));
	}
});