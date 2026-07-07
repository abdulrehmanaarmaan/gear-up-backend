import { Router } from "express";
import { rentalOrderControllers } from "./rentalOrder.controllers";

const router = Router()

const { createRentalOrder, getAllRentalOrders, getRentalOrderDetails } = rentalOrderControllers

router.post('/', createRentalOrder)

router.get('/', getAllRentalOrders)

router.get('/:id', getRentalOrderDetails)

export const rentalOrderRoutes = router