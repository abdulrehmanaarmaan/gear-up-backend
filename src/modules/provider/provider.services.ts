import { GearStatus, RentalStatus } from "../../../generated/prisma/enums"
import { prisma } from "../../lib/prisma"
import { IGear } from "./provider.interfaces"

const addGearInDB = async (payload: IGear) => {

    const result = await prisma.gearItem.create({
        data: {
            ...payload
        }
    })

    return result
}

const updateGearInDB = async (id: string, status: GearStatus) => {

    await prisma.gearItem.findUniqueOrThrow({
        where: {
            id
        }
    })

    const result = await prisma.gearItem.update({
        where: {
            id
        },
        data: {
            status
        }
    })
    return result
}

const removeGearFromDB = async (id: string) => {

    await prisma.gearItem.findUniqueOrThrow({
        where: {
            id
        }
    })

    const result = await prisma.gearItem.delete({
        where: {
            id
        }
    })

    return result
}

const getMyOrdersFromDB = async (id: string) => {

    const result = await prisma.rentalOrder.findMany({
        where: {
            id
        }
    })

    return result
}

const updateStatusInDB = async (id: string, status: RentalStatus) => {

    await prisma.rentalOrder.findUniqueOrThrow({
        where: {
            id
        }
    })

    const result = await prisma.rentalOrder.update({
        where: {
            id
        },
        data: {
            status
        }
    })

    return result
}

export const providerServices = {
    addGearInDB,
    updateGearInDB,
    removeGearFromDB,
    getMyOrdersFromDB,
    updateStatusInDB,
}