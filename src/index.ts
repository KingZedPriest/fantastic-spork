import Fastify, { FastifyInstance } from 'fastify';
import userRoutes from './modules/user/user.route';

const app: FastifyInstance = Fastify({
    logger: true
})

//Register the routes
app.register(userRoutes, { prefix: "api/users" })

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