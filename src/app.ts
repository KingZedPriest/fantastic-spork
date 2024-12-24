import Fastify, { FastifyInstance, FastifyRequest, FastifyReply, FastifyError } from 'fastify';
import fastifyJwt from '@fastify/jwt';
import { JWT_SECRET } from './config';

// Import Schemas, Utils, and Routes
import userRoutes from './modules/user/user.route';
import authRoutes from './modules/auth/auth.route';
import { userSchemas } from './modules/user/user.schema';
import { authSchemas } from './modules/auth/auth.schema';
import { productSchemas } from './modules/product/product.schema';
import { sendResponse } from './utils/response.utils';
import productRoutes from './modules/product/product.route';

// Extend Fastify Types (Must be at the top level)
declare module 'fastify' {
    export interface FastifyInstance {
        authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    }
}

declare module '@fastify/jwt' {
    interface FastifyJWT {
        payload: User;
        user: User;
    }
}

export const app: FastifyInstance = Fastify({ logger: true });

// Build the Fastify app
export const buildApp = (): FastifyInstance => {

    // Register JWT plugin
    app.register(fastifyJwt, {
        secret: JWT_SECRET,
        sign: { expiresIn: '1h' },
    });

    // Add `authenticate` decorator
    app.decorate('authenticate', async function (this: typeof app, request: FastifyRequest, reply: FastifyReply) {
        try {
            const decoded = await request.jwtVerify<User>();
            request.user = decoded;
        } catch (err) {
            this.log.error(`JWT Error: ${err}`);
            return sendResponse(reply, 401, false, 'Unauthorized');
        }
    });

    // Register routes and schemas
    app.register(userRoutes, { prefix: '/v1/api/users' });
    app.register(authRoutes, { prefix: '/v1/api' });
    app.register(productRoutes,  { prefix: '/v1/api/products'})

    for (const schema of [...userSchemas, ...authSchemas, ...productSchemas]) {
        app.addSchema(schema);
    }

    // Health Check Endpoint
    app.get('/healthcheck', async () => {
        return { status: 'OK' };
    });

    // Global error handler
    app.setErrorHandler((error: FastifyError, request, reply) => {
        request.log.error(error);
        return sendResponse(reply, 500, false, error.message);
    });

    return app;
};
