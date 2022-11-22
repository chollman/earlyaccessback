const Article = require('../models/article')

const createArticle = async (req, res) => {
  const article = await Article.create(req.body)
  res.status(201).json({ article })
}

const getAllArticles = async (req, res) => {
  const articles = await Article.find()
  res.status(200).json({ amount: articles.length, articles })
}

const getArticle = async (req, res) => {
  const article = await Article.findOne({ _id: req.params.id })

  if (!article) {
    return res.status(404).json({ msg: `No article with ID: ${req.params.id}` })
  }

  res.status(200).json({ article })
}

const deleteArticle = async (req, res) => {
  const article = await Article.findOneAndDelete({ _id: req.params.id })

  if (!article) {
    return res.status(404).json({ msg: `No article with ID: ${req.params.id}` })
  }

  res.status(200).json({ article })
}

const updateArticle = async (req, res) => {
  const article = await Article.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  )

  if (!article) {
    return res.status(404).json({ msg: `No article with ID: ${req.params.id}` })
  }

  res.status(200).json({ article })
}

module.exports = {
  createArticle,
  getAllArticles,
  getArticle,
  deleteArticle,
  updateArticle,
}
