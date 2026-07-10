import cookieParser from "cookie-parser"
import express, { Application, Request, Response } from "express"
import config from "./config"
import cors from "cors"
import { authRoutes } from "./modules/auth/auth.routes"
import { gearRoutes } from "./modules/gear/gear.routes"
import { rentalOrderRoutes } from "./modules/rentalOrder/rentalOrder.routes"
import { paymentRoutes } from "./modules/payment/payment.routes"
import { providerRoutes } from "./modules/provider/provider.routes"
import { adminRoutes } from "./modules/admin/admin.routes"
import { reviewRoute } from "./modules/review/review.route"
import sendResponse from "./utils/sendResponse"
import httpStatus from "http-status"

const app: Application = express()

app.use(cors({
    origin: config.app_url,
    credentials: true
}))

app.use('/api/payments/confirm', express.raw({ type: 'application/json' }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', async (req: Request, res: Response) => {
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "GearUp API is running successfully."
    })
})

app.use('/api/auth', authRoutes)

app.use('/api', gearRoutes)

app.use('/api/rentals', rentalOrderRoutes)

app.use('/api/payments', paymentRoutes)

app.use('/api/provider', providerRoutes)

app.use('/api/admin', adminRoutes)

app.use('/api/reviews', reviewRoute)

export default app