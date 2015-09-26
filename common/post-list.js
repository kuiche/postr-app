if (Meteor.isClient) {
  Meteor.subscribe("posts");

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
}

if (Meteor.isServer) {
  Meteor.publish("posts", function() {
    return Posts.find({
      author: this.userId
    }, {limit: 10});
  });
}