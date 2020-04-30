const messages = require('../configs/messages');
const NotFoundError = require('../errors/not-found-error');

module.exports = (err, req, res, next) => {
  if (err) next(new NotFoundError(messages.validation.bodyFormat.isWrongJson));
  else next();
};
