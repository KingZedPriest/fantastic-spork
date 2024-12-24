import Fastify, { FastifyInstance, FastifyError, FastifyRequest, FastifyReply } from 'fastify';
import fastifyJwt from '@fastify/jwt';

//Schemas, Utils, Routes
import userRoutes from './modules/user/user.route';
import { userSchemas } from './modules/user/user.schema';
import { authSchemas } from './modules/auth/auth.schema';
import { sendResponse } from './utils/response.utils';
import authRoutes from './modules/auth/auth.route';
import { productSchemas } from './modules/product/product.schema';

export const app: FastifyInstance = Fastify({ logger: true });

// Register JWT plugin
app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'defaultSecret',
    sign: { expiresIn: '1h' },
});

// Add `authenticate` decorator
app.decorate('authenticate', async function (this: typeof app, request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify();
});

//Extend Fastify Types
declare module 'fastify' {
    export interface FastifyInstance {
        authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    }
}

// Register the routes and Schemas
app.register(userRoutes, { prefix: '/v1/api/users' });
app.register(authRoutes, { prefix: '/v1/api' });

for (const schema of [...userSchemas, ...authSchemas, ...productSchemas]) {
    app.addSchema(schema)
}

// Health Check Endpoint
app.get('/healthcheck', async () => {
    return { status: 'OK' };
});

// Global error handler
app.setErrorHandler((error: FastifyError, request, reply) => {

    request.log.error(error);
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
