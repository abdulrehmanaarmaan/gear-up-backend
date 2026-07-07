import { prisma } from "../../lib/prisma";
import { IReview } from "./review.interfaces";

export const createReviewInDB = async (payload: IReview) => {

    const result = await prisma.review.create({
        data: {
            ...payload
        }
    })

    return result
}