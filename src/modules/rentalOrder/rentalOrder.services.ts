import { prisma } from "../../lib/prisma"
import { IRentalOrder } from "./rentalOrder.interfaces"

const createOrderInDB = async (payload: IRentalOrder) => {

    const result = await prisma.rentalOrder.create({
        data: {
            ...payload
        }
    })

    return result
}

const getOrdersFromDB = async () => {

    const result = await prisma.rentalOrder.findMany({
        include: {
            customer: true,
            provider: true,
            gear: true,
            payments: true,
            reviews: true
        }
    })

    return result
}

const getSingleOrder = async (id: string) => {

    await prisma.rentalOrder.findUniqueOrThrow({
        where: {
            id
        }
    })

    const result = await prisma.rentalOrder.findMany({

        where: {
            id
        },

        include: {
            customer: true,
            provider: true,
            gear: true,
            payments: true,
            reviews: true
        }
    })

    return result
}

export const rentalOrderServices = {
    createOrderInDB,
    getOrdersFromDB,
    getSingleOrder
}