const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const { createJWT } = require('../utils')

// Login user
const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Provide email and password')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  // Check if password is correct
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Wrong Password')
  }

  const tokenUser = { name: user.name, userId: user._id, role: user.role }
  const token = createJWT({ payload: tokenUser })
  res.status(StatusCodes.OK).json({
    user: tokenUser,
    token,
  })
}

// Register new user
const register = async (req, res) => {
  const { name, email, password } = req.body
  const user = await User.create({ name, email, password })
  const tokenUser = { name: user.name, userId: user._id, role: user.role }
  const token = createJWT({ payload: tokenUser })
  res.status(StatusCodes.CREATED).json({
    user: tokenUser,
    token,
  })
}

const logout = async (req, res) => {
  res.send('logout')
}

module.exports = {
  register,
  login,
  logout,
}
