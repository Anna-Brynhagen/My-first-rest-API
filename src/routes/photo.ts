import express from "express";
import { index, show, store, update } from "../controllers/photo_controller";
import { createPhotoRules, updatePhotoRules } from "../validations/photo_rules";
import { basic_auth } from "../middlewares/auth/basic";
const router = express.Router();

/**
 * GET all photos ⭐️
 */
router.get("/", basic_auth, index);

/**
 * GET a photo using id ⭐️
 */
router.get("/:photoId", basic_auth, show); 

/**
 * POST : create a photo ⭐️
 */
router.post("/", createPhotoRules, basic_auth, store);

/**
 * PATCH : update a users photo ⭐️
 */
router.patch("/:photoId", basic_auth, updatePhotoRules, update);



export default router;