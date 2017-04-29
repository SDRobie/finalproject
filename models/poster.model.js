var mongoose = require('mongoose');
//var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var posterSchema = mongoose.Schema({
  userState: String, //?
  userName: String,
  comment: String,
  password: String,
  dateStamp: Date
});

module.exports = mongoose.model('Poster', posterSchema, 'Streamers');

//how twitch will respond
//posts: [{
//  "body": "original post",
//  "comments": [{
//    "body": "response to body",
//   "user": {
//      "_id": "numbers",
//      "display_name": "string",
//      "type": "staff"
//}
//}]
//}]
//There's also the permissions
// "permissions": {
//    "can_delete": true,
//    "can_moderate": true,
//    "can_reply": true
