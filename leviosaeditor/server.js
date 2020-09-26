const log = console.log;
//initialize http server, socket.io and port number
const http = require('http').createServer();
const io = require('socket.io')(http);
const port = 8000;
http.listen(port, () => log(`server listening on port: ${port}`));

//Listen for incoming connection event
//then listen for incoming message on recepted messages
//and broadcast message, found in setTextFromSocket in Editor.js
io.on('connection', (socket) => {
    log('connected');
    socket.on('message', (evt) => {
        socket.broadcast.emit('message', evt);
    });
})
io.on('disconnect', (evt) => {
    log('some people left');
})
