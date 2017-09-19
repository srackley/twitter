const express = require('express');
const app = express();
var socketio = require('socket.io');
// ...

//const chalk = require('chalk');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const http = require('http');
const fs = require('fs');
const path = require('path');
const nunjucks = require('nunjucks');
const routes = require('./routes');
var server = app.listen(3000, function(){
    console.log("server listening on 3000");
});
var io = socketio.listen(server);
console.log('io in app.js', io);
app.use('/', routes(io));
app.use(express.static('public'));

var requests = [];
//var router = express.Router();

// app.use(function(req, res, next){
//     requests.push(req.method, req.path);
//     console.log(chalk.cyanBright(req.method), chalk.yellow.bold(req.path), chalk.red(res.statusCode));
//     next();
// });

var logger = app.use(morgan('combined'));


http.createServer(function(req, res){
    var done = finalhandler(req, res)
    logger(req, res, function(err){
        if (err) return done(err)
            res.setHeader('content-type', 'text/plain')
            res.end('hello, world!')
    })
    })

/*app.use("/special", function(req, res, next){
    requests.push(req.method, req.path);
    console.log('You reached a special area');
    next();
}); */



app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});



var locals = {
    title: 'An Example',
    people: [
        { name: 'Gandalf'},
        { name: 'Frodo' },
        { name: 'Hermione'}
    ]
};
const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];


// app.get("/", function(req, res){
//     res.render('index', {title: 'Hall of Fame', people: people});
// })


