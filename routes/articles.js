const express = require('express');
const router = express.Router();

const {
  createArticle,
  getAllArticles,
  getArticle,
} = require('../controllers/articles');

router.route('/').get(getAllArticles).post(createArticle);
router.route('/:id').get(getArticle);

module.exports = router;
