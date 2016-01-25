BeMe.Views.Dashboard = Parse.View.extend({
  initialize: function () {
    this.render();
  },

  template: _.template($('#dashboard-view').text()),

  render: function () {
    var self = this;
    this.$el.html(this.template(this.model));
    $('.body-container').append(this.el);
    BeMe.renderedViews.push(this);

    $('.update-location').click(function(){
      $('.update-location').toggleClass('update-location-shift');
      $('.update-location-info').toggleClass('left-100');
      $('.arrow').toggleClass('rotate-arrow');

    });

    $('#location-trigger').click(function(){
      $('.update-location').toggleClass('update-location-shift');
      $('.update-location-info').toggleClass('left-100');
      $('.arrow').toggleClass('rotate-arrow');

    });

    $('.open-listing-container').click(function(){
      $('.listing-container').toggleClass('top0');
    });

    $('#left-column-trigger').click(function(){
      $('.left-column').toggleClass('left-column-shift');
      $('.middle-column').toggleClass('middle-column-shift');
    });

    

    $('header form[name="bar-search"').submit(function(e) {
      self.userSearch(e);
    });



    $(function() {

      function DropDown(el) {
        this.ddAlt = el;
        this.initEvents();
      }
      DropDown.prototype = {
          initEvents : function() {
              var obj = this;

              obj.ddAlt.on('click', function(event){
                  $(this).toggleClass('active');
                  event.stopPropagation();
              }); 
          }
      }

      if (!BeMe.dd) {
        var ddAlt = new DropDown( $('#ddAlt') );
        BeMe.dd = true;
      }

      $(document).click(function() {
        // all dropdowns
        $('.wrapper-dropdown-1').removeClass('active');
      });

    });

    
  },

  events: {
    'click .update-location' : 'updateLocationInfo',
    'submit form[name="bar-search"]' : 'userSearch',
  },

  updateLocationInfo: function () {
    BeMe.setCurrentLocation();
  },

  userSearch: function (e) {
    e.preventDefault();
    var form = e.currentTarget;
    var searchString = $(form).find('input').val();
    BeMe.searchUsers(searchString);
  }
});