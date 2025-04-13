import { RequestHandler, Response } from "express";
import { z } from "zod";
import { createUser, verifyUser } from "../services/user";
import { createToken } from "../services/auth";
import { ExtendedRequest } from "../types/extended-request";

export const signup: RequestHandler = async (req, res) => {
    const schema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string()
    })
    const data  = schema.safeParse(req.body)
    if (!data.success) {
        res.json({error: data.error?.flatten().fieldErrors})
        return;
    }
    const newUser = await createUser(data.data)

    if (!newUser) {
        res.json({error: "Erro ao criar usuário"});
        return
    }
    const token = createToken(newUser)

    res.status(201).json({token})
}

export const signin: RequestHandler = async (req, res) => {
    const schema = z.object({
        email: z.string().email(),
        password: z.string()
    })
    const data = schema.safeParse(req.body)

    if(!data.success) {
        res.json({error: data.error.flatten().fieldErrors})
        return;
    }

    const user = await verifyUser(data.data)
    if (!user) {
        res.json({error: "Acesso Negado"})
        return
    }
    const token = createToken(user)

    res.json({token})
}

export const validate = (req : ExtendedRequest, res : Response) => {
    res.json({user: req.user})
}