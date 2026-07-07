import { prisma } from "../../lib/prisma"

const getGearsFromDB = async () => {

    const result = await prisma.gearItem.findMany({
        include: {
            provider: true,
            category: true,
            reviews: true,
            rentalOrders: true
        }
    })

    return result
}

const getSingleGear = async (id: string) => {

    const result = await prisma.gearItem.findUniqueOrThrow({

        where: {
            id
        },

        include: {
            provider: true,
            category: true,
            reviews: true,
            rentalOrders: true
        }
    })

    return result
}

const getGearCategories = async () => {

    const result = await prisma.category.findMany({
        include: {
            gearItems: true
        }
    })

    return result
}

export const gearServices = {
    getGearsFromDB,
    getSingleGear,
    getGearCategories
}