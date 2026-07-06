import { Router } from "express";
import { paymentControllers } from "./payment.controllers";

const router = Router()

const { createPayment, verifyPayment, getMyPayments, getPaymentDetails } = paymentControllers

router.post('/create', createPayment)

router.post('/confirm', verifyPayment)

router.get('/', getMyPayments)

router.get('/:id', getPaymentDetails)

export const paymentRoutes = router