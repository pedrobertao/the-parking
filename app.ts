import express from "express"
import cookieParser from "cookie-parser"
import mongoSanitize from "express-mongo-sanitize"
import dotenv from 'dotenv'
import helmet from 'helmet'
import connectDB from "./database/db"

import parking from "./routes/parking"

dotenv.config({
    path: "./config/.env"
})

connectDB()

const app = express()

const port = 3000 || process.env.PORT

app.use(express.json());

app.use(mongoSanitize())

app.use(cookieParser());

app.use(helmet())



app.get('/', (_, res) => res.send('Welcome to the Parking service'))

app.use('/api/v1', parking)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


process.on('unhandledRejection', (err: Error) => {
    console.log(`Error: ${err.message}`);
    process.exit(1)
})
