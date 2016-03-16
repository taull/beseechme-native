BeMe.Views.SettingsFollowing = Parse.View.extend({
	initialize: function () {
		this.render();
	},

	template: _.template($('#settings-following-view').text()),

	render: function () {
		this.$el.html(this.template(this.model));
		$('.body-container').append(this.el);
		BeMe.renderedViews.push(this);
	}
});