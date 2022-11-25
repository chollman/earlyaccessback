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
    image: { type: String, default: '/uploads/example.jpeg' },
    rating: { type: Number },
    status: { type: String, enum: ['draft', 'approved', 'published'] },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Article', articleSchema)
