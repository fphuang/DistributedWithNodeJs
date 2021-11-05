'use strict'
 
const server = require('fastify')();
const gql = require('fastify-gql')
 
const schema = `
  type Query {
    add(x: Int, y: Int): Int
  }
`
 
const resolvers = {
  Query: {
    add: async (_, { x, y }) => x + y
  }
}
 
app.register(gql, {
  schema,
  resolvers
})
 
app.get('/', async function (req, reply) {
  const query = '{ add(x: 2, y: 2) }'
  return reply.graphql(query)
})
 
app.listen(5000)