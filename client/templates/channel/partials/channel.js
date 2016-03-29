Template.channelList.helpers({
  channels: function() {
    return Channels.find();
  }
});

Template.channelItem.helpers({
  totalUnread: function() {
    // console.log(this._id);
    return Messages.find({
      channel: this._id,
      recipient: Meteor.userId(),
      read: false
    }).count();
  },
  active: function() {
    if(this._id === Session.get('currentChannel')){
      return "active";
    }
  }
});

Template.channelItem.events({
  'click .select-channel': function(event) {
    // event.preventDefault();
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
