import { Router } from "express";
import { adminControllers } from "./admin.controllers";
import authorize from "../../middlewares/authorize";
import { UserRole } from "../../../generated/prisma/enums";
import auth from "../../middlewares/auth";

const router = Router()

const { getAllUsers, updateUserStatus, getAllGears, getAllRentalOrders } = adminControllers

const { ADMIN } = UserRole

router.get('/users', auth(), authorize(ADMIN), getAllUsers)

router.patch('/users/:id', updateUserStatus)

router.get('/gears', getAllGears)

router.get('/rentals', getAllRentalOrders)

export const adminRoutes = router