Template.post.events({
  'submit form': function (e, tmpl) {
    e.preventDefault();

    var value = e.target.message.value;
    Meteor.call("postToFacebook", value, function(err,result) {
        if(!err) alert("Posted to facebook");
        else console.log(err);
    });
    Meteor.call("postToTwitter", value, function(err,result) {
        if(!err) alert("Posted to twitter");
        else console.log(err);
    });
  }
});