BeMe.Views.AppHeader = Parse.View.extend({
	initialize: function () {
		this.render();
	},

  tagName:'header',

  className:'app-header',

	template: _.template($('#header-view').text()),

	render: function () {
		this.$el.html(this.template(this.model));
		$('.body-container').append(this.el);
		// BeMe.renderedViews.push(this); don't include because it will get removed
	}
});
