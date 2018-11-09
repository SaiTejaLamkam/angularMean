const express = require('express');

var app = express()
const bodyParser = require('body-parser');
let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const session = require('express-session')
const mongoose = require('mongoose')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
	secret: 'abcdefgh',
	saveUnintialized: false,
	resave: false
}))
app.set('superSecret', 'saiteja');
require('./routes').default(app);
// require('./verifyToken').verifyToken(app);

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('new-message', (message) => {
		console.log(message, '----------');
		io.emit("new-message", message);
		// io.emit(message);
    });
});

mongoose.Promise = Promise
mongoose.connect('mongodb://localhost:27017/angular6DB')
.then(()=>console.log("Mongoose Up"))
server.listen(1234,() => console.log('server listening at 1234'))

exports = module.exports = app;
exports = module.exports = session;
