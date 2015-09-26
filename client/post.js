Template.post.events({
  'submit form': function (e, tmpl) {
    e.preventDefault();

    var value = e.target.message.value;

    if (value == "") {
      throw new Error("Value cannot be empty"); // todo add client error message
    }

    e.target.message.value = "";

    Meteor.call("postToAll", value, function(err,result) {});
  },
  'click .post-twitter': function(e, tmpl) {
    e.preventDefault();

    var value = $('#message').val();

    if (value == "") {
      throw new Error("Value cannot be empty"); // todo add client error message
    }

    Meteor.call("postToTwitter", value, function(err,result) {});
  },
  'click .post-facebook': function(e, tmpl) {
    e.preventDefault();

    var value = $('#message').val();

    if (value == "") {
      throw new Error("Value cannot be empty"); // todo add client error message
    }

    Meteor.call("postToFacebook", value, function(err,result) {});
  },
});