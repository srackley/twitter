module.exports = function(io) {

    var socketio = require('socket.io');
    const express = require('express');
    const router = express.Router();
    const bodyParser = require('body-parser');
    const tweetBank = require('../tweetBank');    
    var urlEncodedParser = bodyParser.urlencoded({ extended: false })
    var jsonParser = bodyParser.json()

    router.get('/', function (req, res) {
      res.render( 'index', { tweets: tweetBank.list(), showForm: true});
    });
    router.get('/users/:name', function(req, res) {
      res.render( 'index', { tweets: tweetBank.find( {name: req.params.name} ) } );
    });
    router.get('/tweets/:id', function(req, res) {
      res.render( 'index', { tweets: tweetBank.find( {id: +req.params.id} ) } );
    });
    router.post('/tweets', urlEncodedParser, function(req, res) {
      io.sockets.emit('newTweet', tweetBank.add(req.body.name, req.body.text));
      res.redirect('/');
    });
return router;
};
