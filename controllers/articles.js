const Article = require('../models/article');

exports.createArticle = async (req, res) => {
  console.log(req.body);
  const article = await Article.create(req.body);
  console.log(article);
  res.status(201).json({ article });
  // try {
  //     await book.save();
  //     await book.populate("categories").populate("authors").execPopulate();
  //     res.status(201).json(createBookForResponse(book));
  // } catch (err) {
  //     return res.status(400).json({
  //         error: errorHandler(err)
  //     });
  // }
};
