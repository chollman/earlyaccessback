const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')

// Login user
const login = async (req, res) => {
  const { user, password } = req.body

  if (!user || !password) {
    throw new Error('Provide user and password')
  }

  res.status(200).send('logueaste papaaaaaa!')
}

// Register new user
const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  res.status(StatusCodes.CREATED).json({ user })
}

module.exports = {
  register,
  login,
}
