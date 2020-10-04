/**
 *
 */

// Load all the libraries for the server
const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const cookieParser = require('cookie-parser')

// Routes
const users = require('./routes/users')

// Setup server
const port = process.env.PORT || 8000
const app = express()
const server = http.createServer(app)
const io = socketIo(server)

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(bodyParser.json())
app.use(cookieParser())

// DB Config
const db = require('./config/keys').mongoURI

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.log(err))

// Passport middleware
app.use(passport.initialize())

// Passport config
require('./config/passport')(passport)

app.use('/users', users)

//Listen for incoming connection event
//then listen for incoming message on recepted messages
//and broadcast message, found in setTextFromSocket in Editor.js
io.on('connection', (socket) => {
    console.log("New client connected : " + socket.id);
    socket.on('message', (evt) => {
        socket.broadcast.emit('message', evt);
    });
})
io.on('disconnect', (evt) => {
    console.log('some people left');
})

server.listen(port, () => console.log(`server listening on port: ${port}`));