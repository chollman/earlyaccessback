const express = require('express')
const router = express.Router()

const { login, signin } = require('../controllers/auth')

router.route('/signin').get(signin)
router.route('/login').post(login)

module.exports = router
