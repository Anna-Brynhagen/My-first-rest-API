import Debug from 'debug';
import { Request, Response } from "express";
import {
    createPhoto,
    getAPhoto,
    getAllPhotos,
    updatePhoto
} from '../services/photo_service';
import { matchedData, validationResult } from 'express-validator';
import { CreatePhoto, UpdatePhoto } from '../types/photo.types';
import { getUserIdFromAuthenticatedUser } from '../helpers/auth_helper';

const debug = Debug("uppgift-API-fed23:photo_controller");

/**
 * GET all users photos ⭐️ 🎆
 */
export const index = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).send({
            status: 'fail',
            message: 'Authorization required'
        });
    }
    const userId = req.user.id;
    try {
        const photos = await getAllPhotos(userId);
        res.status(200).send({
            status: "success",
            data: photos
        });
    } catch (error) {
            res.status(500).json({
                status: "error",
                message: "internal error within server"
            });
    }
};

/**
 * GET a single photo using id ⭐️ 🎆
 */
export const show = async (req: Request, res: Response) => {

    try {
        const photoId = Number(req.params.photoId);

        const userId = req.user?.id;

        const photo = await getAPhoto(photoId);

        if (userId !== photo.userId) {
            return res.status(401).json({ status: "fail", message: "Unauthorized" });
        }

        res.status(200).send({
            status: "success",
            data: photo,
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

/**
 * Create a photo for users profile ⭐️ 🎆
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

    const validatedData = matchedData(req) as CreatePhoto;
    const userId = getUserIdFromAuthenticatedUser(req);

    if (!userId) {
        return res.status(401).send({
            status: 'fail',
            message: 'Unauthorized'
        });
    }

    try {
        const photo = await createPhoto(validatedData, userId);
        res.status(201).send({
            status: "success",
            data: photo
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "internal error within server"
        });
    }
}

/**
 * Update a users photo ⭐️ 🎆
 */
export const update = async (req: Request, res: Response) => {

    try {
        const photoId = Number(req.params.photoId);
        const userId = req.user?.id;
        const validatedData = matchedData(req) as UpdatePhoto;
        const photo = await updatePhoto(photoId, validatedData);

        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            res.status(400).send({
                status: "fail",
                data: validationErrors.array(),
            });
            return;
        }

        //const userId = getUserIdFromAuthenticatedUser(req);
        if (userId !== photo.userId) {
            return res.status(401).json({ status: "fail", message: "Unauthorized" });
        }

        res.status(200).send({
            status: "success",
            data: photo
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

