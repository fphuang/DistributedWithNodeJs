const zlib = require('zlib');
const http = require('http');
const fs = require('fs');

http.createServer((req, resp) => {
    const raw = fs.createReadStream(__dirname + '/index.html');
    const acceptEncoding = req.headers['accept-encoding'] || '';
    resp.setHeader('Content-Type', 'text/plain');
    console.log(acceptEncoding);

    if (acceptEncoding.includes('gzip')) {
        console.log('encoding with gzip');
        resp.setHeader('Content-Encoding', 'gzip');
        raw.pipe(zlib.createGzip()).pipe(resp);
    }
    else {
        console.log('no encoding');
        raw.pipe(resp);
    }
}).listen(1337);