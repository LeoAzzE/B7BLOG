import { RequestHandler } from "express";
import { z } from "zod";
import { createUser } from "../services/user";
import { createToken } from "../services/auth";

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

    res.status(201).json({
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        },
        token
    })
}