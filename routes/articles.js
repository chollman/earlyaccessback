const express = require('express')
const router = express.Router()

// middlewares
const authUser = require('../middleware/auth')

const {
  createArticle,
  getAllArticles,
  getArticle,
  deleteArticle,
  updateArticle,
} = require('../controllers/articles')

router.route('/').get(getAllArticles).post(authUser, createArticle)
router.route('/:id').get(getArticle).delete(deleteArticle).patch(updateArticle)

module.exports = router
