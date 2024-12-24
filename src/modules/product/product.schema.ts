import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

//Schemas
import { responseCore } from "../general/general.schema";

const productCore = {
    title: z.string({
        required_error: "Title is required"
    }),
    price: z.number({
        required_error: "Price is required"
    }),
    content: z.string().optional()
}

const productGenerated = {
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string()
}

const createProductSchema = z.object({
    ...productCore
})

const productResponseSchema = z.object({
    ...responseCore,
    data: z.object({
        ...productCore,
        ...productGenerated
    })
})


const productsResponseSchema = z.array(productResponseSchema);

export type CreateProductInput = z.infer<typeof createProductSchema>

export const { schemas: productSchemas, $ref: productRef } = buildJsonSchemas({
    createProductSchema,
    productResponseSchema,
    productsResponseSchema
}, { $id: 'ProductSchema' })