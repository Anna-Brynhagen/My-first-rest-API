import express from "express";
import { getProfile } from "../controllers/profile_controller";
const router = express.Router();

/**
 * Get / login profile
 */
router.get("/", getProfile);


export default router;