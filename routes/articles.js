const express = require('express')
const router = express.Router()

const {
  createArticle,
  getAllArticles,
  getArticle,
  deleteArticle,
  updateArticle,
} = require('../controllers/articles')

router.route('/').get(getAllArticles).post(createArticle)
router.route('/:id').get(getArticle).delete(deleteArticle).patch(updateArticle)

module.exports = router
