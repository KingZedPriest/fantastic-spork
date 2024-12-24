import { FastifyInstance } from 'fastify';

export const setupSwagger = (app: FastifyInstance) => {

    app.register(import('@fastify/swagger'), {
        openapi: {
            info: {
                title: 'My API',
                description: 'API documentation for my fastify tutorial',
                version: '1.0.0',
            },
            servers: [
                {
                    url: 'http://localhost:3000',
                    description: 'Local server',
                },
            ],
            tags: [
                { name: 'Users', description: 'User-related endpoints' },
                { name: 'Products', description: 'Product-related endpoints' },
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    },
                },
            },
            security: [{ bearerAuth: [] }],
        },
    });

    // Register Swagger UI plugin
    app.register(import('@fastify/swagger-ui'), {
        routePrefix: '/documentation',
        uiConfig: {
            docExpansion: 'list',
            deepLinking: true,
        },
        staticCSP: true,
    });
};
