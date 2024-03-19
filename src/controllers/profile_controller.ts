import Debug from "debug";
import {Request, Response} from "express";

const debug = Debug("uppgift-API-fed23:profile_controller");

/**
 * Get authanticated users profile / log in
 */
export const getProfile = async (req: Request, res: Response) => {
    if (!req.user) {
        throw new Error("Trying to access autenticated user but none exists.")
    }

    debug("User: %O", req.user);

    res.send({
        status: "success",
        data: {
            id: req.user.id,
            email: req.user.email,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
        }
    });
}