const util = require('util');
const grpc = require('@grpc/grpc-js');
const app = require('fastify')();
const loader = require('@grpc/proto-loader');
const pkg_def = loader.loadSync(__dirname + '/../shared/grpc-recipe.proto');
const recipeProto = grpc.loadPackageDefinition(pkg_def).recipe;
const HOST = '127.0.0.1';
const PORT = 3000;
const TARGET = `${HOST}:4000`;

const client = new recipeProto.RecipeService(TARGET, grpc.credentials.createInsecure());
const getMetaData = util.promisify(client.getMetaData.bind(client));
const getRecipe = util.promisify(client.getRecipe.bind(client));

app.get('/', async () => {
    const [meta, recipe] = await Promise.all([getMetaData({}), getRecipe({id: 42})]);

    return  {
        consumer_pid: process.pid,
        producer_data: meta,
        recipe: recipe
    };
});

app.listen(PORT, HOST, ()=> {
    console.log(`Consumer running at http://${HOST}:${PORT}`);
});

