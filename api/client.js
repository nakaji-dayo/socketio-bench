const room = process.argv[2]
const pNum = process.argv[3]
const host = process.argv[4]

var socket = require('socket.io-client')(host);

const _ = require('lodash');


console.log(`perf ${pNum}`)
console.time(`perf ${pNum}`)

socket.on('connect', function(){
  socket.emit('my other event', { my: 'data' });
  socket.emit('join', {id: room})
  _.range(1000).forEach(x => {
    setTimeout( () => {
      socket.emit('msg', {body: `hello ${x}`, room});
    }, x * 10);
  });
});

socket.on('event', function(data){
});

socket.on('news', function(data){
});

socket.on('msg', function(data){
  if (data.body == 'HELLO 999') {
    console.timeEnd(`perf ${pNum}`)
    socket.close();
    process.exit();
  }
});

socket.on('disconnect', function(){
});
