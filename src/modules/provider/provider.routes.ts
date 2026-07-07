import { Router } from "express";
import { providerControllers } from "./provider.controllers";

const router = Router()

const { addGear, updateGear, removeGear, getMyOrders, updateOrderStatus } = providerControllers

router.post("/gear", addGear)

router.put('/gear/:id', updateGear)

router.delete('/gear/:id', removeGear)

router.get('/orders', getMyOrders)

router.patch('/orders/:id', updateOrderStatus)

export const providerRoutes = router