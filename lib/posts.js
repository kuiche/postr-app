Posts = new Mongo.Collection("posts");

if (Meteor.isClient) {
  Meteor.subscribe("posts");
}

if (Meteor.isServer) {
  Meteor.publish("posts", function() {
    return Posts.find({
      author: this.userId
    }, {limit: 10});
  });
}