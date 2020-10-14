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
const path = require('path')

// Routes
const users = require('./routes/users')
const docs = require('./routes/docs')
const versions = require('./routes/versions')

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

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGOURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.log(err))

// Passport middleware
app.use(passport.initialize())

// Passport config
require('./config/passport')(passport)

// Using routes with express
app.use('/users', users)
app.use('/docs', docs)
app.use('/versions', versions)

// Listen for incoming connection event
// then listen for incoming message on recepted messages
// and broadcast message, found in setTextFromSocket in Editor.js
io.on('connection', (socket) => {
  console.log('New client connected : ' + socket.id)
  socket.on('message', (evt) => {
    socket.broadcast.emit('message', evt)
  })
  socket.on('disconnect', () => {
    console.log('some people left')
  })
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}

server.listen(port, () => console.log(`server listening on port: ${port}`))
