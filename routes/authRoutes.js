const express = require('express')
const router = express.Router()
const rateLimiter = require('express-rate-limit')

const { login, register } = require('../controllers/authController')

const apiLimiter = rateLimiter({
  windowsMs: 15 * 60 * 1000, // 15 minutes
  max: 10, //limit each IP to 100 requests per windowMs
  message: 'Too many requests from this API',
})

router.route('/register').post(apiLimiter, register)
router.route('/login').post(apiLimiter, login)

module.exports = router
