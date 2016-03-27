Messages = new Meteor.Collection('messages');

Meteor.methods({
  addMessage: function(message, channel, recipient) {
    check(message, String);
    check(channel, String);
    check(recipient, String);

    if(!Channels.findOne(channel)){
      throw new Meteor.Error('invalid-channel', "Invalid Channel");
    }

    if(!Meteor.users.findOne({_id: recipient}) ){
      throw new Meteor.Error('invalid-recipient', "Invalid Recipient");
    }

    var currentUser = Meteor.userId();
    var currentName = Meteor.user().profile.firstname;
    var data = {
      message: message,
      read: false,
      createdAt: new Date(),
      channel: channel,
      creator: currentUser,
      creatorName: currentName,
      recipient: recipient,
      parties: [currentUser, recipient]
    };

    if(!currentUser){
      throw new Meteor.Error("not-logged-in", "You're not logged in");
    }

    return Messages.insert(data);
  },

  deleteMessage: function(message) {
    check(message, String);

    // !!! Don't use the functionality in live

    return Messages.remove(message);
  }
});
