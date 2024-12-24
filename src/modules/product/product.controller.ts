import { FastifyReply, FastifyRequest } from "fastify";

//Services, Schemas
import { createProduct } from "./product.service";
import { CreateProductInput } from "./product.schema";

export async function createProductHandler(request: FastifyRequest<{Body: CreateProductInput}>, reply: FastifyReply) {
    const product = await createProduct({...request.body, ownerId: request.user.id});

    return product
}