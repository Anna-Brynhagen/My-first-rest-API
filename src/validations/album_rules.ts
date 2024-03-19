import { body } from "express-validator";

export const createAlbumRules = [
    body("title")
        .isString().withMessage("Title must be a string").bail()
        .trim().isLength({ min: 3 }).withMessage("title has to be atleast 3 chars"),

    body("userId")
        .optional()
        .isInt().withMessage("has to be an integer"),
];

export const updateAlbumRules = [
    body("title")
        .optional()
        .isString().withMessage("Title must be a string").bail()
        .trim().isLength({ min: 3 }).withMessage("title has to be atleast 3 chars"),
        
    body("userId")
        .optional()
        .isInt().withMessage("has to be an integer"),
];