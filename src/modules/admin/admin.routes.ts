import { Router } from "express";
import { adminControllers } from "./admin.controllers";

const router = Router()

const { getAllUsers, updateUserStatus, getAllGears, getAllRentalOrders } = adminControllers

router.get('/users', getAllUsers)

router.get('/users/:id', updateUserStatus)

router.get('/gears', getAllGears)

router.get('/rentals', getAllRentalOrders)

export const adminRoutes = router