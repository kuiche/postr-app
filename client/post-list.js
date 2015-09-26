Template.recentPosts.events({
  'click .post-twitter': function (e, tmpl) {
    e.preventDefault();

    Meteor.call("postToTwitter", this, function(err,result) {});
  },
  'click .post-facebook': function (e, tmpl) {
    e.preventDefault();

    Meteor.call("postToFacebook", this, function(err,result) {});
  }
});