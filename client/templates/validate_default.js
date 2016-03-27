// within isClient
$.validator.setDefaults({
  rules:{
    "first-name":{
      required: true
    },
    email:{
      required: true, // but since we have required on the input field, we don't really need this
      email: true
    },
    password:{
      required: true,
      minlength: 6
    }
  },
  // Custom Messages
  messages: {
    "first-name":{
      required: "Please enter your first name."
    },
    email:{
      required: "Please enter email.",
      email: "Please enter a valid email."
    },
    password:{
      required: "Please enter password.",
      minlength: "Password must be at least {0} characters."
      // {0} --> a placeholder that will be replaced by minlength value defined in the rules section
    }
  }
});
