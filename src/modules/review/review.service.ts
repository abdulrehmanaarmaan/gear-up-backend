import { RentalStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { IReview } from "./review.interface";

export const createReviewInDB = async (payload: IReview, customerId: string) => {

    const { rentalOrderId } = payload

    const rentalOrder = await prisma.rentalOrder.findUnique({
        where: {
            id: rentalOrderId
        }
    })

    if (rentalOrder?.status !== RentalStatus.RETURNED) {
        throw new Error("The rental was not returned.")
    }

    const result = await prisma.review.create({
        data: {
            ...payload,
            customerId
        }
    })

    return result
}