var mongodb = require('./utils/mongodb.utils');
var capstoneService = require('./capstone.service');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var request = require('request');
var tmi = require('tmi.js');
var twitchStrategy = require('passport-twitch').Strategy;
var Poster = require('./models/poster.model');

var configPassport = require('./configs/passport.configs');

configPassport(passport);
var app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


var PORT = process.env.PORT || 8080;

var options = {
  options: {
    debug: true
  },
  connection: {
    reconnect: true
  },
  identity: {
    username: 'cuttertibbs',
    password: 'OAuth b5msyiap1fde4s1y0o3d09oqyltufc'
  },
  channels: []
};

var client = new tmi.client();
client.connect(options);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://streamerirl:goodnachos@ds115411.mlab.com:15411/streamerirl');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  console.log('Good Connection');
});

// app.use(session({ secret: 'menagerie of monkeys', resave: false, saveUninitialized: false }));
// app.use(bodyParser.json());
//
// app.use(passport.initialize());
// app.use(express.static(process.cwd() + '/assets'));
//
app.get("/auth/twitch", passport.authenticate("twitch", {forceVerify: true}));
app.get("/auth/twitch/callback", passport.authenticate("twitch", { failureRedirect: "/" }), function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
});
//
// client.api({
//   url: "https://api.twitch.tv/kraken",
//   headers: {
//     "Client-ID": "hj16tfrz49tuymzht8rndlertyte1i",
//     "Authorization": "a1cw6os8nszfva7zrww1d6jfs7vdfe"
//   }
// }, function(err, res, body) {
//   console.log(body);
// });

mongoose.connection.on('open', function () {
  mongoose.connection.db.listCollections().toArray(function (err, names) {
    console.log(names);
  });
});

// app.get('/login', function(req, res) {
//   app.get('Client-ID: hj16tfrz49tuymzht8rndlertyte1i');
//   res.status(200).redirect('/');
// });

app.get('/', function(req, res) {
  var streamerMlabApi = 'https://api.mlab.com/api/1/databases/streamerirl/collections/Streamers?q={"userState": "streamer"}&apiKey=QKT4P4gumjJuuv_8r-OWBa3j9_Z_k7A6';
  var modMlabApi = 'https://api.mlab.com/api/1/databases/streamerirl/collections/Streamers?q={"userState": "mod"}&apiKey=QKT4P4gumjJuuv_8r-OWBa3j9_Z_k7A6';
  var allCommenters = 'https://api.mlab.com/api/1/databases/streamerirl/collections/Streamers?f={"userName": 1, "comment": 1}&apiKey=QKT4P4gumjJuuv_8r-OWBa3j9_Z_k7A6'
  // mongoose.connection.db.listCollections();
  // res.status(200).send('Health Check');
  // res.redirect(allCommenters);
  res.status(200).sendFile('/Users/SDRobie/Documents/Development/capstone/bootstrap/index.html');
});


app.get('/streamer/:username', function (req, res) {
  var username = req.params.username;
  res.status(200).send(username);
});

// app.get('/', function (req, res) { //use twitch authentication instead
//   capstoneService.clientLogIn().then(function(x) {
//     res.status(200).send(x);
//   }).catch(function(error) {
//     res.status(500).send(error);
//   });
// });

app.post('/posts/:userName', function (req, res, err) {
  if (err) {
    console.log(err);
    res.status(500).send('Error displaying userName');
  }
  res.status(200).json(req.params.userName);
});

app.post('/comment', function (req, res, next) {
  var testComment = new Poster({
    userState: req.body.userState,
    userName: req.body.userName,
    comment: req.body.comment,
    password: req.body.password,
    dateStamp: null
});
  testComment.save(function (err, post) {
    if (err) {
      console.log(err);
      res.status(500).send('Bad News');
    }
    var postLabUrl = "https://api.mlab.com/api/1/databases/streamerirl/collections/Streamers?apiKey=QKT4P4gumjJuuv_8r-OWBa3j9_Z_k7A6";
    res.status(200).redirect(postLabUrl);
  });
});

app.listen(PORT, function () {    //8080
  console.log('Listening on port ' + PORT);
});
