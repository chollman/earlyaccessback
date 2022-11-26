const express = require('express')
const router = express.Router()

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require('../controllers/usersController')

const { authUser, authorizePermission } = require('../middleware/auth')

router.route('/').get(authUser, authorizePermission('admin'), getAllUsers)

router.route('/showme').get(authUser, showCurrentUser)
router.route('/updateUser').patch(authUser, updateUser)
router.route('/updateUserPassword').patch(authUser, updateUserPassword)
router.route('/:id').get(authUser, getSingleUser)

module.exports = router
