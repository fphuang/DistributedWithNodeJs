const client = require('dgram').createSocket('udp4');
const host = require('os').hostname;
const [LS_HOST, LS_PORT] = process.env.LOGSTASH.split(':');
const NODE_ENV = process.env.NODE_ENV;

module.exports = function (serverity, type, fields) {
    const payload = JSON.stringify({
        '@timestamp': (new Date()).toISOString(),
        '@version': 1, 
        app: 'web-api',
        environment: NODE_ENV,
        serverity, type, fields, host,
    });
    console.log(payload);
    //this will write data to localhost:7777 (the logstash server)
    client.send(payload, LS_PORT, LS_HOST);   
}