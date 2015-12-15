BeMe.Views.BackendBeerList = Parse.View.extend({
	initialize: function () {
    this.beerType = null;
    this.pageNumber = 1;
    this.views = [];
		this.render();

    var self = this;
    this.collection = new BeMe.Collections.BeerResults();
    this.addSpinner();
    Parse.User.current().fetch().then(function () {
      self.loadDraftBeers();
    });
	},

	template: _.template($('#backend-beer-view').text()),

	render: function () {
		this.$el.html(this.template(this.model));
		$('.body-container').append(this.el);
		BeMe.renderedViews.push(this);

		$('#backend-add-beer').click(function(){
			$('.beer-search').toggleClass('beer-search-shift');
			$('#backend-draft-tab').removeClass('active-beer-type');
			$('#backend-bottle-tab').removeClass('active-beer-type');
			$('.profile-beer-list').addClass('hidden');
		});
    $('#show-beer-tools').click(function(){
      $('.show-beer-cancel').addClass('beer-cancel-shift');
    });
    function resetSearchFunction() {
      $('.beer-search').removeClass('beer-search-shift');
      $('.profile-beer-list').removeClass('hidden');
    }

		$('#backend-draft-tab, #backend-bottle-tab').click(resetSearchFunction);

		$('#beer-submit').click(function(){
			$('.narrow-container').addClass('narrow-container-shift');
			$('.profile-beer-list').removeClass('hidden');
			$('.beer-results-cancel').addClass('show');
		});

    
	},

  events: {
    'submit .beer-search form' : 'searchBreweryDB',
    'click #backend-bottle-tab' : 'loadBottledBeers',
    'click #backend-draft-tab' : 'loadDraftBeers',
    'click .load-more-button' : 'loadMore'
  },

  routeBack: function () {
    BeMe.Router.navigate('backend/beer', true);
  },

  addSpinner: function () {
    $('.profile-beer-list').addClass('hidden');
    $('.beer-loading').removeClass('hidden');
  },

  removeSpinner: function () {
    $('.profile-beer-list').removeClass('hidden');
    $('.beer-loading').addClass('hidden');
  },

  emptyBeerList: function () {
    BeMe.removeGroup(this.views);
    $('.profile-beer-list ul').empty();
  },

  searchBreweryDB: function (e) {
    this.addSpinner();
    e.preventDefault();
    $("#backend-draft-tab, #backend-bottle-tab").removeClass('active-beer-type');
    var self = this;
    var queryString = $('.beer-search input').val();
    console.log(queryString);


    Parse.Cloud.run('searchBrewery', {queryString:queryString})
    .then(function (beers) {

      self.collection.remove();
      self.removeSpinner();
      self.collection.reset();

      self.emptyBeerList();
      $('.load-more-button').addClass('hidden');


      if (beers) {
        self.collection.add(beers);
        console.log(self.collection);

        self.collection.render();
      } else {
        //'no results found'
        var div = document.createElement("div");
        $(div).html('<h1>No results found</h1>');
        $('.profile-beer-list ul').append(div);
      }

      BeMe.Router.navigate('backend/beer/results');

    }, function (error) {
      BeMe.Router.navigate('backend/beer/results');
      alert('error');
      self.routeBack();
    });
  },

  loadDraftBeers:function () {
    this.addSpinner();
    this.pageNumber = 1;
    this.beerType = 'draftBeers';

    var self = this;
    $("#backend-bottle-tab").removeClass('active-beer-type');
    $("#backend-draft-tab").addClass('active-beer-type');

    var array = this.getIdArray(Parse.User.current().get('draftBeers'),1);
    if (array.length === 0) {
      this.emptyBeerList();
      this.removeSpinner();
      $('.profile-beer-list ul').append('<h1> No beers in list</h1>');
      return;
    };

    Parse.Cloud.run('getBeers', {array:array})
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
    this.addSpinner();
    this.pageNumber = 1;
    this.beerType = 'bottledBeers';

    var self = this;
    $("#backend-draft-tab").removeClass('active-beer-type');
    $("#backend-bottle-tab").addClass('active-beer-type');

    var array = this.getIdArray(Parse.User.current().get('bottledBeers'),1);
      if (array.length === 0) {
        this.emptyBeerList();
        this.removeSpinner();
        $('.profile-beer-list ul').append('<h1> No beers in list</h1>');
      return;
    };

    Parse.Cloud.run('getBeers', {array:array})
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
    list = list || [];
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
    for(var i = max; i >= realMin; i--) {
      arrayOfIds.push(list[i]);
    }
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

    Parse.Cloud.run('getBeers', {array:this.getIdArray(Parse.User.current().get(beerType),pageNumber)})
    .then(function (e) {
      self.removeSpinner();
      _.each(e, function (i) {
        var newView = new BeMe.Views.BackendBeer({model:i, type:'bottledBeers'});
        self.views.push(newView);
      });
    }, function (e) {
      alert(error);
    });

  }
});

BeMe.Views.BackendBeer = Parse.View.extend({
  tagName: 'li',

  initialize: function () {
    this.render();
  },

  template: _.template($('#backend-beer-list-view').text()),

  render: function () {
    this.$el.html(this.template(this.model));
    $('.profile-beer-list ul').append(this.el);
  },

  events: {
    'click #delete-beer' : 'removeFromList'
  },

  removeFromList: function () {
    var user = Parse.User.current();
    var list = this.options.type;
    var listToRemoveFrom = user.get(list);

    console.log(listToRemoveFrom);
    var self = this;

    var newList = _.reject(listToRemoveFrom, function (i) {
      return i === self.model.id;
    });

    console.log(newList);
    user.set(list, newList);
    user.save();
    this.remove();
  }
});

BeMe.Collections.BeerResults = Parse.Collection.extend({
  initialize: function () {
    this.views = [];
  },

  render: function () {
    var self = this;
    this.remove();
    this.views = [];
    this.each(function (i) {
      var view = new BeMe.Views.BeerResult({model:i, collection:self});
      self.views.push(view);
    });
  },

  remove: function () {
    BeMe.removeGroup(this.views);
  }
});

BeMe.Views.BeerResult = Parse.View.extend({
  tagName: 'li',

  initialize: function () {
    this.render();
  },

  template: _.template($('#backend-beer-result').text()),

  render: function () {
    this.$el.html(this.template(this.model));
    $('.profile-beer-list ul').append(this.el);

    $('#choose-beer-type').click(function(){
      $('.beer-type').removeClass('hidden');
    });
  },

  events: {
    'click #draft-select': 'addToDraft',
    'click #bottle-select': 'addToBottled'
  },

  addToDraft: function () {
    var id = this.model.id;
    var user = Parse.User.current();

    user.addUnique('draftBeers', id);
    user.save();

    this.routeBackToList();
  },

  addToBottled: function () {
    var id = this.model.id;
    var user = Parse.User.current();

    user.addUnique('bottledBeers', id);
    user.save();

    this.routeBackToList();
  },

  routeBackToList: function () {
    BeMe.Router.navigate('backend/beer', true);
  }
});