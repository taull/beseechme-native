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
      $('.search-container').toggleClass('search-container-shift');
      $('.wrapper-dropdown-2').removeClass('active');
      $('.body-container').toggleClass('body-container-shift');

      $('.search-results-wrap').toggleClass('search-results-fade');
      // setTimeout(function() {
      //   $('.search-results-wrap').toggleClass('search-results-shift');
      // }, 250);

    })


    // obj.dd.on('click', function(event){
    //   $(this).toggleClass('active');
    //   return false;
    // });


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

    var dd = new DropDown( $('#dd') );

    $(document).click(function() {
      // all dropdowns
      $('.wrapper-dropdown-1').removeClass('active');
    });

    var self = this;
    //The search overlay feature
    $('.bar-search').submit(function(e) {
      e.preventDefault();

      if (self.barSearchResultsView) {
        self.barSearchResultsView.removeRenderedView();
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
      console.log(userType);
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
        self.barSearchResultsView = new BeMe.Views.BarSearchResults({collection:collection});
      });
    });
  }
});












