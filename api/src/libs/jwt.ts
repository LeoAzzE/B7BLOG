import jwt from 'jsonwebtoken'

export const createJWT = (payload: any) => {
    return jwt.sign(
        payload,
        process.env.JWT_KEY as string
    )
}

export const readJwt = (hash: string) => {
    try {
        return jwt.verify(
            hash,
            process.env.JWT_KEY as string
        )
    } catch (err) {
        return false
    }
}