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

Router.route('/channels/new',{
  name: 'channelCreate',
  template: 'channelCreate',
  layoutTemplate: 'main'
});

Router.route('/channels',{
  name: 'channelIndex',
  template: 'channelIndex',
  layoutTemplate: 'dashboard',
  onBeforeAction: function() {
    var currentUser = Meteor.userId();
    if (currentUser) {
      this.next();
    } else {
      this.render('login');
    }
  },
  waitOn:function() {
  // subscriptions:function() {
    var currentChannel = Session.get('currentChannel');
    return [
      Meteor.subscribe('channels'),
      Meteor.subscribe('channelMessages', currentChannel)
    ];
  }
});

Router.route('/channels/:_id',{
  name: 'channelShow',
  template: 'channelShow',
  layoutTemplate: 'dashboard',
  // loadingTemplate: 'loading',
  data: function() {
    var currentChannel = this.params._id;
    return Channels.findOne({_id: currentChannel});
  },
  onBeforeAction: function() {
    var currentUser = Meteor.userId();
    if (currentUser) {
      this.next();
    } else {
      this.render('login');
    }
  },
  // subscriptions: function() {
  waitOn: function() {
    var currentChannel = this.params._id;
    return [
      // Meteor.subscribe('singleChannel', currentChannel),
      Meteor.subscribe('channels'),
      Meteor.subscribe('channelMessages', currentChannel)
    ];
  }
});
