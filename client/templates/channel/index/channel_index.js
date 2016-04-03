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

  $("[data-toggle='tooltip']").click(function(){
      var $this = $(this);

      $this.tooltip("show");

      setTimeout(function() {
        $this.tooltip("destroy");
      },1000);
  });

  console.log("index rendered");

  // $(".add-message").on('keyup change input[name="message"]',function(e) {
  //   var source = $('input[name="message"]').val();
  //   var preview = emojione.shortnameToImage(source);
  //   console.log(preview);
  //   $('input[name="message"]').val(preview);
  // });

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
