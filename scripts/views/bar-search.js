BeMe.Views.BarSearch = Parse.View.extend({
  initialize: function () {
    this.render();
  },

  template: _.template($('#bar-search-view').text()),

  render: function () {
    this.$el.html(this.template(this.options));
    $('.body-container').append(this.el);
    BeMe.renderedViews.push(this);
  },

  events: {
    'submit form' : 'search',
    'click .search-tabs li' : 'tabClickHandler'
  },

  tabClickHandler: function (e) {
    var $clickedElement = $(e.currentTarget);

    var matchObject = {Bars:"business", People:"consumer"};
    var type = matchObject[$clickedElement.text()];

    BeMe.Search.BarSearchResults.displayType(type);
  },

  search: function (e) {
    e.preventDefault();
    var searchString = $('input').val();
    BeMe.searchBars(searchString);
  }
});

BeMe.Views.BarSearchResults = Parse.View.extend({
  initialize: function () {
    this.subViews = [];
    this.render();
  },

  render: function () {
    BeMe.removeGroup(this.subViews);
    var self = this;
    if(this.collection.length === 0) {
      alert('No results found');
    } else {
      this.displayType('business');
    }
  },

  displayType: function (type) {
    var self = this;

    var $tabs = $('.search-tabs li');
    var barsTab = $tabs[0];
    var peopleTab = $tabs[1];

    var clickedTab;

    if(type === 'business') {
      clickedTab = barsTab;
    } else {
      clickedTab = peopleTab;
    }

    $tabs.removeClass('active-tab');
    $(clickedTab).addClass('active-tab');


    var usersToRender = this.collection.filter(function (bar) {
      return bar.get('userType') === type;
    });

    //remove the existing views from the screen
    BeMe.removeGroup(this.subViews);

    //render proper views to the screen
    _.each(usersToRender, function(bar) {
      self.subViews.push(new BeMe.Views.BarSearchResult({model:bar}));
    });
  }
});

BeMe.Views.BarSearchResult = Parse.View.extend({
  tagName: 'li', 

  initialize: function () {
    this.render();
  },

  template: _.template($('#bar-search-results-view').text()),

  render: function () {
    this.$el.html(this.template(this.model));
    $('.bar-search-results ul').append(this.el);
  }
});