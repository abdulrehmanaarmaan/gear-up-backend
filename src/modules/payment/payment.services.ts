import { prisma } from "../../lib/prisma"
import { IPayment } from "./payment.interfaces"

const createPaymentInDB = async (payload: IPayment) => {

    const result = await prisma.payment.create({
        data: {
            ...payload
        }
    })

    return result
}

const verifyPaymentFromDB = () => {

}

const getMyPaymentsFromDB = async (customerId: string) => {

    const result = await prisma.payment.findMany({
        where: {
            customerId
        }
    })

    if (!result.length) {
        return null
    }

    return result
}

const GetSinglePayment = async (id: string) => {

    const result = await prisma.payment.findUniqueOrThrow({
        where: {
            id
        }
    })

    return result
}

export const paymentServices = {
    createPaymentInDB,
    verifyPaymentFromDB,
    getMyPaymentsFromDB,
    GetSinglePayment
}