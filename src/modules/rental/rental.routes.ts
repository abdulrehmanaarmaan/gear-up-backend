import { Router } from "express";
import { rentalControllers } from "./rental.controllers";

const router = Router()

const { createRentalOrder, getAllRentalOrders, getRentalOrderDetails } = rentalControllers

router.post('/', createRentalOrder)

router.get('/', getAllRentalOrders)

router.get('/:id', getRentalOrderDetails)

export const rentalRoutes = router