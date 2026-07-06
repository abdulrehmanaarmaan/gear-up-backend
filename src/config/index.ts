import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
    database_url: process.env.DATABASE_URL,
    app_url: process.env.APP_URL,
    port: process.env.PORT
}