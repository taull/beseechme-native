// 'use strict';


// $('.barback-breadcrumbs').click(function(){
// 	$('.barback-tabs').toggleClass('barback-tabs-shift');
// });

// from a jQuery collection
autosize($('#business-status'));

$('.accordion').accordion({
    "transitionSpeed": 400
});

$('#only-one [data-accordion]').accordion();
$('#barback-menu [data-accordion]').accordion();
$('#backend-settings [data-accordion]').accordion();



//Initialize Parse

Parse.initialize("oRWDYma9bXbBAgiTuvhh0n4xOtJU4mO5ifF1PuBH", "iNmHdD8huWDsHhtc50F9ddlQqx5hH6AkpWvPlQL9");

//namespacing

(function () {
	window.BeMe = {};
	BeMe.Views = {};
	BeMe.Models = {};
	BeMe.Collections = {};
	BeMe.Router = {};
	BeMe.renderedViews = [];


  //route object
  BeMe.Calendar = {};
  BeMe.Dashboard = {};

  //misc objects
  BeMe.confirmationMessage = {};
})();

/*
	Begin utility functions
*/

BeMe.searchUsers = function (searchString) {
  var encodedString = encodeURIComponent(searchString);

  BeMe.Router.navigate('search/' + encodedString, true);
}

BeMe.removeGroup = function (group) {
  _.each(group, function (i) {
    i.remove();
  });
  group = [];
}

BeMe.removeAllViews = function () {
  for (var i = BeMe.renderedViews.length - 1; i >= 0; i--) {
		BeMe.renderedViews[i].removeRenderedView();
	};
};

BeMe.removeViewFromRenderedViews = function (view) {
  var cid = view.cid;
  var index = _.findIndex(BeMe.renderedViews, function (n) {return n.cid === cid});
  BeMe.renderedViews.splice(index,1); //remove from the array
  if (view.subViews) {
    _.each(view.subViews, function (i) { //remove the subViews
      i.remove();
    });
    view.subViews = [];
  }
};

BeMe.createImageFile = function ($fileContainer) {
  var fileObject = $fileContainer[0].files;

  if(fileObject.length) {
    if (fileObject[0].type.search('image') == -1) {
      alert('Image type needs to be an image');
    } else {
     var name = fileObject[0].name;
     var file = fileObject[0];
     var image = new Parse.File(name, file);
    }
  } else {
   var image = undefined;
  }

  return image;
};

//Pass 'true' to redirect to dashboard
BeMe.setCurrentLocation = function (boolean) {
  var user = Parse.User.current();


    new Parse.GeoPoint.current().then(function (currentLocation) {
      user.set('location', currentLocation);
      user.set('lastUpdatedLocation', new Date());

      var latlng = {lat:  currentLocation._latitude , lng: currentLocation._longitude};

      var geocoder = new google.maps.Geocoder;


      geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {

          var locationComponents = results[0].address_components;

          function searchByComponentType(string) {
            return locationComponents.filter(function (i) {
              return !i.types.toString().search(string);
            })[0];
          }

          var address = [searchByComponentType('street_number').long_name, searchByComponentType('route').long_name].join(' ');
          var city = searchByComponentType('locality').long_name;
          var state = searchByComponentType('administrative_area_level_1').short_name;
          var zip = searchByComponentType('postal_code').long_name;

          user.set('address', address);
          user.set('city', city);
          user.set('state', state);
          user.set('zip', zip);
          user.save();
          if (boolean) {
            BeMe.Router.navigate('dashboard', true);
          }
        } else {
          alert("Error: " + status);
        }
      });

    });
};

BeMe.CheckIn = function (user, business) {
  var confirmed = confirm("Check in?");

  if (confirmed) {
    var checkInStatus = new Parse.Object('status');

    var thisMoment = new moment(new Date());
    var dateFormatted = thisMoment.format('h:mma [on] MMMM Do, YYYY');

    var content = '<h1>' + user.get('firstName') + '</h1>' + ' ' + '<h1>' + user.get('lastName') + '</h1>' + ' ' + '<p>' + 'checked into' + '</p>' + ' ' + '<a>' + business.get('businessName') + '</a>';

    checkInStatus.set('location', user.get('location'));
    checkInStatus.set('content', content);
    checkInStatus.set('createdBy', user);
    checkInStatus.set('statusType', 'Check In');

    checkInStatus.save({
      success: function () {
        BeMe.showConfirmation("You checked into " + business.get('businessName') + "!");
      }, error: function () {
        alert('Error saving object');
      }
    });
  }
}

BeMe.FollowUser = function (user) {
  var currentUser = Parse.User.current();
  var relation = currentUser.relation("barsFollowing");
  if(user.id !== currentUser.id) {
    relation.add(user);
    currentUser.save().then(function () {
      if (user.get('userType') == 'business') {
        BeMe.showConfirmation("You followed " + user.get('businessName') + "!");
      } else {
        BeMe.showConfirmation("You followed " + user.get('firstName') + " " + user.get('lastName') + "!");
      }
    });
  } else {
    alert("You can't follow yourself");
  }
};

BeMe.UnfollowUser = function (user) {
  var currentUser = Parse.User.current();
  var relation = currentUser.relation('barsFollowing');

  relation.remove(user);
  currentUser.save();
};

BeMe.showConfirmation = function (string) {
  var $confirmMessageContainer = $('.confirm-message-container');

  function closeConfirmation () {
    $confirmMessageContainer.css('top','20px');
    $confirmMessageContainer.off('click','#confirm-message-close');
    BeMe.confirmationMessage.isActive = false;
  };

  //If the notification is already being displayed
  if (BeMe.confirmationMessage.isActive) {
    clearInterval(BeMe.confirmationMessage.timerId); //clear the interval
    $('.confirm-message h1').text(string);
    BeMe.confirmationMessage.timerId = setTimeout(function () {
      closeConfirmation();
    },2000);
  } else { //if it's not been displayed yet
    //make sure the application knows it is active
    BeMe.confirmationMessage.isActive = true;

    //update the text and move the notification into view
    $('.confirm-message h1').text(string);
    $confirmMessageContainer.css('top', '60px');

    //set up an event handler to close the notification
    $confirmMessageContainer.on('click','#confirm-message-close', function () {
      closeConfirmation();
    });

    //set up a timeout for 2 seconds to automatically close
    BeMe.confirmationMessage.timerId = setTimeout(function () {
      closeConfirmation();
    },2000);
  }
};

/*
	Prototype Manipulation
*/

/*
	View.removeRenderedView
	- removes the rendered View as well as removing it from the renderedViews array
*/

Parse.View.prototype.removeRenderedView = _.wrap(
  Parse.View.prototype.remove,
  function (originalFunction) {
    originalFunction.apply(this);
    BeMe.removeViewFromRenderedViews(this);
  }
);



$(document).ready(function () {
	BeMe.Router = new Router();
	Parse.history.start();
});
