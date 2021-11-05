const Redis = require('ioredis');
const redis = new Redis('localhost:6380');

(async () => {
    await redis.set('foo', 'bard');
    const result = await redis.get('foo');
    console.log(`result: ${result}`);
    redis.quit();
})();