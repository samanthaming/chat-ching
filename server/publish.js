Meteor.publish('channels', function() {
  return Channels.find();
});

Meteor.publish('singleChannel', function(channel) {
  return Channels.find({_id: channel});
});

Meteor.publish('messages', function() {
  return Messages.find();
});

Meteor.publish('channelMessages', function(channel) {
  return Messages.find({channel: channel});
});
