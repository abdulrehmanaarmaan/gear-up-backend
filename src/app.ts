import cookieParser from "cookie-parser"
import express, { Application } from "express"
import config from "./config"
import cors from "cors"
import { authRoutes } from "./modules/auth/auth.routes"
import { gearRoutes } from "./modules/gear/gear.routes"
import { rentalRoutes } from "./modules/rental/rental.routes"
import { paymentRoutes } from "./modules/payments/payment.routes"
import { providerRoutes } from "./modules/provider/provider.routes"
import { adminRoutes } from "./modules/admin/admin.routes"
import { reviewRoutes } from "./modules/review/review.route"

const app: Application = express()

const { app_url } = config

app.use(cors({
    origin: app_url,
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)

app.use('/api/gear', gearRoutes)

app.use('/api/rentals', rentalRoutes)

app.use('/api/payments', paymentRoutes)

app.use('/api/provider', providerRoutes)

app.use('/api/admins', adminRoutes)

app.use('/api/reviews', reviewRoutes)

export default app