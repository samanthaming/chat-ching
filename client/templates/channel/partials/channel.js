Template.addChannel.events({
  'submit form':function(event) {
    event.preventDefault();

    var channelName = $('[name="channel-name"]').val();

    if(channelName.length > 0){
      Meteor.call('addChannel', channelName);
    }

    $('[name="channel-name"]').val("");
  }
});

Template.channelList.helpers({
  channels: function() {
    return Channels.find();
  }
});

Template.channelItem.helpers({
  totalUnread: function() {
    return Messages.find({
      channel: this._id,
      recipient: Meteor.userId(),
      read: false
    }).count();
  }
});

Template.channelItem.events({
  'click .select-channel': function(event) {
    event.preventDefault();
    Session.set('currentChannel', this._id);
    Session.set('currentChannelName', this.name);
    Session.set('currentChannelCreator', this.creator);
    Session.set('currentChannelCreatorName', this.creatorName);
    Session.set('selectBuyer', null);
  },
  'click .delete-channel': function(event) {
    event.preventDefault();
    var channel = this._id;
    if (confirm("Delete Channel: " + this.name + "? (This can't be reversed!)")) {
      Session.set('currentChannel', null);
      Session.set('currentChannelName', null);
      Session.set('currentChannelCreator', null);
      Session.set('currentChannelCreatorName', null);
      Meteor.call('deleteChannel', channel);
    }
  }
});
