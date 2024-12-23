import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a valid email"
    }).email(),

    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string"
    })
})

export const { schemas: authSchemas, $ref } = buildJsonSchemas({
    loginSchema
})