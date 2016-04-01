/***************************************
 * Buyer List
****************************************/
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

/***************************************
 * Buyer Item
****************************************/
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

Template.buyerItem.events({
  'click .select-buyer':function(event) {
    event.preventDefault();
    var buyer = $(event.currentTarget).data("buyer");
    var buyerName = $(event.currentTarget).data("buyername");
    Session.set('selectBuyer', buyer);
    Session.set('selectBuyerName', buyerName);

  },
  'click .delete-buyer': function(event) {
    event.preventDefault();
    var buyer = this.buyer;
    var currentChannel = Session.get('currentChannel');
    Meteor.call('deleteBuyer', currentChannel, buyer, function(err, data) {
      if(err){
        console.log(err.reason);
      }else{
        Session.set('selectBuyer', null);
        Session.set('selectBuyerName', null);
      }
    });
  }
});
