'use strict';


$('.barback-breadcrumbs').click(function(){
	$('.barback-tabs').toggleClass('barback-tabs-shift');
});

// from a jQuery collection
autosize($('#business-status'));

$('.accordion').accordion({
    "transitionSpeed": 400
});

$('#only-one [data-accordion]').accordion();

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
    renderedViews[i].removeRenderedView();
	};
};

function removeViewFromRenderedViews (view) {
  var cid = view.cid;
  var index = _.findIndex(renderedViews, function (n) {return n.cid === cid});
  renderedViews.splice(index,1); //remove from the array
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
    removeViewFromRenderedViews(this);
  }
)

/*
	End utility functions
	--------------------------
	Begin Views Section
*/

BeMe.Views.Index = Parse.View.extend({
	initialize: function () {
		this.render();
	},

	template: _.template($('#index-route').text()),

	render:function () {
		this.$el.html(this.template(this.model));
		$('.wide-container').append(this.el);
	}
});

BeMe.Views.BarBack = Parse.View.extend({
	initialize: function () {
		this.render();
	},

	template: _.template($('#barback-view').text()),

	render: function () {
		this.$el.html(this.template(this.model));
		$('body').append(this.el);
	}
});

/*
	End Views Section
	-----------------------------
	Begin Collections Section
*/

BeMe.Collection = Parse.Collection.extend({

});

/*
	End Collections Section
	----------------------------
	Begin Router Section
*/

BeMe.Router = Parse.Router.extend({
	routes: {
		'' : 'home',
		'backend' : 'backend'
	},

	home: function () {
		BeMe.removeAllViews();
	},

	backend: function () {
		BeMe.removeAllViews();
	}
});

/*
	End Router Section
	--------------------------
	Begin Glue Code
*/

$(document).ready(function () {
	new BeMe.Views.BarBack();
});

/*
	End Glue Code
*/
