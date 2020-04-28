const mongoose = require('mongoose');

const Article = require('../models/article');

const NotFoundError = require('../errors/not-found-error');
// const ForbiddenError = require('../errors/forbidden-error');
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
    let article = await Article.create({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
      owner,
    });
    article = await article.populate(['owner']).execPopulate();
    res.status(201).send(article);
  } catch (err) {
    next(new BadRequesError(err.message));
  }
};

module.exports.deleteArticleById = async (req, res, next) => {
  try {
    let article = await Article.findById(req.params.id);
    if (!article || article.owner.toString() !== req.user._id) {
      throw new NotFoundError('Вы не сохраняли статью с таким id');
    }
    /*
    if (article.owner.toString() !== req.user._id) {
      throw new ForbiddenError('Недостаточно прав для удаления данной статьи');
    }
    */
    article = await article.remove();
    article = await article.populate(['owner']).execPopulate();
    res.status(201).send(article);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      next(new BadRequesError('Некорректный id статьи'));
    } else {
      next(err);
    }
  }
};

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .populate(['owner', 'likes'])
    .then((articles) => res.status(200).send(articles))
    .catch(next);
};
