Meteor.publish('subscribedChannels', function() {
  return Channels.find({
    $or:
    [
      {creator: this.userId},
      {buyers: {$elemMatch: {buyer:this.userId}}}
    ]
  });
});

Meteor.publish('subscribeChannels', function(channel) {
  return Channels.find({
    $or:
    [
      {_id: channel},
      {creator: this.userId},
      {buyers: {$elemMatch: {buyer:this.userId}}}
    ]
  });
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

Meteor.publish('channelBuyerMessages', function(channel, buyer) {
  // body...
});
