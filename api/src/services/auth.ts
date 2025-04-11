import { User } from "@prisma/client";
import { createJWT } from "../libs/jwt";

export const createToken = (user: User) => {
    return createJWT({
        id: user.id
    })
}