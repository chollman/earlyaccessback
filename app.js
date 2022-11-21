require('dotenv').config()

// EXPRESS
const express = require('express')
const app = express()

// MIDDLEWARE
app.use(express.json())

// DATABASE
const connectDB = require('./db/connect')

// IMPORT ROUTES
const articles = require('./routes/articles')

// SET ROUTES
app.use('/api/v1/articles', articles)

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
