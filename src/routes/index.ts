/**
 * Main application routes
 */
import express from "express";
import albumRoutes from "./album"
import photoRoutes from "./photo"
import profileRoutes from "./profile";
import { userRules } from "../validations/user_rules";
import { register } from "../controllers/register_controller";
import { basic_auth } from "../middlewares/auth/basic";
const router = express.Router();

/**
 * GET /
 */
router.get("/", (req, res) => {
	res.send({
		message: "Hello from index.ts"
	});
});

/**
 * Album routes
 */
router.use("/albums", albumRoutes);

/**
 * Photo routes
 */
router.use("/photos", photoRoutes);

/**
 * Profile : login user
 */
router.use("/profile", basic_auth, profileRoutes);

/**
 * POST : register a user
 */
router.post("/register", userRules, register);

/**
 * Catch-all route handler
 */
router.use((req, res) => {
	// Respond with 404 and a message in JSON-format
	res.status(404).send({
		message: "Not Found 💩",
	});
});

export default router;
