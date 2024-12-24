import { FastifyInstance } from "fastify";

//Handlers
import { createProductHandler, getProductsHandler } from "./product.controller";

//Schemas
import { CreateProductInput, productRef } from "./product.schema";

export default async function productRoutes(app: FastifyInstance) {
    app.post<{ Body: CreateProductInput }>('/',
        {
            preHandler: app.authenticate,
            schema: {
                body: productRef('createProductSchema'), 
                response: {
                    201: productRef('productResponseSchema')
                }
            }
        },
        createProductHandler
    );

    app.get('/allProducts', 
        {
            preHandler: app.authenticate,
            schema: {
                response: {
                    200: productRef('productsResponseSchema')
                }
            }
        },
        getProductsHandler
    )
}