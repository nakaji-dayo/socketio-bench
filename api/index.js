const port = process.argv[2]

var app = require('http').createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
})
var io = require('socket.io')(app);
var fs = require('fs');
const _ = require('lodash');

app.listen(parseInt(port));

var redis = require('socket.io-redis');
io.adapter(redis({ host: 'localhost', port: 6379 }));

io.on('connection', function (socket) {
  io.sockets.emit('event');
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('join', (data) => {
    console.log('join', data);
    if (data.id) {
      socket.join(data.id)
    }
  });
  socket.on('msg', data => {
    console.log('msg', data);
    if(data.room) {
      io.to(data.room).emit('msg', Object.assign({}, data, {
        body: _.toUpper(data.body)
      }));
    }
  });
});
