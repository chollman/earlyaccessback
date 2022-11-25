require('dotenv').config()
require('express-async-errors')

// SECURITY
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')

// SWAGGER
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

// EXPRESS
const express = require('express')
const app = express()

const fileUpload = require('express-fileupload')

// MIDDLEWARE
const morgan = require('morgan')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.set('trust proxy', 1)
app.use(morgan('tiny'))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(fileUpload())

// DATABASE
const connectDB = require('./db/connect')

// IMPORT ROUTES
const authRouter = require('./routes/authRoutes')
const articlesRouter = require('./routes/articlesRoutes')

app.get('/', (req, res) => {
  res.send('<h1>Early Access API</h1><a href="/api-docs">Documentación</a>')
})
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

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
