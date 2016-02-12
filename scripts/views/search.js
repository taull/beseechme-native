BeMe.Views.Search = Parse.View.extend({
	initialize: function () {
		this.render();
    function DropDown(el) {
        this.dd = el;
        this.placeholder = this.dd.children('span');
        this.opts = this.dd.find('ul.dropdown > li');
        this.val = '';
        this.index = -1;
        this.initEvents();
    }
    DropDown.prototype = {
        initEvents : function() {
            var obj = this;

            obj.dd.on('click', function(event){
                $(this).toggleClass('active');
                return false;
            });

            obj.opts.on('click',function(){
                var opt = $(this);
                obj.val = opt.text();
                obj.index = opt.index();
                obj.placeholder.text(obj.val);
            });
        },
        getValue : function() {
            return this.val;
        },
        getIndex : function() {
            return this.index;
        }
    }

    this.dd = new DropDown( $('#dd') );

    $(document).click(function() {
      // all dropdowns
      $('.wrapper-dropdown-1').removeClass('active');
    });
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
    'submit .bar-search' : 'search'
  },

  search: function(e) {
    e.preventDefault();
    var dd = this.dd;
    var self = this;

    if (this.barSearchResultsView) {
      this.barSearchResultsView.removeRenderedView();
    }

    var userType;
    if (dd.getValue() === 'Business') {
      userType = 'business';
    } else if (dd.getValue() === 'Friends') {
      userType = 'consumer';
    } else {
      alert('Please select a userType');
      return;
    }

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
      console.log(i);
      var collection = new Parse.Collection(i);
      self.barSearchResultsView = new BeMe.Views.BarSearchResults({collection:collection});
    });
  },
});