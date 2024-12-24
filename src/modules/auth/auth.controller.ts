import { FastifyReply, FastifyRequest } from "fastify";
import { app } from "../..";

//Schemas
import { LoginUserInput } from "./auth.schema";

//Service
import { findUserByEmail } from "../user/user.service";

//Utils
import { sendResponse } from "../../utils/response.utils";
import { verifyPassword } from "../../utils/hash";

//User login
export async function loginHandler(request: FastifyRequest<{ Body: LoginUserInput }>, reply: FastifyReply) {

    const { email, password } = request.body

    const user = await findUserByEmail(email, false)
    if (!user) return sendResponse(reply, 401, false, "Incorrect Email or Password");

    const correctPassword = verifyPassword({
        candidatePassword: password,
        salt: user.salt,
        hash: user.password
    })

    if (correctPassword) {
        const { password, salt, ...rest } = user
        return sendResponse(reply, 200, true, "User was authenticated successfully", { accessToken: app.jwt.sign(rest) })
    }

    return sendResponse(reply, 401, false, "Incorrect Email or Password");
}