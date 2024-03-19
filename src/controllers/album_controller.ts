import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import Debug from "debug";
import {
    addPhotoToAlbum,
    checkPhotoId,
    getAlbumWithId,
    getAllAlbums,
    postAlbum,
    updateAlbum
} from "../services/album_service";
import { UpdateAlbum, createAlbum } from "../types/album.types";
import { getUserIdFromAuthenticatedUser } from "../helpers/auth_helper"
import prisma from "../prisma";

const debug = Debug("uppgift-API-fed23:album_controller");

/**
 * GET users all albums 🎆
 */
export const index = async (req: Request, res: Response) => {
    if (!req.user) {
        throw new Error("Trying to access autenticated user but none exists.");
    }
    const userId = req.user.id;
    try {
        const albums = await getAllAlbums(userId);
        res.status(200).send({
            status: "success",
            data: albums
        });
    } catch (err) {
        debug("Error catching albums: ", err);
        res.status(500).json({
            status: "error",
            message: "internal error within server"
        });
    }
};

/**
 * Get a single album with id ⭐️ 🎆
 */
export const show = async (req: Request, res: Response) => {
    if (!req.user) {
        throw new Error("Trying to access autenticated user but none exists.");
    }

    const albumId = Number(req.params.albumId);
    const userId = req.user.id;

    try {
        const album = await getAlbumWithId(albumId);
        if (userId !== album.userId) {
            return res.status(401).json({ status: "fail", message: "Unauthorized" });
        }
        
        res.status(200).send({
            status: "success",
            data: album,
        });

    } catch (err: any) {
        if (err.code === "P2025") {
            debug("Album with ID %d could not be found: %O", albumId, err);
            res.status(404).send({
                status: "error",
                message: "Not Found"
            });
        } else {
            debug("Error catching album: ", err);
            res.status(500).json({
                status: "error",
                message: "internal error within server"
            });
        }
    }
}

/**
 * Create an album for users profile ⭐️ 🎆
 */
export const store = async (req: Request, res: Response) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        res.status(400).send({
            status: "fail",
            data: validationErrors.array(),
        });
        return;
    }

    const validatedData = matchedData(req) as createAlbum;
    const userId = getUserIdFromAuthenticatedUser(req);

    if (!userId) {
        return res.status(401).send({
            status: 'fail',
            message: 'Unauthorized'
        });
    }

    try {
        const album = await postAlbum(validatedData, userId );
        res.status(201).send({
            status: "success",
            data: album
        });
    } catch (err) {
        debug(err);
        res.status(500).send({
            status: "error",
            message: "Something went wrong when creating the album in the database"
        });
    }
}

/**
 * Update an album ⭐️ 🎆
 */
export const update = async (req: Request, res: Response) => {
    const albumId = Number(req.params.albumId);

    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        res.status(400).send({
            status: "fail",
            data: validationErrors.array(),
        });
        return;
    }
    const validatedData = matchedData(req) as UpdateAlbum;
    const userId = req.user?.id;
    try {
        const album = await updateAlbum(albumId, validatedData);

    if (album.userId !== userId) {
        return res.status(401).send({
            status: 'fail',
            message: 'Authorization required'
        });
    }
        
        res.status(200).send({
            status: "success",
            data: album
        });
    } catch (err: any) {
        if (err.code === "P2025") {
            res.status(404).send({ status: "error", message: "Not Found" });
        } else {
            res.status(500).json({
                status: "error",
                message: "internal error within server"
            });
        }
    }
}

export const addPhoto = async (req: Request, res: Response) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        res.status(400).send({
            status: "fail",
            data: validationErrors.array(),
        });
        return;
    }

    const albumId = Number(req.params.albumId);

    if (!req.user) {
        throw new Error("Trying to access autenticated user but none exists.");
    }

    const userId = req.user.id;
    const photoId = req.body.id;

    try {

        const photo = await checkPhotoId(photoId)

        if(photo.userId !== userId) {
            return res.status(401).send({
                status: "error",
                message: "Unauthorized"
            });
        } 

        const album = await addPhotoToAlbum(albumId, photoId);
        res.status(201).send({
            status: "success",
            data: album
        });

    } catch (err: any) {
        if (err.code === "P2025") {
            res.status(404).send({ status: "error", message: "Not Found" });
        } else {
            res.status(500).json({
                status: "error",
                message: "internal error within server"
            });
        }
    }
}  