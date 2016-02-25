BeMe.Views.Search = Parse.View.extend({
	initialize: function () {
		this.render();
		this.userType = "Business";
	},

	template: _.template($('#search-view').text()),

	render: function () {
    var self = this;
    var user = Parse.User.current();
    self.$el.html(self.template());
    $('.body-container').append(self.el);

		BeMe.renderedViews.push(this);
	},

  events: {
    'submit .bar-search' : 'search',
    'click .bar-search .fa-times-circle' : 'clear',
		'click .user-select li' : 'toggleUserType'
  },

	toggleUserType: function (e) {
		$currentTarget = $(e.currentTarget);
		if (!$currentTarget.hasClass('active-user')) { // if it's not the currently selected element
			$currentTarget.siblings().removeClass('active-user');
			$currentTarget.addClass('active-user');
			this.userType = $currentTarget.text();
		}
	},

  clear: function () {
    this.$el.find('.bar-search input').val('');
    this.barSearchResultsView.removeRenderedView();
  },

  search: function(e) {
    e.preventDefault();
    var dd = this.dd;
    var self = this;

    if (this.barSearchResultsView) {
      this.barSearchResultsView.removeRenderedView();
    }

    var userType = this.userType.toLowerCase();

    var queryString = $('.bar-search input').val().toLowerCase();

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
      var collection = new Parse.Collection(i);
      self.barSearchResultsView = new BeMe.Views.BarSearchResults({collection:collection});
    });
  },
});
