import prisma from "../prisma";
import { UpdateAlbum, createAlbum } from "../types/album.types";

/**
 * Get users albums ⭐️ 🎆
 */
export const getAllAlbums = async (userId: number) => {
    const user = await prisma.user.findUniqueOrThrow({
		select: {
			albums: true,
		},
		where: {
			id: userId,
		},
	});

    return user.albums;
}

/**
 * Get a users album using id ⭐️ 🎆
 */
export const getAlbumWithId = async (albumId: number) => {
    return await prisma.album.findUniqueOrThrow({
        where: {
            id: albumId,
        },
        include: {
            photos: true,
        },
    });
};

/**
 * Create an album for user ⭐️ 🎆
 */
export const postAlbum = async (data: createAlbum , userId: number ) => {
     return await prisma.album.create({
        data: {
            ...data,
             userId: userId,
        },
    }); 
}

/**
 * Update an album ⭐️ 🎆
 */
export const updateAlbum = async (albumId: number, data: UpdateAlbum) => {
    return prisma.album.update({
        where: {
            id: albumId,
        },
        data,
    });
}
 

/**
 * Add photos to albums ⭐️ 🎆
 * @param albumId 
 * @param userId 
 * @param photoId 
 * @returns 
 */

export const addPhotoToAlbum = async (albumId: number, photoId: number | number[]) => {

    return await prisma.photo.update({
        where: {
            id: Array.isArray(photoId) ? photoId[0] : photoId,
        },
        data: {
            albums: {
                connect: {
                    id: albumId,
                },
            },
        },
        include: {
            albums: true,
        },
    });
} 
export const checkPhotoId = async (photoId: number) => {
    return await prisma.photo.findUniqueOrThrow({
        where: {
            id: photoId,
        }
    });
}
