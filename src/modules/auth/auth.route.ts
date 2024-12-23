import { FastifyInstance } from "fastify";

//Controllers
import { loginHandler } from "./auth.controller";

//Schemas
import { authRef } from "./auth.schema";

export default async function authRoutes(app: FastifyInstance) {
    app.post("/login",
        {
            schema: {
                body: authRef('loginSchema'),
                response: {
                    200: authRef('loginResponseSchema')
                }
            }
        }, loginHandler
    )
}

