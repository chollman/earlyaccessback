require('dotenv').config()

const connectDB = require('./connect')
const Article = require('../models/article')

const articlesJSON = require('./articlesFixtures')

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    await Article.deleteMany()
    await Article.create(articlesJSON)
    console.log('DB recargada con éxito!!')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()
