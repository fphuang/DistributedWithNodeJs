const dgram = require('dgram');
const s = dgram.createSocket('udp4');
s.send(`fxh visited at ${new Date()}`, 8080, 'localhost');