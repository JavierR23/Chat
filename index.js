const { isStringObject } = require('util/types');

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('user connected', (nombre) => {
    io.emit(`user connected`, nombre)
  });
  socket.on('user disconnected', (nombre) => {
    io.emit('user disconnected', nombre);
  })
  socket.on('chat message', (msg, nombre) => {
    io.emit('chat message', msg, nombre);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
