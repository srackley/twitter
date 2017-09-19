const express = require('express');
const app = express();
var socketio = require('socket.io');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const http = require('http');
const nunjucks = require('nunjucks');
const routes = require('./routes');
var server = app.listen(3000, function(){
    console.log("server listening on 3000");
});
var io = socketio.listen(server);
app.use('/', routes(io));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});