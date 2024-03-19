import bcrypt from "bcrypt";
import Debug from "debug";
import {Request, Response, NextFunction} from "express";
import { checkIfEmailExists } from "../../services/user_service";

const debug = Debug("fed23-api-uppgift:basic");

export const basic_auth = async (req: Request, res: Response, next: NextFunction) => {
    debug("Im basic 😥");

    if (!req.headers.authorization) {
        debug("No authorization header was found.");
        return res.status(401).send({
            status: "fail",
            message: "Authorization required 👵🏼"
        });
    }
    
    debug("Auth header %o", req.headers.authorization);
    const [authSchema, base64Payload] = req.headers.authorization.split(" ")

    if (authSchema.toLowerCase() !== "basic") {
		debug("Authorization schema isn't Basic");
		return res.status(401).send({ 
            status: "fail",
            message: "Authorization required 📚" 
        });
	}

    const payloadDecoder = Buffer.from(base64Payload, "base64").toString("ascii");

    const [email, password] = payloadDecoder.split(":");
    debug("Email: %s", email);
	debug("Password: %s", password);

    if (!email || !password) {
        debug("User need to enter email and password, one of them is missing");
        return res.status(401).send({
            status: "fail",
            messege: "Authorization required, enter email and password 😥"
        });
    }
    
    const user = await checkIfEmailExists(email);
    if (!user) {
        debug("User %s does not exist", email);
		return res.status(401).send({ 
            status: "fail",
            message: "Authorization required 🥪" 
        });
    }

    debug(" User exists: %O", user);
    const correct_password = await bcrypt.compare(password, user.password);
    if (!correct_password) {
        debug("The password provided for user %s is incorrect", email);
        return res.status(401).send({
            status: "fail",
            message: "Authorization required, incorrect password 🦸🏼‍♂️"
        });
    }

    debug("⭐️ Provided password for user %s was correct", email);

    req.user = user;

    next();
}