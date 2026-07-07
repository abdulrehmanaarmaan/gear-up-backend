import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { providerServices } from "./provider.services"
import sendResponse from "../../utils/sendResponse"
import httpStatus from "http-status"

const { addGearInDB, updateGearInDB, removeGearFromDB, getMyOrdersFromDB, updateStatusInDB } = providerServices

const { CREATED, OK } = httpStatus

const addGear = catchAsync(async (req: Request, res: Response) => {

    const addedGear = await addGearInDB(req.body)

    sendResponse(res, {
        success: true,
        statusCode: CREATED,
        message: "Gear added successfully.",
        data: {
            addedGear
        }
    })
})

const updateGear = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params

    const { status } = await req.body

    const updatedGear = await updateGearInDB(id as string, status)

    sendResponse(res, {
        success: true,
        statusCode: OK,
        message: "Gear updated successfully.",
        data: {
            updatedGear
        }
    })
})

const removeGear = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params

    const removedGear = removeGearFromDB(id as string)

    sendResponse(res, {
        success: true,
        statusCode: OK,
        message: "Gear removed successfully.",
        data: {
            removedGear
        }
    })

})

const getMyOrders = catchAsync(async (req: Request, res: Response) => {

    const myOrders = getMyOrdersFromDB('d')

    sendResponse(res, {
        success: true,
        statusCode: OK,
        message: "Orders retrieved successfully.",
        data: {
            myOrders
        }
    })

})

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params
    const { status } = await req.body

    const updatedOrder = await updateStatusInDB(id as string, status)

    sendResponse(res, {
        success: true,
        statusCode: OK,
        message: "Order status updated successfully.",
        data: {
            updatedOrder
        }
    })
})

export const providerControllers = {
    addGear,
    updateGear,
    removeGear,
    getMyOrders,
    updateOrderStatus
}