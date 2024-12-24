import { FastifyReply, FastifyRequest } from "fastify";

//Services, Schemas, utils
import { createProduct } from "./product.service";
import { CreateProductInput } from "./product.schema";
import { sendResponse } from "../../utils/response.utils";

export async function createProductHandler(request: FastifyRequest<{ Body: CreateProductInput}>, reply: FastifyReply) {

    const product = await createProduct({ ...request.body, ownerId: request.user.id });
    return sendResponse(reply, 201, true, "Product was created successfully", product)
}