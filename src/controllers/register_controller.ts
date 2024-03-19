import Debug from "debug";
import bcrypt from "bcrypt"
import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { RegisterUser } from "../types/user.types";
import { registerAUser } from "../services/user_service";

const debug = Debug("uppgift-API-fed23:register_controller");

/**
 * Register a user
 */
export const register = async (req: Request, res: Response) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        res.status(400).send({
            status: "fail",
            data: validationErrors.array(),
        });
        
        return;
    }

    const validatedData = matchedData(req);
    debug("validatedData: %O", validatedData);

    const hashed_password = await bcrypt.hash(validatedData.password, 10);
    debug("plaintext password:", validatedData.password);
    debug("hashed password:", hashed_password);

    const data = {
        email: validatedData.email,
        first_name: validatedData.first_name,
        last_name: validatedData.last_name,
        password: hashed_password,
    } as RegisterUser;

    try {
        const user = await registerAUser(data);
        res.status(201).send({
            status: "success",
            data: {
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
            },
        });
    } catch (err) {
        debug("Error was found when trying to create User: %O", err);
        return res.status(500).send({ 
            status: "error",
            message: "Could not create user in database"
        });
    }
}