import bcrypt from "bcryptjs"
import { prisma } from "../../lib/prisma"
import { ILoginUser, IUser } from "./auth.interfaces"
import config from "../../config"
import { jwtUtils } from "../../utils/jwt"

const { bcrypt_salt_rounds, jwt_access_secret, jwt_access_expires_in, jwt_refresh_secret, jwt_refresh_expires_in } = config

const createUserInDB = async (payload: IUser) => {

    const { email, password } = payload

    const alreadyCreated = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (alreadyCreated) {
        throw new Error("User already created.")
    }

    const hashedPassword = await bcrypt.hash(password, bcrypt_salt_rounds)

    const result = await prisma.user.create({
        data: {
            ...payload,
            password: hashedPassword
        }
    })

    return result
}

const authorizeUserFromDB = async (payload: ILoginUser) => {

    const { email, password: givenPassword } = payload

    const result = await prisma.user.findUniqueOrThrow({
        where: {
            email
        }
    })

    const { password, ...rest } = result

    const matchedPassword = await bcrypt.compare(givenPassword, password)

    if (!matchedPassword) {
        throw new Error("The password provided is password.")
    }

    const { id, role } = result

    const jwtPayload = {
        id,
        email,
        role
    }

    const { createToken } = jwtUtils

    const accessToken = createToken(
        jwtPayload,
        jwt_access_secret,
        jwt_access_expires_in
    )

    const refreshToken = createToken(
        jwtPayload,
        jwt_refresh_secret,
        jwt_refresh_expires_in

    )

    return {
        rest,
        accessToken,
        refreshToken
    }
}

const getMyDetailsFromDB = async (id: string) => {

    const result = await prisma.user.findUniqueOrThrow({
        where: {
            id
        }
    })

    return result
}

export const authServices = {
    createUserInDB,
    authorizeUserFromDB,
    getMyDetailsFromDB
}