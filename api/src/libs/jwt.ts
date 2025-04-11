import jwt from 'jsonwebtoken'

export const createJWT = (payload: any) => {
    return jwt.sign(
        payload,
        process.env.JWT_KEY as string
    )
}