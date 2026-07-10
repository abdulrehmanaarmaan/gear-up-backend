import jwt, { SignOptions } from "jsonwebtoken"

interface JWTPayload {
    id: string
    email: string
    role: string
}

const createToken = (jwtPayload: JWTPayload, jwtSecret: string, expiresIn: string) => {

    try {

        const jwtToken = jwt.sign(
            jwtPayload,
            jwtSecret,
            { expiresIn } as SignOptions
        )

        return jwtToken
    }
    catch (error: any) {
        return {
            error: error.message
        }
    }
}

const verifyToken = async (jwtToken: string, jwtSecret: string) => {

    try {
        const verifiedToken = jwt.verify(jwtToken, jwtSecret)
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