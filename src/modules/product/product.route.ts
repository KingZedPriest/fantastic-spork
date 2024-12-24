import { FastifyInstance } from "fastify";

//Handlers
import { createProductHandler } from "./product.controller";

//Schemas
import { productRef } from "./product.schema";

export default async function productRoutes(app: FastifyInstance) {
    app.post('/',
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
    )
}