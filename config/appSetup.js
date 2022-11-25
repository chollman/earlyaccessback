require('dotenv').config()
require('express-async-errors')

// SECURITY
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')

// EXPRESS
const express = require('express')
const fileUpload = require('express-fileupload')

// MIDDLEWARE
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const appSetup = () => {
  const app = express()
  app.set('trust proxy', 1)
  app.use(morgan('tiny'))
  app.use(express.json())
  app.use(cookieParser(process.env.JWT_SECRET))
  app.use(helmet())
  app.use(cors())
  app.use(xss())
  app.use(fileUpload())
  return app
}

module.exports = {
  appSetup,
}
