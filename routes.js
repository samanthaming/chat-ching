Router.route('/register',{
  name: 'register',
  template: 'register',
  layoutTemplate: 'main',
  onBeforeAction: function () {
    if (!Meteor.user() && !Meteor.loggingIn()) {
      this.next();
    } else {
      this.redirect('/channels');
    }
  }
});

Router.route('/', {
  name: 'login',
  template: 'login',
  layoutTemplate: 'main',
  onBeforeAction: function () {
    if (!Meteor.user() && !Meteor.loggingIn()) {
      this.next();
    } else {
      this.redirect('/channels');
    }
  }
});

Router.route('/channels', {
  name: 'channelIndex',
  template: 'channelIndex',
  layoutTemplate: 'dashboard',
  // loadingTemplate:'dashboardLoading',
  onBeforeAction: function() {
    if (Meteor.userId()) {
      this.next();
    } else {
      this.layout('main');
      this.render('login');
    }
  },
  subscriptions:function() {
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
  action: function() {
    if (this.ready()) {
      this.render();
    } else {
      this.render('dashboardLoading');
    }
  }
});
