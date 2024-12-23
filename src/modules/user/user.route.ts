import { FastifyInstance } from "fastify";

//Controllers
import { registerUserHandler } from "./user.controller";

//Schemas
import { $ref } from "./user.schema";

export default async function userRoutes(app: FastifyInstance) {
    app.post("/",
        { schema: {
                body: $ref('createUserSchema'),
                response: {
                    201: $ref('createUserResponseSchema')
                }
            }
        }, registerUserHandler
    )
}

