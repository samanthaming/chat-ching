/***************************************
 * Add Message
****************************************/
Template.addMessage.events({
  'submit form':function(event) {
    event.preventDefault();

    var message = $('[name="message"]').val();
    var channel = Session.get('currentChannel');
    var findChannel = Channels.findOne(channel);

    if(!findChannel){
      return alert("This listing doesn't exist anymore.");
    }

    var owner = Channels.findOne(channel).creator;
    var height = $('.message-list')[0].scrollHeight;


    if(message.length > 0){
      if (owner == Meteor.userId()) {
        Meteor.call('addMessage', message, channel, Session.get('selectBuyer'));
      } else {
        Meteor.call('addMessage', message, channel, owner);
        Meteor.call('addBuyer', channel);
      }
      $(".message-list").animate({ scrollTop: height }, "slow");
    }

    $('[name="message"]').val("");
  }
});

Template.addMessage.helpers({
  buyerNoMonologue: function() {
    if( ( Session.get('currentChannelCreator') == Meteor.userId()) &&
          !Session.get('selectBuyer')){
      return false;
    }
    return true;
  }
});
/***************************************
 * Message List
****************************************/
Template.messageList.onCreated(function() {
  this.state = new ReactiveDict();
});

Template.messageList.onRendered(function() {
  var height = $('.message-list')[0].scrollHeight;
  var numMessage = $('.message-list .message-line').length;
  var template = this;

  template.state.set('numMessage', numMessage);

  template.run_every_sec = setInterval(function() {
    height = $('.message-list')[0].scrollHeight;
    numMessage = $('.message-list .message-line').length;
    var lastChild = $('.message-list li:last-child');
    var messageList = $('.message-list');
    var divider = $('<p class="sm-divider new-message"><span>New Message</span></p>');

    if( (numMessage > template.state.get('numMessage') ) &&
        !lastChild.hasClass('my-message-line')
    ){
      template.state.set('numMessage', numMessage);
      messageList.animate({ scrollTop: height }, "slow");

      if(messageList.find('.new-message').length === 0 // &&
        // (messageList.prop('scrollHeight') > messageList.height())
      ){
        lastChild.before(divider).fadeIn();
      }
    }
  },1000);
});

Template.messageList.onDestroyed(function() {
  console.log('message list destroyed');
  clearInterval(this.run_every_sec);
});

Template.messageList.helpers({
  messages: function() {
    var channel = Session.get('currentChannel');
    var queryChannel = Channels.findOne(channel);
    var owner = queryChannel.creator;
    var currentUser = Meteor.userId();
    var recipient = owner === currentUser ? Session.get('selectBuyer') : owner;

    if (!Session.get('selectBuyer') && queryChannel.buyers[0]) {
      Session.set('selectBuyer', queryChannel.buyers[0].buyer);
      Session.set('selectBuyerName', queryChannel.buyers[0].buyerName);
    }
    return Messages.find({parties: {$all: [currentUser,recipient]}});
  }
});

Template.messageList.events({
  'click .counter': function(event, template) {
    template.state.set('counter', template.state.get('counter') + 1);
    $('.message-list').scrollTop($(document).height());
  },
  'scroll .message-list':function(event,template) {
    var currentLocation = $(event.target).scrollTop();
    template.state.set('scrollLocation', currentLocation);
  },
  'mousemove .message-list, mousemove .add-message, click .message-list, click .add-message, keypress .add-message input, focus .add-message input': function(event, template) {
    $('.new-message').delay(1000).animate({opacity: 0}, function() {
      $(this).removeClass('new-message');
    });
    template.state.set('newMessage', false);
  }
});

/***************************************
 * Message Item
****************************************/
Template.messageItem.helpers({
  timestamp: function() {
    return moment(this.createdAt).fromNow();
  },
  myMessage: function() {
    if(this.creator === Meteor.userId()){
      return "my-message-line";
    }
  }
});

Template.messageItem.events({
  'click .delete-message': function(event) {
    event.preventDefault();
    var message = this._id;
    Meteor.call('deleteMessage', message);
    return false;
  }
});
