import Fastify, { FastifyInstance, FastifyError, FastifyRequest, FastifyReply } from 'fastify';
import fastifyJwt from '@fastify/jwt';

//Schemas, Utils, Routes
import userRoutes from './modules/user/user.route';
import { userSchemas } from './modules/user/user.schema';
import { sendResponse } from './utils/response.utils';

const app: FastifyInstance = Fastify({
    logger: true 
});

app.register(fastifyJwt, {
    secret: "aRandomSecret"
})

app.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
    await request.jwtVerify()
})

// Register the routes
app.register(userRoutes, { prefix: '/v1/api/users' });

for (const schema of userSchemas) {
    app.addSchema(schema)
}

// Health Check Endpoint
app.get('/healthcheck', async () => {
    return { status: 'OK' };
});

// Global error handler
app.setErrorHandler((error: FastifyError, request, reply) => {

    // Log the error
    request.log.error(error);

    // Send error response
    return sendResponse(reply, 500, false, error.message)
});

// Start the server
const startServer = async () => {
    try {
        const address = await app.listen({ port: 3000 });
        app.log.info(`Server listening on ${address}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

startServer();
