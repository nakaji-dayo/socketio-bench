const hostname = process.argv[2]
var cp = require('child_process');
const _ = require('lodash');
console.log(hostname);

var getHost = x => {
  return hostname; //p32 84503.732ms
}

_.range(8).map(x =>
               cp.fork(__dirname + '/client.js', ['test', x, getHost(x)])
              );
