const messages = require('../configs/messages');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const { message = messages.main.isServerError, statusCode = 500 } = err;
  res.status(statusCode).send({ message });
};
