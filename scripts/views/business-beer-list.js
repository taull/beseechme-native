BeMe.Views.BusinessBeerList = Parse.View.extend({
  initialize: function () {
    this.beerType = null;
    this.pageNumber = 1;
    this.views = [];
    this.render();


    this.collection = new BeMe.Collections.BeerResults();
    this.loadDraftBeers();
    this.addSpinner();
    //added comment for test
  },

  template: _.template($('#business-beer-view').text()),

  render: function () {
    this.$el.html(this.template(this.model));
    $('.body-container').append(this.el);
    BeMe.renderedViews.push(this);
  },

  events: {
    'click #backend-bottle-tab' : 'loadBottledBeers',
    'click #backend-draft-tab' : 'loadDraftBeers',
    'click .tabs-loading' : 'addSpinner',
    'click .load-more-button' : 'loadMore'
  },

  routeBack: function () {
    BeMe.Router.navigate('backend/beer', true);
  },

  addSpinner: function () {
    $('.profile-beer-list').addClass('hidden');
    $('.beer-loading').removeClass('hidden')
  },

  removeSpinner: function () {
    $('.profile-beer-list').removeClass('hidden')
    $('.beer-loading').addClass('hidden');
  },

  emptyBeerList: function () {
    BeMe.removeGroup(this.views);
  },

  loadDraftBeers:function () {
    this.pageNumber = 1;
    this.beerType = 'draftBeers';

    var self = this;
    $("#backend-bottle-tab").removeClass('active-beer-type');
    $("#backend-draft-tab").addClass('active-beer-type');
    //Parse.User.fetch().then do what's below?
    Parse.Cloud.run('getBeers', {array:this.getIdArray(self.model.get('draftBeers'),1)})
    .then(function (e) {
      self.emptyBeerList();
      self.removeSpinner();
      _.each(e, function (i) {
        var newView = new BeMe.Views.BackendBeer({model:i,type:'draftBeers'});
        self.views.push(newView);
      });
    });
  },

  loadBottledBeers: function () {
    this.pageNumber = 1;
    this.beerType = 'bottledBeers';

    var self = this;
    $("#backend-draft-tab").removeClass('active-beer-type');
    $("#backend-bottle-tab").addClass('active-beer-type');
    //Parse.User.fetch().then do what's below?
    Parse.Cloud.run('getBeers', {array:this.getIdArray(self.model.get('bottledBeers'),1)})
    .then(function (e) {
      self.emptyBeerList();
      self.removeSpinner();
      _.each(e, function (i) {
        var newView = new BeMe.Views.BackendBeer({model:i, type:'bottledBeers'});
        self.views.push(newView);
      });
    });
  },

  getIdArray: function (list, pageNumber) {
    //note the numbers passed around in these small calculations are effectively
    //the *index* number in the `list` array
    var max = list.length - (10 * (pageNumber - 1) + 1);
    var min = max - 9;
    var realMin = min >= 0 ? min : 0;

    if (min <= 0) { //if we hit the end of the results...
      $('.load-more-button').addClass('hidden'); //hide it
    } else {
      $('.load-more-button').removeClass('hidden'); //show it
    }
    //we are iterating in reverse order to make the ones added to the list most
    //recent appear first without having to store extra data in the array (addedAt date, etc...)
    var arrayOfIds = [];
    for (var i = max; i >= realMin; i--) {
      arrayOfIds.push(list[i]);
    }
    console.log("Id's in array that are going to hit the BreweryDB API");
    console.log(arrayOfIds);
    return arrayOfIds;
  },

  loadMore: function () {
    this.pageNumber++; //should increment AND store the value
    console.log(this);
    var pageNumber = this.pageNumber;
    var beerType = this.beerType;

    console.log(pageNumber);
    console.log(beerType);

    var self = this;

    Parse.Cloud.run('getBeers', {array:this.getIdArray(self.model.get(beerType),pageNumber)})
    .then(function (e) {
      self.removeSpinner();
      _.each(e, function (i) {
        var newView = new BeMe.Views.BackendBeer({model:i, type:'bottledBeers'});
        self.views.push(newView);
      });
    });
  }
});