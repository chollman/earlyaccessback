const Article = require('../models/article');

const createArticle = async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json({ article });
  } catch (error) {
    return res.status(400).json({
      msg: error,
    });
  }
};

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json({ articles });
  } catch (error) {
    return res.status(400).json({
      msg: error,
    });
  }
};

const getArticle = async (req, res) => {
  try {
    const article = await Article.findOne({ _id: req.params.id });

    if (!article) {
      return res
        .status(404)
        .json({ msg: `No article with ID: ${req.params.id}` });
    }

    res.status(200).json({ article });
  } catch (error) {
    return res.status(400).json({
      msg: error,
    });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findOneAndDelete({ _id: req.params.id });

    if (!article) {
      return res
        .status(404)
        .json({ msg: `No article with ID: ${req.params.id}` });
    }

    res.status(200).json({ article });
  } catch (error) {
    return res.status(400).json({
      msg: error,
    });
  }
};

const updateArticle = async (req, res) => {
  try {
    const article = await Article.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!article) {
      return res
        .status(404)
        .json({ msg: `No article with ID: ${req.params.id}` });
    }

    res.status(200).json({ article });
  } catch (error) {
    return res.status(400).json({
      msg: error,
    });
  }
};

module.exports = {
  createArticle,
  getAllArticles,
  getArticle,
  deleteArticle,
  updateArticle,
};
