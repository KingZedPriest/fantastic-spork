import Fastify, { FastifyInstance, FastifyError } from 'fastify';
import userRoutes from './modules/user/user.route';

const app: FastifyInstance = Fastify({
    logger: true,
});

// Register the routes
app.register(userRoutes, { prefix: '/api/users' });

// Health Check Endpoint
app.get('/healthcheck', async () => {
    return { status: 'OK' };
});

// Global error handler
app.setErrorHandler((error: FastifyError, request, reply) => {
    // Log the error
    request.log.error(error);

    // Send error response
    reply.status(error.statusCode || 500).send({
        error: 'Internal Server Error',
        message: error.message,
    });
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
