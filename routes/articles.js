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

router.post('/', bodyValidator(articleValidate), createArticle);
router.delete('/:id', idValidator, deleteArticleById);
router.get('/', getArticles);

module.exports = router;
