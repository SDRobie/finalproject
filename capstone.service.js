var mongodb = require('./utils/mongodb.utils');
var Poster = require('./models/poster.model');

module.exports = {
  clientLogIn : clientLogIn,
  fetchComments : fetchComments,
  fetchByType : fetchByType,
  sortByType : sortByType,
  subscriberFloat : subscriberFloat,
  modCheck : modCheck,
  modToolDelete : modToolDelete,
  modToolEdit : modToolEdit
}

function clientLogIn() {
  //log-in system
  //this will be replaced by twitch api OAuth2 and handled by passport

}

function fetchComments() {
  Poster.find({}).exec();
}

function fetchByType() {
  Poster.find({ userState : userState}).exec();
  //there are types: staff, broadcaster, viewers
  //there are Follows: relationship in channels for subscribers and users
  //Users are broadcasters or followers
  //Viewers are broadcasters, followers, subscribers
}

function sortByType() {
  Poster.find({}).sort('userState').exec(function(err, docs) {

  });
  //sorting so that +follower are above follower
  //will use $match

}

function subscriberFloat() {
  //syntax
  if ("type" === "subscriber") {
    //reposition comment in db first position
  }
}

function modCheck() {
//tmi has an "unreliable" function called client.isMod()
  if (client.isMod("#channel", "username")) {
    //do something
  };
}

function modToolDelete() {
  //Required scope: channel_feed_edit
  //DELETE https://api.twitch.tv/kraken/feed/<channel ID>/posts/<post ID>

  //Required scope: channel_feed_edit
  //DELETE https://api.twitch.tv/kraken/feed/<channel ID>/posts/<post ID>/comments/<comment ID>

}

function modToolEdit() {
  //this may not be possible
}
