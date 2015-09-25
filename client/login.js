Template.login.events({
  'click #login-fb': function (e, tmpl) {
    Meteor.signInWithFacebook ({
      requestPermissions: ['publish_actions']
    }, function (error, user) {
      if (error) {
        console.log('error', error);
      }
    })
  },
  'click #login-tw': function (e, tmpl) {
    Meteor.signInWithTwitter ({
    }, function (error, user) {
      if (error) {
        console.log('error', error);
      }
    })
  }
});

Template.logout.events({
  'click #logout': function (e, tmpl) {
    Meteor.logout();
  }
});