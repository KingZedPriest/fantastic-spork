import { FastifyReply, RouteGenericInterface } from "fastify";

// Define the custom response structure for a route
interface GenericRoute<T> extends RouteGenericInterface {
    Reply: ApiResponse<T>;
}

// Define the response type
export function sendResponse<T>(reply: FastifyReply<GenericRoute<T>>, status: number, success: boolean, message: string, data?: T): FastifyReply<GenericRoute<T>> {
    const response: ApiResponse<T> = {
        status,
        success,
        message,
        data,
    };

    return reply.status(status).send(response);
}
