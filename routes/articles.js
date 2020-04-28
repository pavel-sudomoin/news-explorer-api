const router = require('express').Router();

const {
  getArticles,
  createArticle,
  deleteArticleById,
} = require('../controllers/articles.js');

const { articleValidate } = require('../validators/compiled-schemes.js');

const {
  bodyValidator,
  idValidator,
} = require('../validators/validators');

router.get('/', getArticles);
router.post('/', bodyValidator(articleValidate), createArticle);
router.delete('/:id', idValidator, deleteArticleById);

module.exports = router;
