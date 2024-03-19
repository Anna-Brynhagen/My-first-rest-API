import { Request } from 'express';

 // get authenticated users id
export const getUserIdFromAuthenticatedUser = (req: Request): number | null => {
    const user = req.user;
    return user ? user.id : null;
}; 