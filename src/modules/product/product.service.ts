import prisma from "../../utils/prisma";

//Schemas
import { CreateProductInput } from "./product.schema";

//Create new product
export async function createProduct(data: CreateProductInput & { ownerId: number }) {
    return prisma.product.create({
        data
    })
}

//Get a product
export async function getProduct(id: number) {
    return prisma.product.findUnique({
        where: {
            id
        },
        select: {
            content: true,
            title: true,
            price: true,
            id: true,
            owner: {
                select: {
                    name: true,
                    id: true
                }
            }
        }
    })
}

//Get array of Products
export async function getProducts() {
    return prisma.product.findMany({
        select: {
            content: true,
            title: true,
            price: true,
            id: true,
            owner: {
                select: {
                    name: true,
                    id: true
                }
            }
        }
    })
}