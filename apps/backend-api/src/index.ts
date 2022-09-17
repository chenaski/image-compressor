import fastify from 'fastify'
import { compress } from 'compressor'

const server = fastify()

server.get('/ping', async (request, reply) => {
    return 'pong\n'
})

server.post('/compress', async (request, reply) => {
    reply.headers({ "Access-Control-Allow-Origin": "*" })
    return compress(request.body)
})

server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})
