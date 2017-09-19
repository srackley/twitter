
module.exports = function(io) {
  // ...
  // route definitions, etc.
  // ...
    var socketio = require('socket.io');
    const express = require('express');
    const router = express.Router();
    const bodyParser = require('body-parser');

    var urlEncodedParser = bodyParser.urlencoded({ extended: false })
    var jsonParser = bodyParser.json()

    // could use one line instead: const router = require('express').Router();
    const tweetBank = require('../tweetBank');

    router.get('/', function (req, res) {
      let tweets = tweetBank.list();
      res.render( 'index', { tweets: tweets, showForm: true});

    });

    router.get('/users/:name', function(req, res) {
      var name = req.params.name;
      let list = tweetBank.find( {name: name} );
      res.render( 'index', { tweets: list } );
    });

    router.get('/tweets/:id', function(req, res) {
      var id = parseInt(req.params.id);
      let list = tweetBank.find( {id: id} );
      res.render( 'index', { tweets: list } );
    });
    router.post('/tweets', urlEncodedParser, function(req, res) {
      var name = req.body.name;
      var text = req.body.text;
      var tweet = tweetBank.add(name, text);
      io.sockets.emit('newTweet', tweet);
      res.redirect('/');
    });


return router;
};
