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

Template.recentPosts.helpers({
  posts: function() {
    // Find all posts and list the newest first
    return Posts.find({}, {sort: {createdAt: -1}});
  },
  postHas: function (type) {
    if (!this.services) return false;

    return this.services.indexOf(type) > -1;
  }
});