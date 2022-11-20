const express = require('express');
const router = express.Router();

const { createArticle } = require('../controllers/articles');

router.post('/articles', createArticle);

module.exports = router;
