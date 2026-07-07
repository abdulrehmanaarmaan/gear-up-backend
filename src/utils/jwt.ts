import jwt, { SignOptions } from "jsonwebtoken"

interface JWTPayload {
    id: string,
    email: string
}

const createToken = (payload: JWTPayload, jwtSecret: string, expiresIn: string) => {

    try {

        const accessToken = jwt.sign(
            payload,
            jwtSecret,
            { expiresIn } as SignOptions
        )

        return accessToken
    }
    catch (error: any) {
        return {
            error: error.message
        }
    }
}

const verifyToken = async (accessToken: string, jwtSecret: string) => {

    try {
        const verifiedToken = jwt.verify(accessToken, jwtSecret)
        return verifiedToken
    }
    catch (error: any) {
        return {
            error: error.message
        }

    }
}

export const jwtUtils = {
    createToken,
    verifyToken
}