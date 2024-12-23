import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

//Schemas
import { responseCore } from "../general/general.schema";

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

const loginResponseSchema = z.object({
    ...responseCore,
    data: z.object({
        accessToken: z.string()
    }).optional()
})

export type LoginUserInput = z.infer<typeof loginSchema>

export const { schemas: authSchemas, $ref: authRef } = buildJsonSchemas({
    loginSchema,
    loginResponseSchema
})