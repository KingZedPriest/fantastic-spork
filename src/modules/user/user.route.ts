import { FastifyInstance } from "fastify";

//Controllers
import { getUsersHandler, registerUserHandler } from "./user.controller";

//Schemas
import { userRef } from "./user.schema";

//User routes
export default async function userRoutes(app: FastifyInstance) {
    app.post("/",
        {
            schema: {
                body: userRef('createUserSchema'),
                response: {
                    201: userRef('createUserResponseSchema')
                }
            }
        }, registerUserHandler
    )

    app.get(
        '/getUsers',
        { preHandler: app.authenticate, schema: { response: { 200: userRef('fetchUsersResponseSchema') } } },
        getUsersHandler
    );
}

