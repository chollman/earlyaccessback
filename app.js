const { appSetup } = require('./config/appSetup')
const app = appSetup()

// MIDDLEWARE
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// SWAGGER
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

// DATABASE
const connectDB = require('./db/connect')

// IMPORT ROUTES
const authRouter = require('./routes/authRoutes')
const articlesRouter = require('./routes/articlesRoutes')
const usersRouter = require('./routes/usersRoutes')

// SET ROUTES
app.get('/', (req, res) => {
  res.send('<h1>Early Access API</h1><a href="/api-docs">Documentación</a>')
})
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/articles', articlesRouter)
app.use('/api/v1/users', usersRouter)

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
