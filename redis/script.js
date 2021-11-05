const redis = new (require('ioredis'))('localhost:6380');
const fs = require('fs');

redis.defineCommand("adduser", {
    numberOfKeys: 2,
    lua: fs.readFileSync(__dirname + '/add-user.lua')
});

const LOBBY = 'lobby', GAME = 'game';

(async ()=> {
    console.log(await redis.adduser(LOBBY, GAME, "alice"));
    console.log(await redis.adduser(LOBBY, GAME, "bob"));
    console.log(await redis.adduser(LOBBY, GAME, "cindy"));
    const [gid, players] = await  redis.adduser(LOBBY, GAME, "tlhunter");
    console.log('GAME ID', gid, 'PLAYERS', players.split(','));
    redis.quit();
})();