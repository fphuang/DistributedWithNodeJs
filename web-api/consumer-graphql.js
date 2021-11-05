const server = require('fastify')();
const fetch = require('node-fetch');
const HOST = 'localhost';
const PORT = 3000;
const TARGET = "localhost:4000";

const complex_query = `query kitchenSink ($id:ID) {
    recipe(id: $id) {
        id name
        ingredients {
            name quantity
        }
    }
    pid
}`;

server.get('/', async() => {
    const req = await fetch(`http://${TARGET}/graphql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            query: complex_query,
            variables: {id: "42"}
        }),
    });

    return {
        consumer_pid: process.pid,
        producer_data: await req.json()
    };
});

server.listen(PORT, HOST, () => {
    console.log(`consumer running at http://${HOST}:${PORT}`);
})