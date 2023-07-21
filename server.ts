import app from "./app"
import dotenv from 'dotenv'
import connectDB from "./database/db"

const port = 3000 || process.env.PORT

dotenv.config({
    path: "./config/.env"
})

connectDB()

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

process.on('unhandledRejection', (err: Error) => {
    console.log(`Error: ${err.message}`);
    process.exit(1)
})