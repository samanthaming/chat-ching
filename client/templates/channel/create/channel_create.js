Template.channelCreate.helpers({
  craigslist: function() {
    return Session.get('craigslist');
  },
  generatedLink: function() {
    var link = Meteor.absoluteUrl();
    link += "channels?id=";
    link += Session.get('craigslistId');
    return link;
  }
});

Template.channelCreate.events({
  'submit .channel-create': function(event) {
    event.preventDefault();
    var link = $('[name="list-link"]').val();

    Meteor.call('Scrape.website', link , function(error, data) {
      Session.setPersistent("craigslist", {
        title: data.title,
        image: data.image,
        url: data.url
      });
    });
  },
  'click .cancel-create-channel':function(event) {
    event.preventDefault();
    $('[name="list-link"]').val("");
    Session.clear("craigslist");
    Session.clear("craigslistId");
  },
  'click .craigslist-url':function(event) {
    event.preventDefault();
    var link = $(event.target).attr("href");
    window.open(link, '_blank');
  },
  'click .generate-link':function(event) {
    event.preventDefault();
    var data = Session.get('craigslist');
    var name = data.title;
    var url = data.url;
    var image = data.image;

    Meteor.call('addChannel', name, url, image, function(error, result) {
      Session.setPersistent('craigslistId', result);
      alert(error.reason);
    });
  },
  'click .copy-link':function(event) {
    event.preventDefault();
  },
  'click .copy-text':function(event) {
    $(event.target).select();
  }
});

Template.channelCreate.onRendered(function() {
  var clipboard = new Clipboard('.copy-link');

  clipboard.on('success', function() {
    $('.copy-text').select();
  });

  $('.channel-create').validate({
    rules: {
      'list-link':{
        required: true,
        url: true
      }
    },
    messages:{

    }
  });

});

Template.channelCreate.onDestroyed(function() {
  Session.clear("craigslist");
  Session.clear('craigslistId');
});
