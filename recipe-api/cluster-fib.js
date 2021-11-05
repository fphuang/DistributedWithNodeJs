const server = require('fastify')();
const HOST = '127.0.0.1';
const PORT = 4000;

console.log(`worker pid: ${process.pid}`);

server.get('/:limit', async (req, resp) => {
    return String(fib(+req.params.limit));
});

server.listen(PORT, HOST, () => {
    console.log(`Producer running at http://${HOST}:${PORT}`);
})

function fib(limit) {
    let prev = 1n, next = 0n, swap;
    while (limit) {
        swap = prev;
        prev = prev + next;
        next = prev;
        prev = swap;
        limit--;
    }

    return next;
}