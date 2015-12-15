
BeMe.Views.DashboardMap = BeMe.Views.DashboardBaseView.extend({
  initialize: function () {
    this.template = _.template($('#dashboard-map-view').text());
    this.render();
    this.initializeMap();
    this.initializeBarMarkers();
    this.infoWindow = new google.maps.InfoWindow({
      content:null,
    });
  },

  initializeMap: function () {
    var self = this;
    var user = Parse.User.current();
    var userLocation = {lat: user.get('location')._latitude, lng: user.get('location')._longitude};
    
    // Using this.map gives a reference to the map for the entire view
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: userLocation,
      zoom:14
    });

    var marker = new google.maps.Marker({
      position: userLocation,
      map: this.map,
      title: "You are here"
    });

    marker.addListener('click', function () {
      var infoWindow = self.infoWindow;
      infoWindow.setPosition(userLocation);
      infoWindow.setContent('You are here');
      infoWindow.open(self.map);
    });
  },

  initializeBarMarkers: function () {
    var self = this;
    var user = Parse.User.current();

    var query = new Parse.Query('User');
    //CHANGE THE DISTANCE TO user.get('maxDistance') AFTER WE GET THE SLIDER WORKING
    query.withinMiles("location", user.get('location'), 100);
    query.equalTo('userType', 'business');
    if (user.get('userType') == 'business') {
      query.notEqualTo('businessName', user.get('businessName'));
    }
    query.find().then(function (bars) {

      _.each(bars, function (i) {
        var userLocation = i.get('location');
        var position = {lat: userLocation._latitude, lng: userLocation._longitude};

        var marker = new google.maps.Marker({
          position:position,
          map: self.map,
          title: i.get('businessName'),
        });

        marker.addListener('click', function (markerObject) {
          var infoWindow = self.infoWindow;

          infoWindow.setPosition(position);
          var contentTemplate = _.template($("#map-popout-view").text());
          var renderedContent = contentTemplate(i);
          infoWindow.setContent(renderedContent);
          infoWindow.open(self.map);
        });

      });

    });
  }
});