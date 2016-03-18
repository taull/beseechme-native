BeMe.Views.Index = Parse.View.extend({
	initialize: function () {
		this.render();
	},

	template: _.template($('#index-route').text()),

	render:function () {
		this.$el.html(this.template(this.model));
		$('#application').append(this.el);
		BeMe.renderedViews.push(this);

		$('.password-incorrect').click(function(){
			$('.login-container').addClass('animated shake');
		});


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


		FirebaseRef.authWithPassword({
			email:email,
			password:password
		}, function (error, authData) {
			if (!error) {
				FirebaseRef.child('users/' + authData.uid).once('value', function(snapshot) {
					BeMe.currentUser.attributes = snapshot.val();
					if (BeMe.currentUser.get('userType') == 'consumer') {
	          BeMe.Router.navigate('dashboard', true);
	        } else {
	          BeMe.Router.navigate('backend', true);
	        }
				});
			} else {
				alert(error);
			}
		});

		// Parse.User.logIn(email,password, {
		// 	success: function  (userObject) {
    //     BeMe.ApplicationView.render();
    //     if (userObject.get('userType') == 'consumer') {
    //       BeMe.Router.navigate('dashboard', true);
    //     } else {
    //       BeMe.Router.navigate('backend', true);
    //     }
		// 	},
		// 	error: function (error) {
		// 		console.log(error);
		// 	}
		// });
	}
});
