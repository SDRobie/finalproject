var passport = require('passport');
var twitchStrategy = require('passport-twitch').Strategy;

var Poster = require('../models/poster.model');

module.exports = function (passport) {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  passport.use(new twitchStrategy({
    //clientID: TWITCH_CLIENT_ID,
    clientID: "hj16tfrz49tuymzht8rndlertyte1i",
    //clientSecret: TWITCH_CLIENT_SECRET,
    clientSecret: "a1cw6os8nszfva7zrww1d6jfs7vdfe",
    callbackURL: "http://127.0.0.1:8080/auth/twitch/callback",
    //callbackURL: "http://127.0.0.1:3000/auth/twitch/callback",
    scope: "user_read"
  },
  function(accessToken, refreshToken, profile, done) { //is twich auth sufficient?
    User.findOrCreate({ twitchId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
}
