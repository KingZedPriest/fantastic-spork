import { z } from "zod";

export const responseCore = {
    status: z.number(), 
    success: z.boolean(), 
    message: z.string(), 
}