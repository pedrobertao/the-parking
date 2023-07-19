import express from "express"
import cookieParser from "cookie-parser"
import mongoSanitize from "express-mongo-sanitize"
import dotenv from 'dotenv'
import helmet from 'helmet'
import connectDB from "./database/db"

dotenv.config({
    path: "./config/.env"
})

connectDB()

const app = express()

app.use(express.json());

app.use(mongoSanitize())

app.use(cookieParser());

app.use(helmet())


const port = 3000 || process.env.PORT

app.get('/', (_, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


process.on('unhandledRejection', (err: Error) => {
    console.log(`Error: ${err.message}`);
    process.exit(1)
})
