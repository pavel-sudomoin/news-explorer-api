const router = require('express').Router();

const messages = require('../configs/messages');
const NotFoundError = require('../errors/not-found-error');

router.use('*', (req, res, next) => {
  next(new NotFoundError(messages.main.isWrongRequest));
});

module.exports = router;
