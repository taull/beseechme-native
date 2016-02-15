BeMe.Views.SettingsAddress = Parse.View.extend({
	initialize: function () {
		this.render();
	},

	template: _.template($('#settings-address-view').text()),

	render: function () {
		this.$el.html(this.template(this.model));
		$('.body-container').append(this.el);
		BeMe.renderedViews.push(this);
	},

	events: {
		"submit form" : "save"
	},

	save: function (e) {
		e.preventDefault();

		var address = $('input[name="address"]').val();
		var city = $('input[name="city"]').val();
		var state = $('input[name="state"]').val();

		var user = Parse.User.current();
		user.set('address', address);
		user.set('city', city);
		user.set('state', state);
		user.save();
		BeMe.Router.navigate('settings', true);
	}
});
