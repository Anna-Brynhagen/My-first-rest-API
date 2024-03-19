import express from "express";
import { addPhoto, index, show, store, update } from "../controllers/album_controller";
import { createAlbumRules, updateAlbumRules } from "../validations/album_rules";
import { basic_auth } from "../middlewares/auth/basic";


const router = express.Router();

/**
 * GET all albums ⭐️
 */
router.get("/", basic_auth, index);

/**
 * GET a single album with id
 */
router.get("/:albumId", basic_auth, show);

/**
 * POST : create an album ⭐️
 */
router.post("/", basic_auth, createAlbumRules, store);

/**
 * PATCH : update an album ⭐️
 */
router.patch("/:albumId", basic_auth, updateAlbumRules, update);

/**
 * POST : Add a photo to an album ⭐️
 */
router.post("/:albumId/photos", basic_auth, addPhoto);



export default router;