import { FastifyReply, FastifyRequest } from "fastify";

//Services, Schemas, utils
import { createUser, findUserByEmail, findUsers } from "./user.service";
import { CreateUserInput } from "./user.schema";
import { sendResponse } from "../../utils/response.utils";

//Create a new user
export async function registerUserHandler(request: FastifyRequest<{ Body: CreateUserInput }>, reply: FastifyReply) {

    //Check if user exists
    const userExists = await findUserByEmail(request.body.email, false);
    if (userExists) return sendResponse(reply, 409, false, "User with the same email exists");

    // Create user
    const user = await createUser(request.body);
    return sendResponse(reply, 201, true, "User registered successfully", user);

}

//Get Users
export async function getUsersHandler(request: FastifyRequest, reply: FastifyReply) {

    const users = await findUsers(false)
    return sendResponse(reply, 200, true, "All users was fetched successfully", users)
}