import prisma from "../prisma";
import { CreatePhoto, UpdatePhoto } from "../types/photo.types";


/**
 * GET users photos ⭐️ 🎆
 */
export const getAllPhotos = async (userId: number) => {
    const user = await prisma.user.findFirstOrThrow({
        select: {
            photos: true,
        },
        where: {
            id: userId
        }
    });

    return user.photos
}

/**
 * GET a users photo using id ⭐️ 🎆
 */
export const getAPhoto = async (photoId: number) => {
    return await prisma.photo.findUniqueOrThrow({
        where: {
            id: photoId,
        }
    });
}

/**
 * Create a photo for authanticated user ⭐️ 🎆
 */
export const createPhoto = async (data: CreatePhoto, userId: number) => {
    return await prisma.photo.create({
        data: {
            ...data,
            userId: userId
        },
    });
}

/**
 * Update a users photo ⭐️ 🎆
 */
export const updatePhoto = async (photoId: number, data: UpdatePhoto) => {
    return await prisma.photo.update({
        where: {
            id: photoId,
        },
        data,
    });
}


