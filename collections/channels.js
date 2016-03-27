Channels = new Meteor.Collection('channels');

Meteor.methods({
  addChannel: function(name) {
    check(name, String);

    var currentUser = Meteor.userId();
    var data = {
      name: name,
      createdAt: new Date(),
      creator: currentUser,
      creatorName: Meteor.user().profile.firstname,
      buyers: []
    };

    if(!currentUser){
      throw new Meteor.Error("not-logged-in", "You're not logged in");
    }

    return Channels.insert(data);
  },
  deleteChannel: function(channel) {
    check(channel, String);

    var channelOwner = Channels.findOne({_id: channel}).creator;
    var currentUser = Meteor.userId();

    if (channelOwner !== currentUser) {
      throw new Meteor.Error('not-channel-owner', "You are not the owner of this channel.");
    }

    Messages.remove({channel: channel});
    Channels.remove(channel);
  },
  addBuyer: function(channel) {
    check(channel, String);

    var currentUser = Meteor.userId();

    if(!currentUser){
      throw new Meteor.Error("not-logged-in", "You're not logged in.");
    }

    if (!Channels.findOne(channel)) {
      throw new Meteor.Error("invalid-channel", "This channel doesn't exist.");
    }

    var currentName = Meteor.user().profile.firstname;

    return Channels.update({_id: channel},{
      $addToSet: {
        buyers: {
          buyer: currentUser,
          buyerName: currentName,
          unseen:0,
        }
      }
    });
  }
});
