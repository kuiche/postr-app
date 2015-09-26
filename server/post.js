var validateMessage = function(message) {
  var text;

  if (!Meteor.user()) {
    throw new Error("Cannot post as user is not logged in!")
  }

  if (typeof message == "object") {
    text = message.content;
  } else {
    text = message;
  }

  if (!text) {
    throw new Error("Message must not be empty")
  }

  return String(text);
};

var services = {
  local: function(post) {
    var text = validateMessage(post);
    var post = Posts.insert({
      author: Meteor.userId(),
      content: text,
      createdAt: Date.now(),
      services: ["local"]
    });

    return Posts.findOne({_id: post});
  },
  twitter: function(post, retries) {
    var twit = Meteor.npmRequire('twit');
    var T;
    var text = validateMessage(post);
    var retries = retries || 0;

    if(Meteor.user().services.twitter.accessToken) {
      T = new twit({
        consumer_key: Meteor.settings.twitter.consumerKey,
        consumer_secret: Meteor.settings.twitter.secret,
        access_token: Meteor.user().services.twitter.accessToken,
        access_token_secret: Meteor.user().services.twitter.accessTokenSecret
      });

      T.post('statuses/update', { status: text }, Meteor.bindEnvironment(function(err, data, response) {
        if (err) {
          if(retries > 5) {
            throw new Error("Could post to twitter")
          }

          services.twitter(post, ++retries);
        } else if (typeof post === "object") {
          Posts.update(post._id, {$push: {services: "twitter"}});
        }
      }));
    }
  },
  facebook: function(post, retries) {
    var graph = Meteor.npmRequire('fbgraph');
    var text = validateMessage(post);

    if(Meteor.user().services.facebook.accessToken) {
      graph.setAccessToken(Meteor.user().services.facebook.accessToken);
      //Async Meteor (help from : https://gist.github.com/possibilities/3443021
      graph.post('/me/feed',{message:text}, Meteor.bindEnvironment(function(err,result) {
        if (err) {
          if(retries > 5) {
            throw new Error("Could post to facebook")
          }

          services.facebook(post, ++retries);
        } else {
          Posts.update(post._id, {$push: {services: "facebook"}});
        };
      }));
    }
  }
};


Meteor.startup(function () {
  Meteor.methods({
    'postToAll' : function(message) {
      var text = validateMessage(message);
      var post = services.local(message);

      services.twitter(post);
      services.facebook(post);
    },
    'saveLocalPost': function(post) {
      return services.local(post);
    },
    'postToFacebook': function(post) {
      return services.facebook(post);
    },
    'postToTwitter': function(post) {
      return services.twitter(post);
    }
  });
});