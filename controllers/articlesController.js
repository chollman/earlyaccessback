const Article = require('../models/Article')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const ARTICLES_PER_PAGE = 10

// GET ALL ARTICLES with sort, limit, fields, pagination =================
const getAllArticles = async (req, res) => {
  const query = req.query

  getRegex(query, ['title', 'author', 'content', 'description'])

  if (query.numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    }
    const regEx = /\b(<|>|>=|=|<=)\b/g
    let filters = query.numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    )
    const options = ['rating']
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-')
      if (options.includes(field)) {
        query[field] = { [operator]: Number(value) }
      }
    })
  }

  let result = Article.find(query)

  // Checking sort order
  if (query.sort) {
    const sortList = query.sort.split(',').join(' ')
    result = result.sort(sortList)
  } else {
    result = result.sort('createdAt')
  }

  // Checking selected fields for the response
  if (query.fields) {
    const fieldsList = query.fields.split(',').join(' ')
    result = result.select(fieldsList)
  }

  // Pagination
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || ARTICLES_PER_PAGE
  const skip = (page - 1) * limit
  result = result.skip(skip).limit(limit)

  const articles = await result.populate({
    path: 'createdBy',
    select: '-password',
  })

  const totalArticles = await Article.countDocuments(query)
  const numOfPages = Math.ceil(totalArticles / limit)

  res
    .status(StatusCodes.OK)
    .json({ amount: articles.length, totalArticles, numOfPages, articles })
}

// GET ARTICLE ==================================================
const getArticle = async (req, res) => {
  const article = await Article.findOne({ _id: req.params.id }).populate({
    path: 'createdBy',
    select: '-password',
  })

  if (!article) {
    throw new NotFoundError(`No article with id ${req.params.id}`)
  }

  res.status(StatusCodes.OK).json({ article })
}

// CREATE ARTICLE ==================================================
const createArticle = async (req, res) => {
  req.body.createdBy = req.user.userId
  const article = await Article.create(req.body)
  res.status(StatusCodes.CREATED).json({ article })
}

// UPDATE ARTICLE ==================================================
const updateArticle = async (req, res) => {
  const article = await Article.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  )

  if (!article) {
    throw new NotFoundError(`No article with id ${req.params.id}`)
  }

  res.status(StatusCodes.OK).json({ article })
}

// DELETE ARTICLE ==================================================
const deleteArticle = async (req, res) => {
  const article = await Article.findOneAndDelete({ _id: req.params.id })

  if (!article) {
    throw new NotFoundError(`No article with id ${req.params.id}`)
  }

  res.status(StatusCodes.OK).json({ deletedArticle: article })
}

// UPLOAD IMAGE ====================================================
const uploadImage = async (req, res) => {
  res.send('upload image')
}

// UTILS ===========================================================
const getRegex = (query, list) => {
  list.map((attr) => {
    if (query[attr]) {
      query[attr] = { $regex: query[attr], $options: 'i' }
    }
  })
  return query
}

module.exports = {
  createArticle,
  getAllArticles,
  getArticle,
  deleteArticle,
  updateArticle,
  uploadImage,
}
