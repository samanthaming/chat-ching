Router.route('/',{
  name: 'home',
  template:'home',
  layoutTemplate: 'main'
});

Router.route('/register',{
  name: 'register',
  template: 'register',
  layoutTemplate: 'main'
});

Router.route('/login', {
  name: 'login',
  template: 'login',
  layoutTemplate: 'main'
});

Router.route('/channels', {
  name: 'channelIndex',
  template: 'channelIndex',
  layoutTemplate: 'dashboard',
  onBeforeAction: function() {
    var currentUser = Meteor.userId();
    if (currentUser) {
      this.next();
    } else {
      this.layout('main');
      this.render('login');
    }
  },
  waitOn:function() {
    var channel = Session.get('currentChannel');

    if(!channel){
      channel = this.params.query.id;
    }

    if(channel){
      return [
        Meteor.subscribe('channels'),
        Meteor.subscribe('channelMessages', channel)
      ];
    }

    Meteor.subscribe('channels');
  },
  onAfterAction: function() {

  }
});
