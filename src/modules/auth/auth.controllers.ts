import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { authServices } from "./auth.services"
import sendResponse from "../../utils/sendResponse"
import httpStatus from "http-status"

const { CREATED, OK } = httpStatus

const { createUserInDB, authorizeUserFromDB, getMyDetailsFromDB } = authServices

const createUser = catchAsync(async (req: Request, res: Response) => {

    const createdUser = await createUserInDB(req.body)

    sendResponse(res, {
        success: true,
        statusCode: CREATED,
        message: "User created successfully.",
        data: {
            createdUser
        }
    })
})

const loginUser = catchAsync(async (req: Request, res: Response) => {

    const { rest: authorizedUser, accessToken, refreshToken } = await authorizeUserFromDB(req.body)

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7
    })

    sendResponse(res, {
        success: true,
        statusCode: OK,
        message: "User authorized successfully.",
        data: {
            authorizedUser
        }
    })
})

const getMyDetails = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.user!

    const myDetails = await getMyDetailsFromDB(id)

    sendResponse(res, {
        success: true,
        statusCode: OK,
        message: "Details retrieved successfully.",
        data: {
            myDetails
        }
    })
})

export const authControllers = {
    createUser,
    loginUser,
    getMyDetails
}