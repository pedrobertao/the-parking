import express from "express"
import cookieParser from "cookie-parser"
import mongoSanitize from "express-mongo-sanitize"
import helmet from 'helmet'


const app = express()

app.use(express.json());

app.use(mongoSanitize())

app.use(cookieParser());

app.use(helmet())


const port = 3000 || process.env.PORT

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})