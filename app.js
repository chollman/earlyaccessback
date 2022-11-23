require('dotenv').config()
require('express-async-errors')

// SECURITY
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

// EXPRESS
const express = require('express')
const app = express()

// MIDDLEWARE
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowsMs: 15 * 60 * 1000, // 15 minutes
    max: 100, //limit each IP to 100 requests per windowMs
  })
)
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

// DATABASE
const connectDB = require('./db/connect')

// IMPORT ROUTES
const authRouter = require('./routes/auth')
const articlesRouter = require('./routes/articles')

// SET ROUTES
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/articles', articlesRouter)

// If request to a different route we set not found on response with notFound middleware
app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5500
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
