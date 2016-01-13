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

    $('#search-trigger').click(function(){
      $('.bar-search-wrap').toggleClass('bar-search-shift');
    });

    //The search overlay feature
    $('.bar-search').submit(function(e) {
      e.preventDefault();

      var queryString = $('.bar-search input').val();

      var businessQuery = new Parse.Query('User');
      businessQuery.contains('businessNameLowercase', queryString);
      businessQuery.equalTo('userType', 'business');

      var handleQuery = new Parse.Query('User');
      handleQuery.contains('handle', queryString);

      var consumerQuery = new Parse.Query('User');
      consumerQuery.contains('fullNameLowercase', queryString);
      consumerQuery.equalTo('userType', 'consumer');

      var query = Parse.Query.or(businessQuery, consumerQuery, handleQuery);
      query.find().then(function (i) {
        console.log(i);
        var collection = new Parse.Collection(i);
        BeMe.Search.BarSearchResults = new BeMe.Views.BarSearchResults({collection:collection});
      });
    });
  }
});












