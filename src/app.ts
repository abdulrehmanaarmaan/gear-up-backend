import cookieParser from "cookie-parser"
import express, { Application } from "express"
import config from "./config"
import cors from "cors"

const app: Application = express()

const { app_url } = config

app.use(cors({
    origin: app_url,
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())


export default app