'use strict';


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
})();

/*
	Begin utility functions
*/

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

/*
	End utility functions
	--------------------------
	Begin Views Section
*/

BeMe.Views.Application = Parse.View.extend({
	initialize: function () {
		this.render();
		this.isApplicationView = true;
	},

	el: "#application",

	template: _.template($('#application-view').text()),

	render: function () {
		this.$el.html(this.template(this.model));
	}
});

BeMe.Views.Index = Parse.View.extend({
	initialize: function () {
		this.render();
	},

	template: _.template($('#index-route').text()),

	render:function () {
		this.$el.html(this.template(this.model));
		$('#application').append(this.el);
		BeMe.renderedViews.push(this);
	}
});

BeMe.Views.Backend = Parse.View.extend({
	initialize: function () {
		this.render();
	},

	template: _.template($('#backend-view').text()),

	render: function () {
		this.$el.html(this.template(this.model));
		$('.body-container').append(this.el);
		BeMe.renderedViews.push(this);
	}
});

BeMe.Views.Feed = Parse.View.extend({
	initialize: function () {
		this.render();
	},

	template: _.template($('#backend-feed-view').text()),

	render: function () {
		this.$el.html(this.template(this.model));
		$('#application').append(this.el);
		BeMe.renderedViews.push(this);
	}
})

/*
	End Views Section
	-----------------------------
	Begin Collections Section
*/



/*
	End Collections Section
	----------------------------
	Begin Router Section
*/

var Router = Backbone.Router.extend({
	routes: {
		'' : 'home',
		'backend' : 'backend',
		'backend/feed' : 'backendFeed',
	},

	initialize: function () {
		new BeMe.Views.Application();
	},

	home: function () {
		console.log('Index route fired');
		BeMe.removeAllViews();
	},

	backend: function () {
		console.log('Backend route fired');
		BeMe.removeAllViews();
		new BeMe.Views.Backend();
	},

	backendFeed: function () {
		BeMe.removeAllViews();
		new BeMe.Views.Backend();
		new BeMe.Views.Feed();
	}
});

/*
	End Router Section
	--------------------------
	Begin Glue Code
*/

$(document).ready(function () {
	BeMe.Router = new Router();
	Backbone.history.start();
});

/*
	End Glue Code
*/
