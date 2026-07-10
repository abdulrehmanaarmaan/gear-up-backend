import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../utils/catchAsync"
import { UserRole } from "../../generated/prisma/enums"

const authorize = (authRole: UserRole) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        const { role } = req.user!

        if (role !== authRole) {
            throw new Error("As per your role, you are not authorized to access this resource.")
        }

        next()
    })
}

export default authorize