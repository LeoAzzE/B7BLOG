import { NextFunction, Response, Request } from "express";
import { verifyRequest } from "../services/auth";
import { error } from "console";
import { ExtendedRequest } from "../types/extended-request";

export const privateRoute = async(req : ExtendedRequest, res: Response, next: NextFunction) => {
    const user = await verifyRequest(req)
    if (!user) {
        res.status(401).json({error: 'Acesso negado'})
        return
    }

    req.user = user;

    next()
}