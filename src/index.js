'use strict'
import Fastify from 'fastify'
import Static from '@fastify/static'
//import fs, { readFileSync } from 'fs'
import { join } from 'desm'

const startServer = async () => {
  const PORT = 3000;
  const fastify = Fastify({
      //trustProxy: true,
      requestTimeout: 5000,
      logger: true
  })

  fastify.register(Static, {
    root: join(import.meta.url, '..', 'public'),
    //prefix: '/public/', // optional: default '/'
  })

  fastify.get('/', function (req, reply) {
    reply.sendFile('index.html') // serving path.join(__dirname, 'public', 'index.html') directly
  })

  fastify.get('/test', async function (req, reply) {
    fastify.log.info("test route")
    reply.send('Test ok!')
  })

  fastify.listen({ port: PORT }, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
  })
}

startServer()

