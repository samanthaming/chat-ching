Meteor.methods({
  'Scrape.website':function(url, error) {
    scrape = Scrape.website(url);

    var data = {
      title: scrape.title,
      image: scrape.image,
      url: scrape.url
    };

    return data;
  }
});
