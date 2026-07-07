import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { createReviewInDB } from "./review.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status"

export const createReview = catchAsync(async (req: Request, res: Response) => {

    const createdReview = await createReviewInDB(req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Review created successfully.",
        data: {
            createdReview
        }
    })
})