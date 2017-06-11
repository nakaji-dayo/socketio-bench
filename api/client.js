const room = process.argv[2]
const pNum = process.argv[3]
const host = process.argv[4]

const f = (anum) => {
  var socket = require('socket.io-client')(host, {
    transports: ['websocket']
  });

  const _ = require('lodash');


  console.log(`perf ${pNum} ${anum}`)
  console.time(`perf ${pNum} ${anum}`)

  socket.on('connect', function(){
    console.log('on connect');
    socket.emit('my other event', { my: 'data' });
    socket.emit('join', {id: room + '-' + anum})
    _.range(10).forEach(x => {
      setTimeout( () => {
        socket.emit('msg', {body: `hello ${x} ${anum}`, room: (room + '-' + anum)});
      }, x * 1000);
    });
  });

  socket.on('event', function(data){
  });

  socket.on('news', function(data){
  });

  socket.on('msg', function(data){
    if (data.body == `HELLO 9 ${anum}`) {
      console.timeEnd(`perf ${pNum} ${anum}`)
      socket.close();
    }
  });

  socket.on('disconnect', function(){
  });
}

const _ = require('lodash')
_.range(1250).map(f)
