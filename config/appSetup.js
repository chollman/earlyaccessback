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
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const appSetup = () => {
  const app = express()
  app.set('trust proxy', 1)
  app.use(morgan('tiny'))
  app.use(express.json())
  app.use(helmet())
  app.use(cors())
  app.use(xss())
  app.use(fileUpload({ useTempFiles: true }))
  return app
}

module.exports = {
  appSetup,
}
