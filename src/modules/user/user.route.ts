import { FastifyInstance } from "fastify";

//Controllers
import { getUsersHandler, registerUserHandler } from "./user.controller";

//Schemas
import { userRef } from "./user.schema";

export default async function userRoutes(app: FastifyInstance) {
    app.post("/",
        { schema: {
                body: userRef('createUserSchema'),
                response: {
                    201: userRef('createUserResponseSchema')
                }
            }
        }, registerUserHandler
    )

    app.get("/getUsers", {
        schema: {
            response: {
                200: userRef('fetchUsersResponseSchema')
            }
        }
    }, getUsersHandler
)
}

