import { User } from "@prisma/client";

export type RegisterUser = Omit<User, "id">;
