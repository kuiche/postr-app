Template.post.events({
  'submit form': function (e, tmpl) {
    e.preventDefault();

    var value = e.target.message.value;

    e.target.message.value = "";

    Meteor.call("saveLocalPost", value, function(err,result) {
        if(err) console.log(err);
    });
    Meteor.call("postToFacebook", value, function(err,result) {
        if(err) console.log(err);
    });
    Meteor.call("postToTwitter", value, function(err,result) {
        if(err) console.log(err);
    });
  }
});