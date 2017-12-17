const fastify = require('fastify')()
const path = require('path')
const mongoose = require('mongoose')

const mongo = {
  uri: process.env.MONGODB_URI || 'mongodb://mongo:27017/admin'
}

mongoose.Promise = global.Promise
mongoose.connect(`${mongo.uri}`, { useMongoClient: true })

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
