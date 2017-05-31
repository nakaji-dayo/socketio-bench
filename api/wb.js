const mode = process.argv[2]
var cp = require('child_process');
const _ = require('lodash');


var getHost = x => {
  if (mode == 'p') {
    // return `http://localhost:${x < 16 ? 8080 : 8081}`; //p32, 13947.226ms
    // return `http://localhost:${8080 + Math.floor(x / 8)}`; // p32, 15178.991ms
    return `http://localhost:${8080 + Math.floor(x / 2)}`; // p8 12746.937ms
  } else {
    return 'http://localhost:8080'; //p32 84503.732ms
    //p8 14202.456ms
  }
}

_.range(8).map(x =>
                cp.fork(__dirname + '/client.js', ['test', x, getHost(x)])
              );
