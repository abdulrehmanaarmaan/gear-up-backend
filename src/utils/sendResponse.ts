import { Response } from "express"

interface TResponse<X, Y> {
    statusCode: number
    success?: boolean
    message?: string
    errors?: X
    data?: Y
}

const sendResponse = async <X, Y>(res: Response, response: TResponse<X, Y>) => {

    try {
        const { statusCode, success, message, errors, data } = response

        res.status(statusCode).json({
            success,
            statusCode,
            message,
            errors,
            data
        })
    }
    catch (error: any) {
        throw new Error(error.message)
    }
}

export default sendResponse