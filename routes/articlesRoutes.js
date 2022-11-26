const express = require('express')
const router = express.Router()

// middlewares
const { authUser } = require('../middleware/auth')

const {
  createArticle,
  getAllArticles,
  getArticle,
  deleteArticle,
  updateArticle,
} = require('../controllers/articlesController')

router.route('/').get(getAllArticles).post(authUser, createArticle)
router
  .route('/:id')
  .get(getArticle)
  .delete(authUser, deleteArticle)
  .patch(authUser, updateArticle)

module.exports = router
