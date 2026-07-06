import { Router } from "express";
import { providerControllers } from "./provider.controllers";

const router = Router()

const { addGear, updateGear, removeGear, getMyOrders, updateRentalOrder } = providerControllers

router.post("/gear", addGear)

router.put('/gear/:id', updateGear)

router.delete('/gear/:id', removeGear)

router.get('/orders', getMyOrders)

router.patch('/orders/:id', updateRentalOrder)

export const providerRoutes = router