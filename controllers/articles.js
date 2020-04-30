const mongoose = require('mongoose');

const Article = require('../models/article');

const messages = require('../configs/messages');
const NotFoundError = require('../errors/not-found-error');
const BadRequesError = require('../errors/bad-request-error');

module.exports.createArticle = async (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;
  const owner = req.user._id;
  try {
    const article = await Article.create({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
      owner,
    });
    res.status(201).send(article);
  } catch (err) {
    next(new BadRequesError(err.message));
  }
};

module.exports.deleteArticleById = async (req, res, next) => {
  try {
    let article = await Article.findById(req.params.id).select('+owner');
    if (!article || article.owner.toString() !== req.user._id) {
      throw new NotFoundError(messages.article.isWrongArticle);
    }
    article = await article.remove();
    res.status(201).send(article);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      next(new BadRequesError(messages.validation.id.isNotObjectId));
    } else {
      next(err);
    }
  }
};

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.status(200).send(articles))
    .catch(next);
};
