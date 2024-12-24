import prisma from "../../utils/prisma";

//Schemas and Utils
import { CreateUserInput } from "./user.schema";
import { hashPassword } from "../../utils/hash";

//Create user service
export async function createUser(input: CreateUserInput) {
    const { password, ...rest } = input;

    const { hash, salt } = hashPassword(password)
    const user = await prisma.user.create({
        data: { ...rest, salt, password: hash }
    })

    return user;
}

//Find user by Email
export async function findUserByEmail(userEmail: string, include: boolean) {
    return await prisma.user.findUnique({
        where: {
            email: userEmail
        },
        include: {
            products: include
        }
    })
}

//Find all users
export async function findUsers(include: boolean) {
    return await prisma.user.findMany({
        include: {
            products: include
        }
    })
}