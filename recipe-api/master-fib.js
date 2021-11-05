const cluster = require('cluster');
console.log(`master pid: ${process.pid}`);

const master = '/cluster-fib.js';

cluster.setupMaster({
    exec: __dirname + master
});

cluster.fork();
cluster.fork();

cluster
.on('disconnect', (worker) => {
    console.log('disconnect', worker.id);
})
.on('exit', (worker, code, signal) => {
    console.log('exit', worker.id, code, signal);
    cluster.fork();
})
.on('listening', (worker, {address, port}) => {
    console.log('listening', worker.id, `http://${address}:${port}`);
});