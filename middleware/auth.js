const jwt = require('jsonwebtoken')

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new Error('No token provided', 401)
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { id, user } = decoded
    req.user = { id, user }
    next()
  } catch (error) {
    throw new Error('Not authorized to access this route', 401)
  }
}

module.exports = authenticationMiddleware
