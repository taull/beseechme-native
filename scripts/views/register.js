BeMe.Views.Register = Parse.View.extend({
  initialize: function () {
    this.render();
  },

  template: _.template($('#register-view').text()),

  render: function () {
    var self = this;
    var user = Parse.User.current();
    self.$el.html(self.template());
    $('.body-container').append(self.el);

    BeMe.renderedViews.push(this);
  },

});

BeMe.Views.BusinessRegister = Parse.View.extend({
	initialize: function () {
		this.render();
	},

	template: _.template($('#business-register-route').text()),

	render: function () {
		this.$el.html(this.template(this.model));
		$('#application').append(this.el);
		BeMe.renderedViews.push(this);
	},

	events: {
		'submit' : 'register'
	},

	register: function (e) {
		e.preventDefault();

    var email = $('input[name="email"]').val(),
     password = $('input[name="password"]').val(),
     confirmPassword = $('input[name="confirm-password"]').val(),
     businessName = $('input[name="business-name"]').val(),
     firstName = $('input[name="first-name"]').val(),
     lastName = $('input[name="last-name"]').val();


    // if (password == confirmPassword) {
      FirebaseRef.createUser({
        email:email,
        password: password
      }, function (error, authData) {
        if(!error) {

          //Login!
          FirebaseRef.authWithPassword({
            email:email,
            password:password
          }, function (error) {
            if(!error) {
              BeMe.Router.navigate('location', true);
            } else {
              alert(error);
            }
          });

          //Create and store info on user object
          FirebaseRef.child('users/' + authData.uid).set({
            businessName: businessName,
            businessType: 'business',
            email:email
          });

        } else {
          console.log(error);
        }
      });
    // } else {
    //   alert('Passwords don\'t match');
    // }
	}
});

BeMe.Views.ConsumerRegister = Parse.View.extend({
	initialize: function () {
		this.render();
	},

	template: _.template($('#consumer-register-route').text()),

	render: function () {
		this.$el.html(this.template(this.model));
		$('#application').append(this.el);
		BeMe.renderedViews.push(this);
	},

	events: {
		'submit' : 'register'
	},

	register: function (e) {
		e.preventDefault();

    var email = $('input[name="email"]').val(),
     password = $('input[name="password"]').val(),
     confirmPassword = $('input[name="confirm-password"]').val(),
     firstName = $('input[name="first-name"]').val(),
     lastName = $('input[name="last-name"]').val();

    //  console.log(email, password, confirmPassword, firstName, lastName);


    // if(password == confirmPassword) {

    FirebaseRef.createUser({
      email:email,
      password: password
    }, function (error, authData) {
      if(!error) {

        //Login!
        FirebaseRef.authWithPassword({
          email:email,
          password:password
        }, function (error) {
          if(!error) {
            BeMe.Router.navigate('location', true);
          } else {
            alert(error);
          }
        });

        //Create and store info on user object
        FirebaseRef.child('users/' + authData.uid).set({
          firstName: firstName,
          businessType: 'consumer',
          email:email
        });

      } else {
        console.log(error);
      }
    });


      // Parse.User.signUp(email, password, {
      //   firstName: firstName,
      //   lastName: lastName,
      //   userType:"consumer"
      // }, {
      //   success: function (e) {
      //     BeMe.Router.navigate('location', true);
      //   }, error: function (obj, error) {
      //     alert("Error " + error.code + ": " + error.message);
      //   }
      // });

    // } else {
    //   alert('Passwords don\'t match');
    // }
	}
});
