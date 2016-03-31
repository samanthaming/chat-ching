Template.channelIndex.onCreated(function() {
  var params = Router.current().params.query.id;
  console.log(params);

  if(!params){
    return false;
  }

  channel = Channels.findOne({_id: params});

  if(!channel){
    return false;
  }

  Session.set('currentChannel', channel._id);
  Session.set('currentChannelName', channel.name);
  Session.set('currentChannelUrl', channel.url);
  Session.set('currentChannelImage', channel.image);
  Session.set('currentChannelCreator', channel.creator);
  Session.set('currentChannelCreatorName', channel.creatorName);
});
