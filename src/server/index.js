const fastify = require('fastify')()
const path = require('path')
const mongoose = require('mongoose')

const mongo = {
  port: process.env.MONGODB_PORT || 27017,
  uri: process.env.MONGODB_URI || 'mongo',
  db: 'admin'
}
mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${mongo.uri}:${mongo.port}/${mongo.db}`, { useMongoClient: true })

fastify.register(require('fastify-helmet'))

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, '../../public'),
  prefix: '/public/'
})

fastify.register(require('./api'), { prefix: '/api' })

fastify.get('/*', (request, reply) => {
  reply.sendFile('index.html')
})

fastify.listen(process.env.PORT || 8080, function (err) {
  if (err) console.log(err)
  console.log(`server listening on ${fastify.server.address().port}`)
})
