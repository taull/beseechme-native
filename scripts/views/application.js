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

    var self = this;
    //The search overlay feature
    $('.bar-search').submit(function(e) {
      e.preventDefault();

      if (self.barSearchResultsView) {
        self.barSearchResultsView.removeRenderedView();
      }

      var userType = $('select[name="user-type"]').val();
      var queryString = $('.bar-search input').val();

      var lowercaseField;
      if (userType === 'business') {
        lowerCaseField = 'businessNameLowercase';
      } else {
        lowerCaseField = 'fullNameLowercase';
      }

      var nameQuery = new Parse.Query('User');
      nameQuery.contains(lowerCaseField, queryString);
      nameQuery.equalTo('userType', userType);

      var handleQuery = new Parse.Query('User');
      handleQuery.contains('handle', queryString);
      handleQuery.equalTo('userType', userType);

      var query = Parse.Query.or(nameQuery, handleQuery);

      query.find().then(function (i) {
        console.log(i);
        var collection = new Parse.Collection(i);
        self.barSearchResultsView = BeMe.Search.BarSearchResults = new BeMe.Views.BarSearchResults({collection:collection});
      });
    });
  }
});












