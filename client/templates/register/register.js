Template.register.events({
  'submit form':function(event) {
    event.preventDefault();
  }
});

Template.register.onRendered(function(){
  var validator = $('.register').validate({
    submitHandler: function(event){
      var firstname = $('[name="first-name"]').val();
      var email = $('[name=email]').val();
      var password = $('[name=password]').val();
      Accounts.createUser({
        email: email,
        password: password,
        profile:{
          firstname: firstname
        }
      }, function(error){
          if(error){
            if(error.reason == "Email already exists."){
                validator.showErrors({
                  email: "Email already taken. Please enter a different email."
                });
            }
          } else {
              Router.go("home");
          }
      });
    }
  });
});
