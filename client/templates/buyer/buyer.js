Template.buyerList.helpers({
  buyers: function() {
    var currentChannel = Session.get('currentChannel');
    return Channels.findOne({_id: currentChannel}).buyers;
  },
  isSeller: function() {
    if (Session.get('currentChannelCreator') == Meteor.userId()) {
      return true;
    }
    return false;
  }
});

Template.buyerItem.events({
  'click .select-buyer':function(event) {
    event.preventDefault();
    var buyer = $(event.target).data("buyer");
    var buyerName = $(event.target).data("buyername");
    Session.set('selectBuyer', buyer);
    Session.set('selectBuyerName', buyerName);

  },
  'click .delete-buyer': function(event) {
    event.preventDefault();
    var buyer = this.buyer;
    var currentChannel = Router.current().params._id;

    Meteor.call('deleteBuyer', currentChannel, buyer);
  }
});

Template.buyerItem.helpers({
  unread: function() {

    Channels.find({
      _id: Session.get('currentChannel')

    });

    // return Messages.find({
    //   recipient: Meteor.userId(),
    //   creator: this.buyer
    // }).count();


  },
  active: function() {
    if(this.buyer === Session.get('selectBuyer')){
      return "active";
    }
  }
});
