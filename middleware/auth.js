const { UnauthenticatedError, ForbiddenError } = require('../errors')
const { isTokenValid } = require('../utils')

const authUser = async (req, res, next) => {
  const token = req.signedCookies.token

  if (!token) {
    throw new UnauthenticatedError('Authentication Invalid')
  }

  try {
    const payload = isTokenValid({ token })
    req.user = {
      name: payload.name,
      userId: payload.userId,
      role: payload.role,
    }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication Invalid')
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

const authUserWithBearer = (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid')
  }
  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const { userId, name } = payload
    req.user = { userId, name }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
}

module.exports = {
  authUser,
  authorizePermission,
  authUserWithBearer,
}
