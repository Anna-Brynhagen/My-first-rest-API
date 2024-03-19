import { body } from "express-validator";
import { checkIfEmailExists } from "../services/user_service";

export const userRules = [
    body("email")
    .isString()
    .trim().isEmail().withMessage("Email needs to be a valid email").bail()
    .custom(async (value) => {
        const emailExist = await checkIfEmailExists(value);
        if(emailExist) {
            throw new Error("Email is already in use");
        }
        return true;
    }),
    
    body("password")
    .isString().withMessage("Password needs to be a string").bail()
    .trim().isLength({ min: 6}).withMessage("Password has to be atleast 6 chars long"),

    body("first_name")
    .isString().withMessage("Your first name must be written as a string").bail()
    .trim().isLength({ min: 3 }).withMessage("Your name must be atleast 3 chars long....sorry Bo"),

    body("last_name")
    .isString().withMessage("Your last name must be written as a string").bail()
    .trim().isLength({ min: 3 }).withMessage("Your last name must be atleast 3 chars long")
]










/* 
model User {
  id         Int    @id @default(autoincrement()) @db.UnsignedInt
  email      String @unique
  password   String
  first_name String
  last_name  String

  albums Album[] //en user har flera album
  photos Photo[] // en user hjar flera foton
} */