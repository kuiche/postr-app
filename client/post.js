Template.post.events({
  'submit form': function (e, tmpl) {
    e.preventDefault();

    var value = e.target.message.value;

    if (value == "") {
      throw new Error("Value cannot be empty");
    }

    e.target.message.value = "";

    Meteor.call("postToAll", value, function(err,result) {
      // if(err) console.log(err);
      // else {
      //   console.log(result);
        // Meteor.call("postToFacebook", result, function(err,result) {
        //     if(err) console.log(err);
        // });
        // Meteor.call("postToTwitter", result, function(err,result) {
        //     if(err) console.log(err);
        // });
      // }
    });
  }
});