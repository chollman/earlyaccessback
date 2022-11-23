const User = require('../models/User')

const login = async (req, res) => {
  const { user, password } = req.body

  if (!user || !password) {
    throw new Error('Provide user and password')
  }

  res.status(200).send('logueaste papaaaaaa!')
}

const register = async (req, res) => {
  res.json(req.body)
}

module.exports = {
  register,
  login,
}
