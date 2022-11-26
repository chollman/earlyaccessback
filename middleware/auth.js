const { UnauthenticatedError, ForbiddenError } = require('../errors')
const { isTokenValid } = require('../utils')

const authUser = (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid')
  }
  const token = authHeader.split(' ')[1]
  try {
    const payload = isTokenValid({ token })
    const { userId, name, role } = payload
    req.user = { userId, name, role }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
}

const authorizePermission = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError('Unauthorized to access this route')
    }
    next()
  }
}

module.exports = {
  authorizePermission,
  authUser,
}
