const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 4000;

require('http').createServer((req, res) => {
    res.end('OKdafasdfj;adsfjasdf;kasjdf;jasdk;fajsd;fkljasd;lfkjasdlk;fjasdk;lfja;lskjdfk;alsdkjf;');
}).listen(PORT, () => {
    console.log(`Producer running at http://${HOST}: ${PORT}`);
})