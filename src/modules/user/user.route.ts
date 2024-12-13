import { FastifyInstance } from "fastify";

//Controllers
import { registerUserHandler } from "./user.controller";

export default async function userRoutes(app: FastifyInstance) {
  app.post("/", registerUserHandler)
}