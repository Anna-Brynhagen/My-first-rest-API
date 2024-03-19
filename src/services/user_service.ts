import prisma from "../prisma";
import { RegisterUser } from "../types/user.types";

/**
 * Get user by email ⭐️
 */
export const checkIfEmailExists = async (email: string) => {
    return await prisma.user.findUnique({
        where: {
            email,
        },
    });
}

/**
 * Create/registrer a user ⭐️
 */
export const registerAUser = async (data: RegisterUser) => {
    return await prisma.user.create({
        data,
    });
}

