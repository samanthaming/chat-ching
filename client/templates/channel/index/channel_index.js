Template.channelIndex.onCreated(function() {
  var params = Router.current().params.query.id;

  if(!params){
    return false;
  }

  var channel = Channels.findOne({_id: params});

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

Template.channelIndex.onRendered(function() {
  var messageList = $('.message-list');

  console.log("index rendered");

  $("[data-toggle='tooltip']").click(function(){
      var $this = $(this);

      $this.tooltip("show");

      setTimeout(function() {
        $this.tooltip("destroy");
      },1000);
  });



  if(!messageList.length){
    return;
  }

  var height = messageList[0].scrollHeight;
  var template = this;



  this.autorun(function () {
    if (template.subscriptionsReady()) {
      Tracker.afterFlush(function () {
        $('.message-list').scrollTop(height);
      });
    }
  });
});

Template.channelIndex.events({
  'click .dashboard-header-info': function(event) {
    $('.sm-col-middle-right').toggle();
    $(event.currentTarget).toggleClass('active');
  }
});
