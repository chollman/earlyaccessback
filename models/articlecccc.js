const mongoose = require('mongoose')
const { Schema } = mongoose

const articleSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Must provide a title'],
    },
    description: { type: String, trim: true },
    content: { type: String, trim: true },
    author: { type: String, trim: true },
    publicationDate: { type: Date, default: Date.now() },
    image: { data: Buffer, contentType: String },
    rating: { type: Number },
  },
  { timestamps: true }
)

module.exports = mongoose.model('article', articleSchema)