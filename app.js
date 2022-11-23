require('dotenv').config()
require('express-async-errors')

// EXPRESS
const express = require('express')
const app = express()

// MIDDLEWARE
const notFound = require('./middleware/not-found')
const authMiddleware = require('./middleware/auth')
app.use(express.json())

// DATABASE
const connectDB = require('./db/connect')

// IMPORT ROUTES
const authRouter = require('./routes/auth')
const articlesRouter = require('./routes/articles')

// SET ROUTES
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/articles', articlesRouter)
app.get('/api/v1/testing-auth', authMiddleware, (req, res) => {
  res.status(200).send('funca piola')
})

app.use(notFound)

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
