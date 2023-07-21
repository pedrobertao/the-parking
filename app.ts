import express from "express"
import cookieParser from "cookie-parser"
import mongoSanitize from "express-mongo-sanitize"
import helmet from 'helmet'
import parking from "./routes/parking"

const app = express()

app.use(express.json());

app.use(mongoSanitize())

app.use(cookieParser());

app.use(helmet())

app.get('/', (_, res) => res.send('Welcome to the Parking service'))

app.use('/api/v1', parking)

export default app