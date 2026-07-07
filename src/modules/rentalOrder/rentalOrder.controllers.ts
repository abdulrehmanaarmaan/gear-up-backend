import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { rentalOrderServices } from "./rentalOrder.services"
import sendResponse from "../../utils/sendResponse"
import httpStatus from "http-status"

const { createOrderInDB, getOrdersFromDB, getSingleOrder } = rentalOrderServices

const { CREATED, OK } = httpStatus

const createRentalOrder = catchAsync(async (req: Request, res: Response) => {

    const createdOrder = await createOrderInDB(req.body)

    sendResponse(res, {
        success: true,
        statusCode: CREATED,
        message: "Rental order created successfully.",
        data: {
            createdOrder
        }
    })
})

const getAllRentalOrders = catchAsync(async (req: Request, res: Response) => {

    const allOrders = await getOrdersFromDB()

    sendResponse(res, {
        success: true,
        statusCode: OK,
        message: "Rental orders retrieved successfully.",
        data: {
            allOrders
        }
    })
})

const getRentalOrderDetails = catchAsync(async (req: Request, res: Response) => {

    const orderDetails = await getSingleOrder(req.params.id as string)

    sendResponse(res, {
        success: true,
        statusCode: OK,
        message: "Rental Order retrieved successfully.",
        data: {
            orderDetails
        }
    })

})

export const rentalOrderControllers = {
    createRentalOrder,
    getAllRentalOrders,
    getRentalOrderDetails
}