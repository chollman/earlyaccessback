const mongoose = require('mongoose');
const { Schema } = mongoose;

const articleSchema = new Schema(
  {
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    content: { type: String, trim: true },
    author: { type: String, trim: true },
    publicationDate: { type: Date },
    image: { data: Buffer, contentType: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('article', articleSchema);
