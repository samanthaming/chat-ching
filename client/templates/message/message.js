Template.addMessage.events({
  'submit form':function(event) {
    event.preventDefault();

    var message = $('[name="message"]').val();
    var channel = Session.get('currentChannel');
    var owner = Channels.findOne(channel).creator;

    if (owner == Meteor.userId()) {
      Meteor.call('addMessage', message, channel, Session.get('selectBuyer'));
    } else {

      Meteor.call('addMessage', message, channel, owner);
      Meteor.call('addBuyer', channel);
    }

    $('[name="message"]').val("");
  }
});

Template.addMessage.helpers({
  buyerNoMonologue: function() {
    if( ( Session.get('currentChannelCreator') == Meteor.userId()) &&
          !Session.get('selectBuyer')){
      return false;
    }
    return true;
  }
});

Template.messageList.helpers({
  messages: function() {
    var channel = Session.get('currentChannel');
    var queryChannel = Channels.findOne(channel);
    var owner = queryChannel.creator;
    var currentUser = Meteor.userId();
    var recipient = owner === currentUser ? Session.get('selectBuyer') : owner;

    if (!Session.get('selectBuyer')) {
      Session.set('selectBuyer', queryChannel.buyers[0].buyer);
    }
    return Messages.find({parties: {$all: [currentUser,recipient]}});
  }
});

Template.messageItem.helpers({
  timestamp: function() {
    return moment(this.createdAt).fromNow();
  }
});

Template.messageItem.events({
  'click .delete-message': function(event) {
    event.preventDefault();
    var message = this._id;
    Meteor.call('deleteMessage', message);
    return false;
  }
});
