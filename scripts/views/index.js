BeMe.Views.Index = Parse.View.extend({
	initialize: function () {
		this.render();
	},

	template: _.template($('#index-route').text()),

	render:function () {
		this.$el.html(this.template(this.model));
		$('#application').append(this.el);
		BeMe.renderedViews.push(this);
	},

	events: {
		'submit' : 'login'
	},

	login: function (e) {
		e.preventDefault();

		var email = $('input[name="email"]').val();
		var password = $('input[name="password"]').val();
		var stayLoggedIn = $('input[type="checkbox"]')[0].checked;
    var self = this;

		Parse.User.logIn(email,password, {
			success: function  (userObject) {
        BeMe.ApplicationView.render();
        if (userObject.get('userType') == 'consumer') {
          BeMe.Router.navigate('dashboard', true);
        } else {
          BeMe.Router.navigate('backend/feed', true);
        }
			},
			error: function (error) {
				console.log(error);
			}
		});
	}
});