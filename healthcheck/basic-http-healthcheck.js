const server = require('fastify')();
const HOST = '0.0.0.0';
const PORT = 3300;
const redis = new (require('ioredis'))({enableOfflineQueue: false});
const pg = new (require('pg').Client)();
pg.connect();

server.get('/health', async (req, rep) => {
    try {
        const res = await pg.query('SELECT $1::text as status', ['ACK']);
        if (res.rows && res.rows.length >0 && res.rows[0].status !== 'ACK') {
            rep.code(500).send('DOWN');
        }
    }
    catch(e) {
        rep.code(500).send('DOWN');
    }

    let status = 'OK';
    try {
        if (await redis.ping() !== 'PONG') status = 'DEGRADED';
    }
    catch(e) {
        status = 'DEGRADED';
    }

    rep.code(200).send({fxhstatus: status});
});

server.listen(PORT, HOST, () => console.log(`http://${HOST}: ${PORT}`));