Channels = new Meteor.Collection('channels');

Meteor.methods({
  addChannel: function(name, url, image) {
    check(name, String);
    check(url, String);
    check(image, String);

    var craigslistId = url.match(/\d/g).join("");
    var currentUser = Meteor.userId();
    var data = {
      name: name,
      url: url,
      image: image,
      craigslist: craigslistId,
      createdAt: new Date(),
      creator: currentUser,
      creatorName: Meteor.user().profile.firstname,
      unread: 0,
      buyers: []
    };

    if(!currentUser){
      throw new Meteor.Error("not-logged-in", "You're not logged in");
    }

    if(Channels.findOne({craigslist: craigslistId})){
      throw new Meteor.Error("channel-exist", "This Craigslist Channel already exist");
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
    var currentAvatar = Meteor.user().profile.avatar;

    return Channels.update({_id: channel},{
      $addToSet: {
        buyers: {
          buyer: currentUser,
          buyerName: currentName,
          avatar: currentAvatar,
          unread:0,
        }
      }
    });
  },
  deleteBuyer: function(channel, buyer) {
    check(channel, String);
    check(buyer, String);
    var currentName = Meteor.userId();

    if (!Channels.findOne(channel)) {
      throw new Meteor.Error("invalid-channel", "This channel doesn't exist.");
    }

    return Channels.update({_id: channel}, {
      $pull: { 'buyers': {buyer: buyer}}}
    );
  }
});
