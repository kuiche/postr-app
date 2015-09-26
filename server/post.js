Meteor.startup(function () {
  Meteor.methods({
    'saveLocalPost': function(text) {
      if (!Meteor.user()) {
        throw new Error("Cannot post as user is not logged in!")
      }

      check(text, String);

      Posts.insert({
        author: Meteor.userId(),
        content: text,
        createdAt: Date.now()
      });
    },
    'postToFacebook': function(text) {
      var graph = Meteor.npmRequire('fbgraph');

      check(text, String);
      
      if(Meteor.user().services.facebook.accessToken) {
        graph.setAccessToken(Meteor.user().services.facebook.accessToken);
        //Async Meteor (help from : https://gist.github.com/possibilities/3443021
        graph.post('/me/feed',{message:text},function(err,result) {
          if (err) console.log(err);
          return result;
        });
      }else{
        return false;
      }
    },
    'postToTwitter': function(text) {
      var twit = Meteor.npmRequire('twit');
      var T;

      check(text, String);

      if(Meteor.user().services.twitter.accessToken) {
        T = new twit({
          consumer_key: Meteor.settings.twitter.consumerKey,
          consumer_secret: Meteor.settings.twitter.secret,
          access_token: Meteor.user().services.twitter.accessToken,
          access_token_secret: Meteor.user().services.twitter.accessTokenSecret
        });

        T.post('statuses/update', { status: text }, function(err, data, response) {
          if (err) console.log(err);
          return data;
        });
      }else{
        return false;
      }
    }
  });
});