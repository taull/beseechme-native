BeMe.Views.BackendPost = Parse.View.extend({
	initialize: function () {
		this.render();
	},

	template: _.template($('#backend-post-view').text()),

	render: function () {
		this.$el.html(this.template(this.model));
		$('.body-container').append(this.el);
		BeMe.renderedViews.push(this);

		// $('#business-status').emojiPicker({
		//   height: '300px',
		//   width:  '450px',
		//   button: true,
		//   iconBackgroundColor: '#fff'
		// });
	}
});
