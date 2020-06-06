const messages = require('../configs/messages');

module.exports = (err, req, res, next) => {
  const { message = messages.main.isServerError, statusCode = 500 } = err;
  res.status(statusCode).send({ message });
};
