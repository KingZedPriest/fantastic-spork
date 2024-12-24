import { FastifyInstance } from 'fastify';

export const setupSwagger = (app: FastifyInstance) => {
    app.register(import('@fastify/swagger'));
    app.register(import('@fastify/swagger-ui'), {
        routePrefix: '/documentation',
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false,
        },
        uiHooks: {
            onRequest: (request, reply, next) => next(),
            preHandler: (request, reply, next) => next(),
        },
        staticCSP: true,
        transformStaticCSP: (header) => header,
        transformSpecification: (swaggerObject, request, reply) => swaggerObject,
        transformSpecificationClone: true,
    });
};
