import Fastify, { FastifyInstance } from 'fastify';

const app: FastifyInstance = Fastify({
    logger: true
})

//Health Check Endpoint
app.get("/healthcheck", async function () {
    return { status: "OK" }
})

app.listen({ port: 3000 }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1)
    }
    app.log.info(`Server listening on ${address}`)
})