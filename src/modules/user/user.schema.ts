import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";


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
    id: z.number().optional(),
    ...userCore
})

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
    createUserSchema,
    createUserResponseSchema
})