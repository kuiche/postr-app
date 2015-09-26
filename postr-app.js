if (Meteor.isClient) {
  Meteor.users.deny({
    update: function() {
      return true;
    }
  });
}

if (Meteor.isServer) {
  
}