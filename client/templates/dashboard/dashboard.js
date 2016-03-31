Template.dashboardTitle.helpers({
  dashboardTitle: function() {
    var channelOwner = Session.get('currentChannelCreator');
    var title = "";

    if(channelOwner === Meteor.userId()){
      title = Session.get('selectBuyerName');
    }else{
      title = Session.get('currentChannelCreatorName');
    }
    return title;
  }
});

Template.dashboardNav.events({
  'click .dashboard-signout': function(event) {
    Meteor.logout();
    Router.go('login');
  }
});
