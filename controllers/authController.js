const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const { attachCookiesToResponse } = require('../utils')

// Register new user
const register = async (req, res) => {
  const { name, email, password } = req.body
  const user = await User.create({ name, email, password })
  const tokenUser = { name: user.name, userId: user._id, role: user.role }

  attachCookiesToResponse({ res, user: tokenUser })

  res.status(StatusCodes.CREATED).json({
    user: tokenUser,
  })
}

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

  attachCookiesToResponse({ res, user: tokenUser })

  res.status(StatusCodes.OK).json({
    user: tokenUser,
  })
}

// Logout user
const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.status(StatusCodes.OK).json({ message: 'Logout success' })
}

module.exports = {
  register,
  login,
  logout,
}
