Meteor.startup(function () {
  ServiceConfiguration.configurations.upsert({
    service:"facebook"
  }, {
      $set: Meteor.settings.facebook
  });

  ServiceConfiguration.configurations.upsert({
    service:"twitter"
  }, {
      $set: Meteor.settings.twitter
  });
});
