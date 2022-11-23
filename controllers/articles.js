const Article = require('../models/article')

const ARTICLES_PER_PAGE = 10

const createArticle = async (req, res) => {
  const article = await Article.create(req.body)
  res.status(201).json({ article })
}

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
  console.log(query)

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

  const articles = await result
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
}
