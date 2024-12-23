import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

//General Schema
import { responseCore } from "../general/general.schema";

const userCore = {
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a valid email"
    }).email(),

    name: z.string({
        required_error: "Name is required"
    }),
}

const createUserSchema = z.object({
    ...userCore,
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string"
    })
})

const createUserResponseSchema = z.object({
    ...responseCore,
    data: z.object({
        id: z.number(),
        ...userCore,
    })
})

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const { schemas: userSchemas, $ref: userRef } = buildJsonSchemas({
    createUserSchema,
    createUserResponseSchema
}, { $id: 'UserSchema' })