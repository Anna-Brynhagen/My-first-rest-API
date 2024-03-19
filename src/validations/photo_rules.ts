import { body } from "express-validator";

export const createPhotoRules = [
    body("title")
    .isString().withMessage("Title has to be a string").bail()
    .trim().isLength({ min: 3 }).withMessage("title has to be atleast 3 chars"),

    body("url")
    .isString().withMessage("URL must be a string").bail()
    .isURL().withMessage("Invalid URL format"),

    body("comment")
    .optional()
    .isString().withMessage("Comment has to be a string").bail()
    .trim().isLength({ min: 3 }).withMessage("comment has to be atleast 3 chars"),

    body("userId")
    .optional()
    .isInt().withMessage("has to be an integer")
];

export const updatePhotoRules = [
    body("title")
    .optional()
    .isString().withMessage("Title has to be a string").bail()
    .trim().isLength({ min: 3 }).withMessage("title has to be atleast 3 chars"),

    body("url")
    .optional()
    .isString().withMessage("URL must be a string").bail()
    .isURL().withMessage("Invalid URL format"),

    body("comment")
    .optional()
    .isString().withMessage("Comment has to be a string").bail()
    .trim().isLength({ min: 3 }).withMessage("comment has to be atleast 3 chars"),
    
    body("userId")
    .optional()
    .isInt().withMessage("has to be an integer")
];
