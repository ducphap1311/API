const express = require('express')
require('express-async-errors')
const app = express()
const productRouter = require('./routes/Product')
const userRouter = require('./routes/User')
const orderRouter = require('./routes/Order')
const authenticateUser = require('./middlewares/auth')
const notFound = require('./middlewares/not-found')
const errorHandlerFunction = require('./middlewares/error-handler')
const connectDB = require('./db/connect')
require('dotenv').config()
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.use('/api/v1', productRouter)
app.use('/api/v2', userRouter)
app.use('/api/v3', authenticateUser, orderRouter)

app.use(notFound)
app.use(errorHandlerFunction)

const port = 5000 || process.env.port
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error);
    }
}
start()