const express = require('express')
const router = express.Router()

// middlewares
const { authUser, authorizePermission } = require('../middleware/auth')

const {
  createArticle,
  getAllArticles,
  getArticle,
  deleteArticle,
  updateArticle,
} = require('../controllers/articlesController')

router
  .route('/')
  .get(getAllArticles)
  .post(authUser, authorizePermission('admin'), createArticle)
router
  .route('/:id')
  .get(getArticle)
  .delete(authUser, authorizePermission('admin'), deleteArticle)
  .patch(authUser, authorizePermission('admin'), updateArticle)

module.exports = router
